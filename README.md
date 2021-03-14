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
Log into your google account and visit sheets.new, as this will create an empty google sheet. 
#### Step two: Install the script
Open the script editor ( Tools -> Script Editor ) and paste in ALL the contents of the Code.gs file.
We now need to configure a few settings:
``` javascript
const BASEURL = "http://openapi.etsy.com/v2"
const API_KEY = "<<your personal api key here>>"

const limit = 100
const language = "de"
const shopId = "<<your shop id here>>"
const shopName = "<<your shop name here>>"

```
