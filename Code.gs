const BASEURL = "http://openapi.etsy.com/v2"
const API_KEY = "<<your personal api key here>>"

const limit = 100
const language = "<<language>>"
const shopId = "<<your shop id here>>"
const shopName = "<<your shop name here>>"

const additionalIncludes = ["MainImage", "Images"]

const availability_map = {
  "active": "in stock",
  "unavailable": "out of stock",
  "sold_out": "out of stock",
  "removed": "discontinued",
}

const fieldMap = {
  "id": "listing_id",
  "title": "title",
  "description": "description",
  "price": ["price", "currency_code"],
  "quantity": "quantity",
  "availability": "state",
  "condition": "",
  "brand": "",
  "link": "url",
  "image_link": "MainImage",
  "additional_image_link": "Images"
}

const manipulations = {
  "price": 'listing.price + " " +listing.currency_code',
  "availability": "availability_map[listing.state]",
  "condition": "'new'",
  "brand": `"${shopName}"`,
  "image_link": "listing.MainImage.url_fullxfull",
  "additional_image_link": "listing.Images.map(x = img => img.url_fullxfull).slice(1).toString()",
  "link": `listing.url.replace("https://www.", "https://${shopName.toLowerCase()}.")`
}

const HEADER = Object.keys(fieldMap)

const FIELDS = HEADER.map(a => fieldMap[a]).flat().filter(a => a !== '').filter(el => additionalIncludes.indexOf(el) < 0);

function setup(){
  prepareSheet()
  installTrigger()
  createSheet()
}

function prepareSheet(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();
  spreadsheet.insertSheet().setName("output").appendRow(HEADER)
  sheets.forEach(a=>spreadsheet.deleteSheet(a));
}

function installTrigger(){
  var triggers = ScriptApp.getScriptTriggers()
  triggers.forEach(a => ScriptApp.deleteTrigger(a))
  ScriptApp.newTrigger("createSheet").timeBased().everyHours(1).create();
}

function onOpen() {
  var ui = SpreadsheetApp.getUi()
  ui.createMenu("Etsy").addItem("Refresh output", "createSheet").addItem("Setup", "setup").addToUi();
}

function downloadListingsForShop(shop_id, fields, api_key) {
  fields = encodeURIComponent(fields)
  var offset = 0
  var result = []
  while (true) {
    var request = `${BASEURL}/shops/${shop_id}/listings/active?method=GET&api_key=${api_key}&fields=${fields}&limit=${limit}&includes=${additionalIncludes.toString()}&language=${language}&translate_keywords=false&offset=${offset}`

    var response = UrlFetchApp.fetch(request)
    var parsedResponse = JSON.parse(response)
    offset = Number(parsedResponse.pagination.next_offset)
    result.push(parsedResponse.results);

    if (offset == 0) {
      break;
    }
  }
  return result.flat()
}

function createSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("output")
  var listings = downloadListingsForShop(shopId, FIELDS, API_KEY)
  var content = []
  content.push(HEADER)
  for (var l in listings) {
    var listing = listings[l]
    var row = []

    HEADER.forEach(i => row.push(listing[fieldMap[i]]))

    for (var i in manipulations) {
      manipulation = manipulations[i]
      row[HEADER.indexOf(i)] = eval(manipulation)
    }
    content.push(row)
  }
  sheet.clear()
  sheet.getRange(1, 1, content.length, content[0].length).setValues(content)
}
