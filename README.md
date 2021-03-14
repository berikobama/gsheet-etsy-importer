# gsheet-etsy-importer
## Description
This google apps script (GAS) script connects to the Etsy api and imports relevant shop data into a google sheet. The imported fields are customizable,
but per default the created sheet can be automatically uploaded to a facebook shop and subsequently instagram. By using a hourly trigger, data can be refreshed automatically.

## Setup:
What should you prepare?

+ You need a google account -> https://accounts.google.com/signup
+ You need a etsy api key -> https://elfsight.com/blog/2020/12/how-to-get-and-use-etsy-api-key/ (until step for, save the keystring)
+ You need to know your etsy shop id -> https://app.cartrover.com/get_etsy_shop_id.php

### Now to the setup itself:
#### Step one: create a google sheet
Log into your google account and visit sheets.new, as this will create an empty google sheet. Give it whatever name you want.
#### Step two: Install the script
Open the script editor ( Tools -> Script Editor ) and paste in ALL the contents of the Code.gs file.
We now need to configure a few settings:
``` javascript
const BASEURL = "http://openapi.etsy.com/v2"
const API_KEY = "<<your personal api key here>>"

const limit = 100
const language = "<<language code for your shop>>"
const shopId = "<<your shop id here>>"
const shopName = "<<your shop name here>>"

```
Fill out all placeholders while making sure all values are in quotes (" or ') and there are no blank characters. Language is represented as ISO-639-1 code (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes, e.g.: english=en or german=de).
#### Step three: Setup the rest and first import
Close the script tab and reload the tab with the google sheet. There will be a new menu with the name "Etsy". Start the preparation of the sheet by clicking Etsy->Setup. If you do this the first time, you will be asked to grant permissions to the script. The setup will also install a trigger which runs the script hourly to update the sheet. 
After the setup is finished the sheet will be initially filled with the current data and automatically updated every hour. To update on demand click Etsy -> Refresh output

