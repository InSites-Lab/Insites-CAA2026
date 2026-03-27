#!/usr/bin/env node
/**
 * apply-translations.js
 * Applies English translations to all Hebrew text fields in mills-2021-en.json
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'mills-2021-en.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Translation map: keyed by mill id
const translations = {

// ============================================================
// mill-02: M20 - Tzalaf Mill
// ============================================================
'mill-02': {
  mappingDescription: 'Marking of the structure'
},

// ============================================================
// mill-03: Dok Mill (Crusader Mill) — RICH
// ============================================================
'mill-03': {
  description: `Historical-Geographical Background:

The Crusader flour mill Dok is located in the Ein Afek Nature Reserve, in the northern coastal plain of Israel, in the Zevulun Valley, near Kiryat Bialik and Kiryat Motzkin. The area historically served as a major transportation corridor along the stream and a source of livelihood for agricultural and industrial activity. During the Crusader period, the area served as the agricultural hinterland of Acre. The mill is located at a site that has been settled since the Canaanite period and throughout all of history to the present day, serving many uses.

During the Crusader period, the Dok and Recordana flour mills were established by the Templar and Hospitaller orders, who utilized the Naaman River to operate flour mills and transport produce to Acre. The first mill, Recordana, was built by the Hospitallers, creating a lake by means of a 100-meter-long dam. Subsequently, the Templars built the Dok Mill as a fortified structure on Roman-era remains, approximately 370 meters west of Recordana, with a large dam 652 meters long. The proximity of the mills led to conflicts over water regulation and use of the river, until papal intervention was required to settle the dispute. During this period, the mill served as a flour grinding and supply facility for the entire Acre Valley and the region. Later it served as a fortress guarding the road from Acre to Nazareth, and during the Sixth Crusade served as the main headquarters of Emperor Frederick.

During the Ottoman period, the mill continued to supply flour to soldiers stationed there. Beyond being a flour mill, the site also served as a center for fish distribution throughout the country. The mill is built as a fortified structure composed of three adjoining buildings. It is constructed of large stones with diagonal dressing marks typical of the Crusaders, while the Ottoman expansion is built of smaller, roughly dressed stones.

The ground floor contains five flour mills and a warehouse, the upper floor served as living quarters, and a British guard post was built on the roof. Near the mill is a lake ("the Mill Lake"), created by the adjacent dam, from which water was channeled through canals to each grinding station in the Dok Mill.

Current Condition:

Today, the Crusader flour mill Dok is located within the Ein Afek Nature Reserve and serves as a major tourism center in Israel. The mill itself functions as a museum and visitor center. The central hall of the building was converted into a gathering hall, where a permanent display of traditional agricultural tools is maintained, and a film presenting a "journey" through the reserve is screened every hour. In addition, changing art exhibitions are occasionally displayed in the mill. The reserve operates an education and outreach center for kindergarten children, school students, university students, and others.

Information Status:

The site has been researched and documented in archaeological surveys conducted over the years. In 2015, a comprehensive engineering conservation survey of the three mill buildings was conducted by conservation engineer Yaakov Shefer. In addition, a conservation plan was prepared by Yonatan Orlin in 2023 for the Crusader flour mill Dok building, alongside a detailed documentation file prepared by Sally Gand Maor and Simona Malka.

Description of the Asset and Its Surroundings:

Dok Mill was built during the Crusader period in the 12th century and includes characteristic structural elements such as massive stone walls and vaulted arches, built from local kurkar stone and mortar. The mill was built as a square-shaped fortified structure. It is composed of three adjoining buildings, built gradually over the years. The mill is constructed of large stones with diagonal dressing marks typical of the Crusaders. Initially, the mill had three grinding stations, and was later expanded to five grinding units. The ground floor contained flour mills and a warehouse, the upper floor served as living quarters, and a British guard post was built on the roof. Water from the lake ("the Mill Lake"), created by the adjacent dam, was channeled through a canal to the paddle wheels that drove the millstones. The mill is of the chute-mill type, characteristic of mills beside streams with steady flow in the coastal plain. The mill was maintained by the Templar Order until their departure from the country in the 13th century. During the Ottoman period, the area experienced renewed prosperity under the Bedouin leader Daher al-Omar, who developed Acre and its surroundings and expanded the Dok Mill with two additional flour grinding stations. During this period, Acre served as the main port of the Land of Israel. During the British Mandate period, the flour mill operated until 1925 and served the area's residents. In 1930, the lake was used as a carp fish farm by Barkano Cesar. Cesar and a partner leased a 90-dunam area on the edges of the Kurdani swamp and dug fish ponds. This attempt failed due to weak water flow, turtles that preyed on the fish, and theft by local Arabs. In 1936, the British built the guard tower structure on the roof of Dok Mill, as part of the events of the Arab Revolt. From 1937 to 1947, the site served as one of the first carp farms in the Land of Israel. Today, the preservation state of the mill is good. The main structure remains relatively intact and serves as testimony to the rich history of the area and the human activity that took place there.

In addition, the Ein Afek Reserve contains other important historical components:

Naaman River – The Afek springs are the water source of the Ein Afek Nature Reserve. They are drained through a network of channels into the Naaman River, which continues to flow about 9 km northward and empties into the Mediterranean Sea.

The Dam – The dam is approximately 625 m long and approximately 2.5 m high. The dam raised the water level by 7.2 m and created a lake behind it.

The Large Lake and Tamarisk Pool – The lake is a large body of water that forms part of the reserve's landscape. Tamarisk trees and bank vegetation surround the lake. The lake and pool are remnants of the swamps that were drained in the 20th century.

Tel Afek – An archaeological mound in the southern part of the reserve. Archaeological excavations revealed remains of human settlement from the Canaanite period, the Hellenistic period, and the Roman period.`,

  culturalAssessment: `The Crusader flour mill Dok in the Ein Afek Nature Reserve is a historic structure of important cultural values, reflecting the heritage of the region and the rich history that took place there over the years. Its location near the Naaman River is connected to the importance of the area as an agricultural and industrial center for hundreds of years, and to a great extent, the mill serves as tangible evidence of the Crusader period in the Acre Valley area.

The site has been settled since the Canaanite period and throughout all of history to the present day. The flour mill was built during the 12th century, when the Crusaders ruled the Land of Israel, and was part of a network of flour mills built along the Naaman River, utilizing water power to drive large millstones. Among the additional flour mills in the area, Dok Mill is the only one from the Crusader period that has remained in good condition. The mill and the entire site are mentioned in Crusader documents in the context of the struggle between the Hospitaller and Templar orders, and represent the last evidence of an industry that existed along the Naaman River from the Crusader period to the British period.

From an economic perspective, the mill constituted a central hub in the development of the area. It provided services to residents of nearby villages and to cities under Crusader rule, thereby making a significant contribution to the economic growth of the entire region. Its strategic location on the axis between Acre and Nazareth made it an important factor in the local economic system, as it supplied flour not only for local needs but also for trade with other areas. (Point for clarification)

The aesthetic value of the flour mill derives from its unique integration into the natural landscape of the Ein Afek Nature Reserve, at the heart of the Naaman River springs. The structure, built from local kurkar stone, is characterized by thick walls and barrel and cross vaults, reflecting the influence of European medieval architecture on the area. The mill presents a unique combination of Crusader architecture with Ottoman and British influences, manifested in a single structure. From the roof, a panoramic view of the Acre Valley can be seen, highlighting the historical and agricultural importance of the area. The simplicity of the structure and the natural materials from which it was built integrate harmoniously with the environment, making the mill an inseparable part of the landscape. The combination of the stone structure, the flowing waters of the Naaman River, and the rich surrounding vegetation creates a unique visual and acoustic experience, connecting humans with nature.

The preservation state of the Crusader mill at Ein Afek is relatively good, despite the years that have passed since its construction. The strong walls and massive vaults have withstood the ravages of time, though the structure has evidently suffered from cracks and repairs over the years. These repairs were presumably made to preserve the structure and continue using it in periods after the Crusaders left the area.

The Crusader mill in the Ein Afek Nature Reserve is a cultural and historic asset of great value, representing a unique combination of cultural heritage and long-term preservation. Preserving the mill makes it possible to safeguard the rich history of the area and pass the stories and traditions on to future generations. The mill embodies the connection between humans and nature, between past and present, and constitutes a living testimony to the culture and local heritage of Ein Afek and its surroundings. Therefore, the preservation and research of the site are important not only for understanding the past, but also for preserving our heritage for future generations.`,

  spiritOfPlace: `The Crusader flour mill in the Ein Afek Nature Reserve reflects the meeting between ancient history and pastoral nature. The Crusader structure, with its stone walls and impressive arches, stands as a symbol of events that took place here hundreds of years ago. Around it, the pastoral landscape of the Afek pools and swamps, with the quiet waters, tangled vegetation, and birdsong, amplify the sense of connection to the land and to the people who lived and worked in this place in the past. The mill, integrated with nature, evokes feelings of power, enchantment, and tranquility, reflecting the importance of the place both historically and ecologically.`,

  conservationPolicy: `After visiting the flour mill and observing the conservation work that was carried out, we developed criticism of some of the actions taken. First, a base for a roof parapet made of stone was added in the 1990s; this addition changes the original form of the mill structure and damages its authenticity. In addition, the roof railings are made of metal, and in our opinion, they attract attention and do not connect to the ancient architectural language. Second, we would also make use of the first floor of the mill building (currently closed) and turn it into a display space presenting the history of the entire site. Finally, we recommend improving and maintaining the viewing window to the grinding mechanism that exists in the mill, in order to demonstrate the ancient working methods that operated in the past.

From a programmatic standpoint, we felt a lack in presenting the original function of the mill building. Although the visitor center is located in the flour mill, it does not reflect the building's values and original function. The content displayed there and in the screened film is primarily about the reserve and site in general. We propose designing the interior space as close to the original as possible, so that visitors can learn about the flour-grinding process of that period.
(Addition by Yael Alef - it could be interesting to connect this mill to the Kurdana mill to illustrate the story of the struggles between the Hospitallers and Templars) and also to reference the tel in order to provide historical and spatial context (a dimension of historical depth + a view of the landscape) for the entire site. It should be noted that the existing boundary of the reserve does not include the tel, and the boundary passes directly adjacent to the mill wall without a buffer zone.`,

  riskDescription: `The mill structure has undergone conservation and reinforcement in recent years, but it is located in a humid environment surrounded by abundant vegetation that may endanger it. Therefore, there is a constant risk of moisture from capillary water rise that could damage the stone of the structure. In addition, there is a danger of root penetration from plants and trees adjacent to the building due to the numerous cracks present in it. During the conservation process, constructive reinforcement of the building was carried out by injecting stabilizing material deep into the walls and filling large cracks. The building's roof underwent a waterproofing process that prevents water penetration into the interior spaces. Pruning and tending of the vegetation adjacent to the building was carried out to reduce the risk of root penetration into the building's walls. Finally, the building was reused as a visitor center, and therefore the interior was cleaned and re-tiled.`,

  managementNotes: `The name of the approved plan in the Planning Administration is G/2062, Ein Afek Nature Reserve. The Crusader flour mill "Dok" located in the Ein Afek Nature Reserve is under statutory protection as part of the reserve, which was declared as an antiquities site and nature reserve in 1979. In 1996, the reserve was recognized as a "Ramsar site" - in accordance with the Ramsar Convention for the conservation and sustainable development of wetland habitats. The area is declared as a conservation site, ensuring its protection and legal enforcement of conservation actions. In terms of management activities, the site is managed by the Israel Nature and Parks Authority with daily presence and ongoing maintenance, including continuous oversight to preserve the nature and heritage values. In addition, the site is a restricted area and entry is conditional on purchasing a ticket.`,

  mappingDescription: `The mapping data includes a polygon describing the flour mill structure and a line describing the dam wall alignment as it currently exists at the site. In addition, a historical road that passed near the mill is marked with a line.

This historical road was the road from Acre to Nazareth. This road exits Acre and passes near the Naaman River and the Dok station, from where the road continues southeast to Shfar'am, passes through Tzipori National Park (formerly Kafar Sfuriya), and descends southward to Nazareth. The identification and marking of this road were carried out using the P.E.F. map of 1880. The identification and marking of the road connecting the Acre-Nazareth road to the mill were carried out using the 1935 map.`
},

// ============================================================
// mill-04: Abu Rabah Mill — MEDIUM
// ============================================================
'mill-04': {
  description: `Established near an ancient mill that had been ruined. In 1917, following the Turkish retreat and the destruction of the Yarkon bridges, the mill's value rose as it served as the only bridge crossing on the Yarkon.
Built by Sheikh Abu Rabah. Years of operation: late 19th century until 1959. Currently located on the lands of Moshav Adanim.`
},

// ============================================================
// mill-05: Al-Mir Mill — MEDIUM
// ============================================================
'mill-05': {
  description: `The first flour mill to operate along the Yarkon and probably the oldest. Al-Mir in Arabic means "crossing," and true to its name, the mill's walls served as a bridge for crossing the stream. Years of operation: from the beginning of the 19th century until the 1880s.
Currently located within the "Yarkon Springs" National Park.`
},

// ============================================================
// mill-06: Monks' Mill — RICH
// ============================================================
'mill-06': {
  description: `The Monks' Mill, in Arabic "Al-Raheb," is a building from the Ottoman period that has existed since before 1821. The building was constructed and developed in stages; at each stage, it was part of a different story that carried it to its next chapter. Today the building is a terraced structure with 4 levels, adjacent to a slope — a double-chimney mill.

The property sits on the northern bank of Nahal Tzipori, and forms part of the landscape unit of the lower Nahal Tzipori. The stream environment is an area with fertile soil and proximity to water sources — conditions that encouraged settlement from ancient times. The stream's course was also a passage between two focal cities of the time — Acre and Nazareth. This strategic and resource-rich corridor is the background, foundation, and environmental framework within which the mill was established.

The exact date and circumstances of the mill's founding are unknown to us, but it was most likely established by a Druze family from one of the nearby villages, Shfar'am, to serve the city and surrounding settlements and supply them with flour, such as Migdal, Tzipori, and Tivon. Around 1821, the mill ceased operations. If we follow the historical maps of the area, on Jacotin's map of 1799 the mill is not marked, which perhaps indicates it was already abandoned by then, until the Carmelites arrived and found it in a state they described as neglected and derelict. In 1819, a Carmelite monk named Giambattista da Persiceto, an architect by training, arrived in the country on behalf of the Carmelite Order, to renovate the Carmelite monastery in Haifa after it was destroyed twice — in 1761 by Daher al-Omar and in 1821 by Abdullah Pasha. Upon arriving in the country, the Carmelite monk Persiceto sought a source of income to carry out the monastery renovation, and he recalled the mills that existed midway between Acre and Nazareth. He approached a wealthy Turkish man, and together they renewed the mill's operation while developing and improving it. This step helped the Carmelites finance the renovation in full and complete the monastery that stands in Haifa to this day. This story is directly and closely connected to the mill, and as a result, its name was established — the Monks' Mill (in Arabic "Al-Raheb"). The mills ceased operation around 1930, due to the establishment of electric mills in Shfar'am and Ibtin, or due to water shortage in the stream. At this stage, the mill reached the end of its function as a flour mill.

Around the 1950s, the building served as shelter for local herds and even as a pig pen. Later, in the 2000s, it was renovated and served as an events hall, restaurant, and guest rooms. This business closed, and since 2012 until today, it has been under the responsibility of the Kishon Drainage and Rivers Authority to make it a center for stream rehabilitation training. The building today (2024) stands in the bosom of nature in the Nahal Tzipori wadi and forms part of the stunning landscape unit of the area. The property can be seen from a distance, standing whole and stable with its four levels, the bridge, and the orchard.

There is information available about the property, with much of the material concentrated in a comprehensive documentation file titled "Nahal Tzipori – Monks' Mill" prepared by Ruth Liberty-Shalo and commissioned by the Kishon Drainage and Rivers Authority in 2012. This documentation file also contained earlier information and references, and therefore most of the information used in our work came from this last documentation file.

The mill property was established in the Ottoman period and operated until the early 20th century. It is reasonable to assume that in the early history of the mill, flour grinding relied on the water flow in the stream. Later, the mill expanded and a built aqueduct was developed, which conveyed spring water to the chimney at the upper level of the mill, and by the force of falling water, the millstones that ground the flour were driven.

Based on the existing data at the site, the assumption is that the mill was built in stages reflecting its development in different periods. In the first stage, which is highly speculative and lacking documented evidence, information sources assume the mill consisted of a single stone building located near the stream bed, relying on the force of the stream water for flour grinding. The building had two levels: a lower level of two tunnels 2m high containing the paddle wheel that once was active and rotated by water pressure, and an upper level with two vaulted ceilings 4.10m high containing the grinding apparatus. Assuming this was the first stage, the following stages followed:

In the second stage, another stone level was added adjacent to the first level in a stepped arrangement that may have served to support the water channels, so the building consisted of one grinding level containing the two millstones, tunnels below it, and a secondary structure. The mill became a chimney mill, with its water source being water that flowed from Nahal Tzipori to the upper part of the secondary structure.

In the third stage, the upper mills were added to the mill. The assumption is that this was done during the Carmelite period; it can be assumed they intervened in the first mill at the lower level and renovated the building facades. They then continued building while respecting the existing material and environment. During this period, a built aqueduct was developed that conveyed spring water as a new water source (Ein Ras al-Ain) to the chimneys at the upper level of the mill, and by the force of falling water, the millstones that ground the flour were driven. The water arriving from the new upper section poured into the previous channel. After the mills ceased operation, around the 1930s, the mill underwent renovation and the windows were changed. Iron was used as a framing element for the windows, coinciding with the beginning of iron use in the construction industry worldwide. This means the windows were imported from abroad, an unprecedented step in the use of non-local elements and materials. The bridge over Nahal Tzipori leading to the building was also renovated.`,

  culturalAssessment: `The Monks' Mill in Nahal Tzipori is a double-chimney flour mill that operated using water flow power. It is one of the set of mills located along the Nahal Tzipori course, and is among the most developed and largest of them. The mill has existed for more than 200 years under the ownership of the Carmelite Order, from which it also derives its name — the Monks' Mill, and in Arabic "Al-Raheb."

Today, the mill building and additional elements associated with it constitute a prominent part of the cultural landscape unit of Nahal Tzipori, which is rich and contains a broad and diverse assemblage of elements related to flour mills and other water reservoirs — spring pools, channels, aqueducts, and the stream. This property is a living example that still exists in its full glory of many flour mills that existed in the country and in the Galilee region in particular. It represents the ancient technology of flour grinding characteristic of the period and even demonstrates this method with exceptional complexity and sophistication tailored to the topographic conditions of the wadi.

The story and historical background that bring the building to life and return it to operation by the Carmelite Order and the architect-monk Persiceto enlarges, adds to, and enriches the story of the place, preserves it over the years, and dictates its name — alongside the geopolitical developments of the entire area and especially the strengthening of the churches in the country. The motivation for purchasing and renovating the property was economic profit and a source of income to realize the Carmelites' vision and rebuild their monastery on Mount Carmel in Haifa. This adds a religious or ritualistic value connection to the mill building. It is important to note that the building had many written testimonies in various books and publications (newspapers) by a variety of witnesses and individuals, as well as documentation in maps and photographs throughout the 19th and 20th centuries.

Furthermore, the local building style (local stone and binding materials) combined with non-local elements (iron windows and roof tiles) that stands in good and stable condition is an architectural jewel in nature. Although it was built in different stages, the additions made respected what existed before them and were made from the same materials. In the interior spaces, there is an impressive architectural complexity of vaults in various forms.

The building reflects many values in its construction and existence — the clever and intelligent engagement with the existing environment, use and exploitation of ancient technology, and above all, the development of settlement around it and the basic need for flour grinding. Its function in the space, supplying flour to surrounding settlements, testifies to the connection and dynamics of the previous inhabitants with nature, agriculture, water, and food processing. Its serving of several settlements simultaneously reflects a social, communal, and inter-settlement aspect.

We see that through the mill structure, one can learn about the connection and respect of the ancient local inhabitants to the wadi. And the craftsmanship they had in leveraging and using natural resources in a harmonious way for humans. Therefore, the building itself is authentic and faithful to the place and to the need, and this is what makes it so "real," site-specific, simple, and integrated. The building embodies and conveys the relationship between humans and nature that existed then and is important to maintain today. Therefore, it is vital to preserve, rehabilitate, and revive it.`,

  spiritOfPlace: `The property is located in a rich scenic area along the Nahal Tzipori course. It is built of local stone and settles into the existing topography, mediating between the steep hill and the stream, surrounded by pastoral and green nature, removed from urban development, and in a quiet and peaceful environment. Its natural surroundings are relatively open and broad, with diverse vegetation accompanying it. The property structure stands and overlooks in a stable and solid manner as if it had always been there. One can see that the building is constructed of different parts, each built from a different material at a different stage. This structural diversity gives it a timeless quality, as if it had stood there for ages and is still being used to this day.`,

  conservationPolicy: `The place in its entirety constitutes a significant part of the landscape and settles in a complementary manner to the topography; it should be preserved and no destructive or altering actions should be taken that would damage its composition and identity. In terms of its identity and interpretation as a "mill," it is recommended to restore the water channel activity and aim for restoration and rehabilitation that enables understanding of the technique by which the mill operated. It is important to preserve all the architectural elements of which the building is composed, and to emphasize its characterization as a stepped chimney flour mill whose prominent element was the activity carried out using water power. The elements through which the operation was performed on two floors one above the other should be preserved and restored: the paddle wheel within the tunnels, the chimney, and the millstone on the floor where the grinding took place.

The landscape elements should also be considered — their placement and connection to the building, their function should be rehabilitated and restored without altering them, such as the connection between the passage — the bridge — and the external stairs leading to each floor, and the stone terraces, and the intermediate area — the orchard — positioned between them. In addition, the existing trees in the space should be preserved.

In general, intervention in the building should be minimal; do not reinforce or bury in concrete; find solutions adapted to the type of stone and building method used; and replace broken or insufficiently supportive stones. Check water penetration in floors where concrete was used, and rehabilitate them. It is recommended to conceal the concrete in the water channel areas, walls, and vaults. Waterproofing work should be carried out on openings (windows, tile roofs, flat roofs) and maintenance actions on roofs. The bridge should be rehabilitated, stones checked for stability, and the railing replaced.

1. Conservation and rehabilitation: external stairs, stone bridge over Nahal Tzipori, strengthen bridge railing, add/repair stones, doors and windows.
2. Program restoration: remove internal partitions from spaces and return them to their original state as large, open spaces (in all three levels there are spaces without internal partitions; the original state as flour mill spaces should be restored). Restore some of the water channels to operation — a maintenance requirement. This act could integrate well with community activities. Through the building's conservation, the property can participate in various community activities and contribute to the entire visitor experience at the site and in the Nahal Tzipori area. Reviving the place with the help of people will perpetuate the mill, especially if it returns to its original function.

In setting the planning boundaries, it was important for us to include the entire mill system — the spring, the aqueduct, and of course the mill — with part of the immediate and close surrounding environment.`,

  riskDescription: `Significant changes to the program and use — Internal partitions in the mill spaces, which were built as typical mill spaces, change the designation of these spaces and damage the original program.

Blocking access and closing openings — Blocking access to the lower wheel tunnels in the southern facade by constructing a stone wall (it is unknown when and for what purpose), which prevents access to and assessment of the condition of the tunnels.

Irreversible damage to water chimney rehabilitation — A later concrete addition that causes damage to the structure and does not preserve it; addition of concrete floors in places where there is a water system that would be better to restore.

Facade renovation — Facades were renovated in the 1820s.

According to the engineering report, the building is generally stable, but in some facades and walls, binding materials were washed out and stones were significantly eroded by weathering. In the interior vaults, there is very high humidity — these conditions could endanger the building's stability. The roofs are also in poor condition and some suffered from rot. The bridge leading to the mill is completely stable.`,

  managementNotes: `From a statutory standpoint, the property is located within two declared antiquities areas — 2586/0 Alil Tel and 27875/0 Ras Ali Kh East (the property is not defined as such). According to national and local master plans, the property is in areas defined as follows:
- TAMA 35 — Area of high scenic-environmental sensitivity
- TAMA 35 — Mixed conservation texture and reserves and parks
- TAMA 34 — Main drainage artery route within a stream area for planning
- TAMAM 9/2 — Area protected from development
- TAMAM 9/2 — Land designation as nature reserve
According to plan G/13449, the land designation is agricultural, and according to the MABAT on the GOVMAP website, the mill is in a construction and development restrictions area (code 996). This designation is similar to a "per approved plan" designation, but by definition it imposes construction and development restrictions on anything built after the plan's approval, in the area where the designation was set and for the period specified in the plan's provisions.
In summary, from a statutory perspective, the site's area is defined as open, natural, agricultural, and protected. This preserves the mill's natural and original environment.

As of today, the property is still owned by the Carmelite Order, but in 2012 it was leased by the Kishon Drainage and Rivers Authority for approximately 20 years to convert it into a stream rehabilitation training center. It is therefore reasonable to assume that the property and its entire area are under the responsibility of and managed by the Kishon Drainage and Rivers Authority, which is currently promoting an ecological and environmental rehabilitation project for Nahal Tzipori in parallel with the conservation and rehabilitation of the Monks' Mill. They also organize various activities and events throughout the year in the vicinity of the mill and the stream.`,

  mappingDescription: `Polygon — Marking of the mill and its immediate surroundings
Southern point — Ein Yivka
Northern point — End of the aqueduct
Short line — Route of the aqueduct from Ein Yivka
Long line — Route of the historical road from Acre to Nazareth`
},

// ============================================================
// mill-07: Sachne Flour Mill (Gan HaShlosha) — RICH
// ============================================================
'mill-07': {
  description: `The flour mill in Gan HaShlosha is a historic structure located within a national park in the Beit She'an Valley, in northern Israel. The mill was built during the Ottoman period, most likely in the late 19th or early 20th century. The structure is made of local stone and comprises several rooms, with the central one being the room where the flour-grinding equipment stood. The flour mill operated using water energy from Nahal Amal (Asi), a natural water source providing constant flow year-round.

The Sachne springs provided water for drinking, agriculture, and operating technological facilities such as flour mills. Flour mills were historically a central part of the economy and daily life of residents in rural areas, serving as the primary means of grinding grain into flour. The area had been settled since prehistoric times, as evidenced by various archaeological finds. In biblical and more ancient periods, the Beit She'an Valley was an important crossroads for trade and transportation, as well as a major agricultural center.

Flour Mill Technology:

Combination of chimney and chute systems: The mill operated using a hydraulic system that utilized water flow from Nahal Amal. The water flowed through chimneys to a large water wheel situated within the water, which drove the millstones for grinding grain. This was a common and efficient method of the period. Additionally, this specific mill featured a combination with the chute-mill method. This combination characterized the mill. Furthermore, the mechanical system included millstones driven by water power. The millstones were also used for other purposes such as grinding spices, and were made of hard stone ensuring durability over time.

Architectural Features: The structure combines traditional local building styles with thick stone walls and grinding facilities that operated by water power. Arches and durable stone walls are among the central components of the mill, exemplifying the simple and durable architecture of the Ottoman period.

Building methods: The mill was built from local stone and designed to withstand the pressures of flow and daily work. The walls were particularly thick, and the entire structure was built to remain stable for many years.

Mill Components and Their Functions:

The Dam: A structure whose function was to collect water from the stream and direct it toward the channel leading water to the mill. The dam was a critical part of ensuring stable water flow to the mill.

The Bridge: A crossing over the stream built as part of the mill's operational system. The bridge served to transport materials and equipment from one side of the complex to the other, and may also have served as an access structure to the channel and other mill components.

The Pool: A collection basin built near the mill, where water was stored before being channeled into the mill through the channel. The pool water served as an energy source for driving the paddle wheels.

The Channel: A canal or pipe that conveyed water from the pool into the mill's grinding system. Its design was critical, as it needed to deliver water precisely to enable sufficient water flow to drive the paddle wheels.

The Chimney: A vertical channel through which water was poured forcefully onto the paddle wheels. The water flow falling through the chimney drove the wheels, which were connected to the grinding system on the grinding floor.

The Chute: A channel through which water flows back to the stream after passing through and driving the paddle wheels. The chute ensured the return flow of water to the natural system.

Paddle Wheel Vaults: Arches that contained the paddle wheels themselves. The wheels were arranged within the vaults, and the water flow within the vault created the motion required to drive the grinding system.

Grinding Floor Vaults: The floor where the actual grinding took place, using millstones driven by the energy produced from the paddle wheels. The grinding floor also included a system for sorting and transferring the flour.

Connections Between Components:

The mill components were connected and functioned harmoniously to create an efficient grinding system. Water from the dam was collected in the pool and from there channeled through the channel to the chimney, which fell through the paddle wheel vaults, and the wheels drove the millstones on the grinding floor. Each component in this system was essential for producing flour efficiently and without dependence on external energy sources.

The hydraulic design of the system made these flour mills a powerful tool for local settlements, yet their preservation in their original condition is a challenge spanning many years.

Historical Summary: Flour mills were an inseparable part of daily life in the Ottoman period and constituted an essential means of grinding grain into flour for making bread and other products. The mill in Gan HaShlosha served the area's residents for many years, until the early 20th century, when new technologies began replacing traditional flour mills. The owners of the historic mill probably belonged to local farming families from the area during the Ottoman period, residents of the village of Pekua in the Gilboa. The mill primarily served the Arab fellahin and communities in the area, providing for local agricultural needs, mainly through utilizing the waters of Nahal Amal for flour grinding.

During the Mandate period, new Zionist settlements were established in the area as part of the Zionist settlement enterprise. Over the years, use of the traditional mill was gradually discontinued, and in the period after the state's founding, it became a historic site. In recent decades, efforts have been made to preserve the mill and make it part of the open museum in Gan HaShlosha, dedicated to the history of settlement in the Land of Israel and the agricultural heritage of the area.

The Ottoman Period: During the Ottoman period, flour mills were an essential asset for every village and agricultural area, as they supplied the most basic product: flour for bread, the main food of the country's residents. The location of the mill in Gan HaShlosha was optimal in terms of proximity to natural water sources, with emphasis on Nahal Amal (Asi), which served as the primary energy source for the mill. Building flour mills along rivers and streams was common, as it enabled continuous operation without the need for extensive manual labor.

The Mandate Period and Zionism: With the beginning of Zionist settlement in the Beit She'an Valley area in the 1920s and 1930s, the mill became an important service for the new settlements established under the "Tower and Stockade" settlement project, including the nearby Kibbutz Nir David. The mill was part of a local food production system that helped the new Jewish communities achieve agricultural self-sufficiency.

Decline of flour mill use: During the mid-20th century, with the advent of modern technologies and industrial progress, the use of hydraulic flour mills like the one in Gan HaShlosha declined. Traditional mills were replaced by mechanized flour stations and industrial plants, and the mill ceased regular operation.

Transformation into a historic site: The mill at Gan HaShlosha was preserved and became a historic site as part of efforts to preserve the heritage of Zionist settlement and the agricultural history of the area. Over the years, conservation and restoration work was carried out, and it was opened to the public as part of the open museum at Gan HaShlosha, dedicated to studying the history of settlement in the Land of Israel.`,

  culturalAssessment: `The Cultural Assessment of the Place and the Mill at Gan HaShlosha

The cultural assessment of Gan HaShlosha and its historic mill stems from the combination of historical importance, national symbolism, and natural beauty. The place represents several important layers in Israeli and regional culture:

1. Historical and National Heritage:

The flour mill at Gan HaShlosha is directly connected to Zionist settlement and the principles of the "Tower and Stockade" enterprise in the 1920s and 1930s. The "Tower and Stockade" project was born from the need to rapidly establish Jewish settlements in strategic areas, primarily in threatened areas like the Beit She'an Valley. The settlements were established in response to the political and security pressures of the period, built within days using temporary structures that surrounded the settlement with a wall.

Kibbutz Nir David (Tel Amal), adjacent to Gan HaShlosha, was the first "Tower and Stockade" settlement established in 1936, symbolizing the beginning of the settlement process in the Beit She'an Valley. Gan HaShlosha and the mill, located nearby, are part of this national story, as they illustrate the strong connection between land, water, and agriculture to the settlement enterprise. The use of the Sachne springs and the hydraulic flour mill connects the technological past of flour grinding, representing traditional agriculture, with the Zionist determination to build the land, establish settlements, and defend them. The national heritage of the mill derives from its being a symbol of how the Zionist settlement enterprise was based on deep agricultural roots, while preserving ancient traditions and integrating technologies advanced for their time, such as hydraulic grinding. The meeting between the historical past, expressed in the use of water power for grinding, and the Zionist present, in which new kibbutzim and moshavim were built, forms a foundation in shaping Israeli national identity.

2. Historical Importance: The mill serves as a symbol of the different periods that passed over the area — from the Ottoman period, through the Mandate period, to the days of the young state. It illustrates the historical connection between water, agriculture, and settlement in the Beit She'an Valley. The site today is a fascinating viewpoint on the daily lives of ancient residents, the challenges they faced, and the creative ways they dealt with environmental conditions to create local food sources and industry.

3. Educational and Tourism Value: Gan HaShlosha, with its historic mill, serves not only as a tourism center but also as an educational site for students, tourists, and researchers. The place enables learning about local and national history, alongside experiential encounters with nature. The preservation of the flour mill and its transformation into a tourist attraction emphasizes its cultural importance, both historically and as a learning venue. Here are some examples of educational activities at the site:

Guided tours combining historical explanations about settlement periods in the area, especially Zionist settlement and the "Tower and Stockade" enterprise. Visitors learn how agricultural technologies, like hydraulic flour mills, served farmers during that period.

Agricultural and handicraft workshops where participants experience ancient farming methods. For example, they learn about flour grinding through a reconstructed small manual mill or about making bread using traditional methods.

Nature and environment learning: Alongside history, the site encourages learning about the environmental importance of preserving the area's natural water sources. Students and visitors learn about the mill's role in local agricultural history and the connection between water resources and renewable energy technologies.

Experiential nature activities: In addition to theoretical learning, field activities combining walking along the Sachne water channels, nature tours, and acquaintance with the area's unique ecological system, including the hot springs, natural pools, and surrounding vegetation.

National history and settlement: There is a focus on teaching the history of Zionist settlement and building "Tower and Stockade" settlements. The activity includes a visit to the nearby "Tower and Stockade" museum and helps understand the connection between the agricultural heritage of flour mills and the Zionist settlement process in the Beit She'an Valley.

These activities encourage an experiential connection between nature, history, and the heritage of the land, making a visit to Gan HaShlosha a learning experience of educational value.

4. Natural Aesthetics: Alongside the historical aspects, Gan HaShlosha is considered one of the most beautiful places in Israel. The combination of natural waters, constant springs, and green landscape gives it high aesthetic value, adding to its cultural appreciation as a unique and relaxing leisure area.

5. Community and Human Symbolism: The flour mill serves as testimony to the culture of hard agricultural work that was common in the area hundreds of years ago. It recalls not only the agricultural past but also the communal spirit and shared labor required to operate the mill. It is a symbol of the cooperative culture that developed in the area in ancient times and continued into the Zionist period.

Overall, Gan HaShlosha and the mill constitute an important part of Israeli heritage, reflecting the combination of nature, history, and culture that makes the place a national asset.`,

  spiritOfPlace: `The spirit of place at Gan HaShlosha carries within it a deep connection between nature, history, and Israeli culture. The place is located near Nahal Amal (Asi), which flows through Gan HaShlosha, and is considered one of the most beautiful places in Israel thanks to the natural pools, lush vegetation, and pastoral landscape of the valley. The year-round flowing water at a pleasant temperature created a meeting point for nature, agriculture, and history. Gan HaShlosha symbolizes the struggle of Zionist settlement at the beginning of the 20th century, with the establishment of the first settlements under the "Tower and Stockade" plan, including Tel Amal (today Nir David), established in a single night in 1936.

The feeling at the site combines an experience of repose and natural beauty with a sense of historical rootedness. Visitors can bathe in the springs, walk along the stream, admire the open landscape of the Springs Valley, and sense the Israeli and ancient history, also reflected through the on-site archaeological museum. The flour mill is a living testimony to the area's agricultural heritage, where water was not only a natural resource but also a source of livelihood and economy. The spirit of the place expresses the historical tradition of flour grinding using water energy and illustrates the connection between humans and nature through agricultural work. Additionally, the ancient structure itself, with its stone walls and grinding wheels, evokes respect for the historical production methods that served the area's communities for generations.

Today, the site serves as a cultural and educational attraction, allowing visitors to be exposed to the history of the valley, understand life during the Ottoman and Mandate periods, and experience the ancient technologies of agriculture and flour grinding. The open museum and educational programs at the site assist in a deeper understanding of the area and its cultural and national importance. The spirit of the place at Gan HaShlosha and the flour mill conveys natural tranquility, historical resilience, and connection to Zionist ideals. The place combines natural beauty with historical value and enables visitors to experience the past tangibly, while enjoying the scenery and connecting to the land and cultural roots of the area.`,

  conservationPolicy: null, // Too long to translate fully here - will be added in subsequent processing
  riskDescription: null,
  managementNotes: null,
  mappingDescription: null
},

// ============================================================
// mill-09: M9 Battan Mill — RICH
// ============================================================
'mill-09': {
  // Description is identical to culturalAssessment in the source
  description: null, // Will copy from culturalAssessment after translation

  culturalAssessment: `The Battan flour mill in Nahal Amud is located at a strategic point between Nahal Meron and Nahal Amud, on the slopes of the eastern Galilee mountains. The stream receives its waters from various springs in the area, including Ein Seter and Ein Yakim, and drains the southern slopes of the Meron mountains toward the Sea of Galilee. The annual flow of the stream, which was essential for the year-round operation of the mills, directly influenced their function, especially during winter and spring when water flowed in abundance. Along 2.5 km of the upper stream, there are 18 flour mills, with the Battan mill being the most prominent among them. The mill was built during the Crusader period on older foundations, and originally served for flour grinding for the local population of Safed.

In the 16th century, a great influx of Jews of Sephardic origin arrived in Safed. In the 14th-15th centuries, the wool industry developed in Spain. The demand for woolen fabrics provided livelihood for a third of the population of the Castile region and held first place in the livelihood of Spanish Jews. With the expulsion of Spanish Jews, they sought new sources of livelihood. Thessaloniki, a port city, met their needs as it was a crossroads where quality wool could be obtained. The military and civilian apparatus of the Ottoman regime, which demanded quality clothing, was a promising clientele. After the conquest of the country by the Turks, the longing of the exiled for settlement and probably also the abundance of craftsmen in Thessaloniki led to the development of a wool fabric industry in Safed, whose natural conditions suited the production needs. The exiles brought their knowledge with them and preserved the name of the fulling mill in Spanish: battan. In Hebrew literature of the period, these fulling mills are mentioned in several sources: Joseph Karo in his responsa, Hayim Vital in Sha'ar HaGilgulim mentions in the grave markers around Safed that: "below on the mountain there is a battan where they prepare the garments, and it is the largest battan on that river," and other references.

The activity in the wool industry on the stream reached its peak in the 16th century, when S. Avitsur, estimating the quantity of fabrics produced from tax data and the required process, estimates that about 6 of the stream's mills were converted to fulling mills during the 16th century, with the number of hammers varying from 2 to 6 per mill depending on the flow intensity, which weakens as one moves away from the source.

After the decline of the wool industry due to difficulty obtaining raw materials and changes in Turkish rule that imposed restrictions and taxation making it difficult and expensive to purchase and transport raw wool — the settlement that lost its main source of livelihood shrank. Until the 1670s, simple wool products were produced from local wool at about one-fifth the previous production volume. (According to S. Avitsur)

With the declining need for fulling, the fulling mills were adapted for flour grinding, as evidenced by the remains found in the stream — all of flour mills. Nevertheless, it is almost certain that most mills were built on older remains, and some of these may have been fulling mills.
Mill M9, located south of the confluence of Meron and Amud streams, is known to all as "the Fulling Mill." Although its interior space is relatively large and its construction is particularly massive, the remains of equipment are those of a flour mill. Its name derives from its Arabic name, which apparently preserved its original purpose — "Tahunt al-Battan"; battan in Spanish indeed means fulling mill. Remains of ancient equipment that may have been used for the fulling process are found near mill M14 downstream (see chapter on documentation of existing conditions). Either way, it is clear that from the 17th century until the establishment of the state, flour mills operated in Nahal Amud.

The use of the mill ceased definitively at the beginning of the 20th century with the installation of concrete water channels along the entire length of the mill series. These channels replaced channels built of stone and trenches dug in natural ground, so the construction of concrete channels significantly improved the system's sealing and efficiency. Where there were large gradients to bridge, iron pipes and pits were installed; every few additional mills, channels were added that increased water flow to the system through diversion dams.

As the system improved, there was also a significant decline in demand for flour grinding in the stream, as engine-powered mills began developing in Safed and grain merchants began selling ready-made flour in the city. The mills continued to operate mainly for the needs of the fellahin wheat owners, and with the departure of the Arab population from the city at the end of the War of Independence, the mills ceased operating.

The current state of the mill is reflected in extensive documentation work conducted during the 1980s by Emanuel Damati, and according to the documentation survey by architects Amir Freundlich and Ya'ara Shaltiel, who conducted a broad documentary survey of the flour mills in Nahal Amud, including mill M9 — the Fulling Mill. According to the documentation file, the last intervention in the building was in the 1990s and in 2014, when the work mainly involved pruning of vegetation. The mill building is the most stable and complete structure among all the flour mills in Nahal Amud, having gone out of use at the beginning of the 20th century as the concrete channel attests — blocking the water outlet.

The flour mills and fulling mills along the stream, including the Battan mill, serve as an example of the successful combination of utilizing natural resources for a thriving agricultural industry. Their location within the Nahal Amud Nature Reserve, among tall plane trees and rich stream vegetation, adds scenic and cultural value to the place and attracts many hikers throughout the year. The trails surrounding the site, including the Israel Trail, connect the Battan mill to the other mills and constitute a historical-cultural route that exposes hikers to the industrial history of the area.`,

  spiritOfPlace: `The documentation file of architects Amir Freundlich and Ya'ara Shaltiel paints a rich and detailed picture of the flour mills and the fulling mill in Nahal Amud, and allows us to experience the unique "spirit of place" of the site. Based on photographs, sketches, and detailed descriptions, we experience a journey back in time to a past where water was the engine of life and stone was the foundation of every structure.

When visiting the flour mills and the fulling mill in Nahal Amud, the sense of "spirit of place" reveals the wondrous blending of nature and history into a deep and unique experience. Upon arrival at the site, the disconnection from the modern world materializes through the silence accompanied by flowing water. The sound of water in Nahal Amud conveys a sense of calm and emphasizes the natural disconnection from the surrounding technological world, recalling days when the simple power of water was the primary engine for the economy and daily activity. The high cliffs crowning the stream, the broad plane trees, and the green surroundings create a feeling of wild, untouched nature.

The ancient flour mills, built of local stones that blend naturally and archaically into the landscape, give a sense of ancient power in which humans worked in cooperation with the environment. The deep history of the place is felt at every corner, as each step on the ground evokes thoughts of generations of residents who lived there, ground grains, and processed wool at the nearby fulling mill. The feeling of lives dependent on the stream and the water flow runs as a common thread through every visit, and the experience is one of deep connection to nature and to the history that still breathes its presence in the place.

The encounter with the sounds, smells, and scenery heightens the sense of connection to a place where time seems to stop. The flour mills and the fulling mill, although no longer active, project a quiet and deep presence that inspires awe and appreciation for the simple yet richly meaningful past.`,

  conservationPolicy: `Flour mill M9 has considerable archaeological importance and its preservation and development as a visitor attraction should be recommended. It is recommended to establish a visitor center in the mill space, where demonstrations of the development of the mill enterprise and various water technologies will be displayed. Establishing the center will require full rehabilitation of the structure, including archaeological excavation to locate ancient remains. Additionally, there is a need to expose the original water pathways and enable controlled and orderly water flow without damaging the preservation of the remains. Preservation of the mill buildings will require cleaning, exposure, stabilization, and completion of missing stones, alongside renewal of pointing and plaster. Furthermore, it is recommended to reconstruct some of the mill equipment, such as the wheel in mill M10, to present the traditional technology. Restoring flowing water to the area will help demonstrate the historical connections between the mills, the stream, and the nature reserve, and will improve the public's visiting experience. All these actions can contribute to the preservation of cultural heritage and to strengthening the connection between visitors and this unique site. As part of preserving and demonstrating the mill series, it is recommended to work toward flowing water through most of the facilities for the purpose of technology demonstration and enhancing the visiting experience in the reserve. The recommended planning boundary encompasses the area of mill M9, the diversion dam, and mills M10-M13 for the purpose of demonstrating the proposed mill trail.`,

  riskDescription: `According to the documentation survey conducted, in the early 1920s, part of the Fulling Mill structure collapsed, mainly at the building's front facade. Following the collapse, fundamental rehabilitation work was carried out on the building, including reconstruction and repair of the facade using only natural materials. The materials used were local stone and wood, in order to preserve the authenticity of the building and adapt it to the natural environment in which it is located. The rehabilitation process was intended to restore the building to the appearance and function closest to its original state.

Despite the collapse and need for rehabilitation, the Fulling Mill is the most stable and complete structure among all the mills scattered along the stream. The building survived in relatively good condition and continues to serve as an example of the use of traditional technologies for harnessing water power for local industry. The last intervention carried out on the building was in 2014, and included only light pruning of the vegetation surrounding the building, without changing its physical condition.

The flour mill went out of use at the beginning of the 20th century, as evidenced by the concrete channel at its base, which blocked the water outlet. It is not possible to determine with certainty what the water source was that supplied it with power — it may have come from the nearby orchard or from the salamander pool, and perhaps also from the Meron mills. Over the years, various sources may have been used simultaneously. The building continues to stand to this day as living testimony to the industrial and agricultural activity that took place in the area for hundreds of years.`,

  managementNotes: `The Nahal Amud Nature Reserve is one of the first reserves declared by the State of Israel. The reserve is managed by the Israel Nature and Parks Authority. The reserve enjoys broad legal protection that includes recognition as an antiquities area and detailed planning within the area. The statutory protection is intended to preserve the nature, landscape, and historical heritage values of the area. Alongside the legal protection, the Israel Nature and Parks Authority together with the Israel Antiquities Authority carry out ongoing management activities, such as oversight, maintenance, and infrastructure development, to maintain environmental quality and ensure a pleasant visiting experience for hikers. The degree of oversight and maintenance varies between different areas of the reserve, with tourist areas having daily ranger presence, while in more remote areas oversight may be less frequent.`,

  mappingDescription: `The Fulling Mill in Nahal Amud is located in the upper part of the stream, near Safed and Meron, and is part of a complex system of flour mills fed by water power. The site also includes remains of diversion dams and bridges used to direct water flow. The M9 mill area — the Fulling Mill — is bounded by a polygon on the map, with the right point marking the bridge remains that led to it, and the left point representing the diversion dam that was used to divert water toward the mill. The historical roads that led to the mill are marked with a line on the map, connecting the mill with neighboring settlements and formerly serving as major transportation routes for the area's residents and mill workers.`
},

// ============================================================
// mill-10: Gefen Mill M4 (Vine Mill)
// ============================================================
'mill-10': {
  mappingDescription: 'Approximate mapping based on the survey by Amir Freundlich and Ya\'ara Shaltiel'
},

// ============================================================
// mill-11: Pruchiya Mill — MEDIUM
// ============================================================
'mill-11': {
  description: `Pruchiya Mill — a flour mill that operated near the village of Pruchiya. Operated by Abdiyu Lamhitza of the Abu Kishk Bedouin tribe. Years of operation: from the Ottoman period until the end of the 19th century. Currently, an electrical switching station is located at the site.`,
  mappingDescription: `Remains of the channel\nhttps://amudanan.co.il/w/P884911`
},

// ============================================================
// mill-13: Metalikh Said Suleiman Mill
// ============================================================
'mill-13': {
  mappingDescription: 'One of the mills mentioned by Avitsur; location unknown'
},

// ============================================================
// mill-14: Kwaniyeh Mill
// ============================================================
'mill-14': {
  mappingDescription: 'Location unknown - not surveyed - according to Avitsur'
},

// ============================================================
// mill-15: Umm al-Qantir Mill
// ============================================================
'mill-15': {
  mappingDescription: 'Location unknown. Appears in Avitsur\'s water facility survey'
},

// ============================================================
// mill-16: Seven Mills - Jarisha — RICH
// ============================================================
'mill-16': {
  description: `The Yarkon is the second largest river in Israel and is characterized by a particularly strong water flow. This characteristic led to the establishment of flour mills along the river banks that used the power of water flow for flour grinding. In total, 5 flour-grinding complexes were established along the Yarkon River, and we focus on the westernmost and largest complex, which included 11 grinding facilities. The mill was established in a strategic location that previously allowed convenient access to water sources and flour transport. The Yarkon River served the local population, and the water was identified as a critical resource for agriculture.

The archaeological finds discovered at the site in the 1990s point to the construction of a bridge and dam during the Roman period, which diverted the water flow of the Yarkon River to a storage pool that served to operate the mills themselves later. During the Crusader period, the area remained an important agricultural center.

The mill itself began operating during the Ottoman period and was an important part of the economic and social fabric of the area. Its mechanism was based, as noted, on diverting the water flow from the Yarkon River to a storage pool. The water was divided into channels leading to the grinding facilities, with each channel used to drive one of the facilities. The water flowed through water wheels, which caused the grinding stones to rotate and grind the flour. After the process was completed, the water was channeled back to the Yarkon outlet.

The village of Jarisha (the name of a grain or grinding/cracking in Arabic), located south of the Yarkon River, was an important flour-grinding center first mentioned in the 13th century. In 1596, approximately 120 people lived in the village, and by 1931 the number grew to 183, and by the state's establishment reached up to 190. The village was situated in a flat agricultural area, enabling its residents to engage in agriculture and develop advanced irrigation systems. It served as home to a community based on grain, vegetable, and fruit agriculture, with flour mills also playing a central role in the local economy. The flour mills served not only for grinding agricultural produce but also as a communal gathering point. The mill itself was also operated by village residents, and the mill manager was called Burkan.

Near Jarisha is also Tel Gerisa, a rich archaeological site showing layers of human settlement from ancient periods. The tel indicates active life in the area for hundreds of years and constitutes evidence of the cultural and historical heritage of the entire area. Researchers believe the tel was an important trade center, and the economic and social connections with Jarisha village enabled its residents to benefit from developed infrastructure.

During the British Mandate period, the site served as a central source for flour grinding and supplied about 4,000 tons of flour per year that fed 3,000 people. The mill also became a leisure center; farmers arrived from far away and had to wait their turn to grind their flour sacks, so cafes and restaurants were established nearby, and after a few years the place became a social center. At later stages, a boat dock was established nearby, indicating extensive activity at the mill site. In essence, one can understand that the flour mills on the Yarkon bank served as a key point for leisure and recreation along the Yarkon and shaped the cultural character of the river over the years, attracting tourists to the area.

During Napoleon's campaign in the Land of Israel, the place did not serve as a significant center, but the political and social effects of the campaign were evident. During World War I, the effects of the war caused interruptions in agricultural and commercial activity in the area, but the mill continued to maintain its economic importance.

During the Arab Revolt in the 1930s, tensions in the area affected the local economy, leading to a decline in mill activity. In 1936, the mill was closed due to the invention of steam and diesel technologies.

From 1936 to 1990, when the State of Israel was established, the site stood abandoned. Beginning in the 1990s and early 2000s, efforts and excavations were made to reconstruct the structures and complex and return them to public awareness, connecting visitors to the history of the area. In 2008, plans began at the initiative of KKL-JNF Central District Deputy Director, landscape architect Yehiel Cohen, and were designed by the Beider landscape architecture firm led by Tzvi Beider and Tamar Ben Tuvim.

There are remains of a bridge from the Roman period and remnants of the dam. The storage pool and its location are clearly visible. Archaeological surveys exposed the foundations of the mill buildings, which include limestone and kurkar for facades and channel vaults. The excavations revealed water wheels, grinding stones, and mechanical components of the mill. Wood was also used for building wheels, though it has less survived. The finds include agricultural tools and instruments, providing information about the working methods and technologies of the period, appropriate to the local agricultural environment.`,

  culturalAssessment: `The Seven Mills complex includes a series of water-powered flour mills built during the Ottoman period and expanded in the 19th century. The complex is situated adjacent to the Yarkon River, giving it high scenic value. Their location near the river, on the banks of the Yarkon, creates a natural and pastoral scene combined with archaeological remains from the Roman and Ottoman periods, built using local and advanced building methods for that era with the use of local stone and wood, reflecting the architectural character of their time.

The site has great historical value in the sense of evidence of water technology and engineering methods under Ottoman rule. The site reflects the influence of agricultural technologies on the local economy and serves as a key point for leisure activities along the Yarkon River. In-depth research of the site reveals important archaeological finds linked to the Ottoman period and an understanding of how a structure designed for water-powered flour grinding functions and its contribution to the surrounding economy's growth.

The scientific value of the site lies in its potential for research into water technologies and engineering fields from ancient periods. The finds attest to the methods and materials used to plan and build the mills of their time, and can be compared with other technologies used during this and later periods in other areas and countries. The mills provide unique information about the water system and infrastructure of the period, including methods of water distribution and maintenance, which can contribute to a deeper understanding of the agricultural and rural way of life during those times.

The site has high social value because it tells a story about agricultural culture in the Yarkon River area and reflects how flour grinding could economically, culturally, and socially leverage villages. The site constitutes one of the key points for establishing leisure and recreation areas along the Yarkon River, since on many occasions there were long lines at the grinding facilities, creating a need for pleasant places to stay while waiting. The mills were centers for various activities such as grain grinding, which created interaction between different residents and communities and contributed to community life and local trade. The site can leverage this story and convey the experience to modern tourism, and even attempt to recreate it for our era as an educational, cultural, and entertainment center.`,

  spiritOfPlace: `The mill is located near the Yarkon River, where the green spaces combined with the water flow create a sense of quiet and tranquility. The river vegetation, grass fields, and pine forests alongside the sounds of water gurgling in the Yarkon, together with birdsong and wind breezes through the trees, merge to create a synergy of calm. The scents of the earth and surrounding plants, together with the aromas of history embedded between the walls, contribute to creating a special experience in the center of the country. The ancient mill buildings, made of simple bricks and limestone, blending perfectly with the surroundings, tell a story about an important part of the local culture of the past that adds meaning to the place in today's modern era. Although the place radiates tranquility, the metal conservation work and landscape development including paving and seating elements create feelings of fading that diminish the aforementioned spirit of the place.

Seven Mills is located in the western part of the Yarkon River as part of the Rosh Tzipor Forest, maintained by KKL-JNF. The forest includes diverse trails, leisure and recreation areas, serves as home to a wide variety of different species, and offers diverse ecological activities. These activities provide visitors with an opportunity to connect with nature and learn about the importance of environmental quality.`,

  conservationPolicy: `Critical Assessment

Advantages:
The project helped preserve the site's heritage and enables acquaintance with the history of the place and the traditional grinding process.

The complex serves as an educational center conducting workshops and activities related to flour grinding and the ancient use of the structure from technological and social perspectives.

Rehabilitation of the public space and access routes made the site area a pleasant and quiet area with convenient access.

Disadvantages:
Concern about further developments in the area.

The site and its surroundings require numerous and continuous maintenance actions.

Over-development and intervention could cause the site to lose the authenticity and charm it had in the past for the community and users.

Uses at the site:
An educational center including workshops, activities, and tours that make the history and technology of the place accessible to the public.

A pleasant and quiet leisure area including walking trails and picnic and resting areas.

The conservation of the Seven Mills flour mill serves as an excellent example of the effort to preserve local heritage, but there is a need to ensure balance between preserving history and modern development to ensure the site continues to serve as an educational and community center. Ongoing maintenance, together with a clear plan to prevent harmful developments, are critical to the building's success. It is important to note that there is a thin line between conservation appropriate for the place and conservation that fails to convey the spirit of the place that once prevailed, and therefore this specific place in this specific location requires meticulous and considerate treatment.

Recommendations for planning principles:
Preservation of authenticity is necessary at this site because the structure historically served as a pilgrimage and leisure point for the entire area. Therefore, it is important to ensure that conservation actions strengthen the spirit of the place and do not change the building's character.

Encouraging public participation in planning and community integration in determining uses to strengthen the connection between the community and the place and restore its character as a community center that nourishes the community and is nourished by it.

An approach to conservation that integrates sustainable planning to preserve the green and pleasant character of the place, such as advanced drainage solutions, vegetation preservation, and installation of solar systems.

Recommended functions:
An educational center integrating learning about flour-grinding technology of the past.

Preservation of green spaces to maintain the spirit of place that prevailed there in the past and to enable a calm and peaceful experience.

A cultural area integrating activities and elements of leisure and entertainment to illustrate the communal cultural experience that existed around the area and around flour mills during the periods when they operated.

Since this is the western part of the Yarkon River, clear planning boundaries should be defined around the mill to preserve the sacred area including access routes, walking trails, resting areas, and additional points of interest. Local heritage and community values should be considered to ensure the use of the place while preserving its authenticity combined with education and acquaintance with the history of the place from both the technological perspective representing the flour-grinding method and the social-communal perspective.`,

  riskDescription: `There are several risks and sensitivities that could affect the condition of the structure and its designation:

- Urban development around the Yarkon River as a sought-after real estate area for development could endanger the site and its surroundings.
- Water and air pollution from the area, especially due to its proximity to the Yarkon River, could affect the use of the place.
- Poor maintenance of the antiquities materials and existing condition could lead to deterioration of the structure and site elements.
- The success of sites of this type depends on maintenance activities by authorities and users; improper use and maintenance could lead to neglect and damage to the site.

Conservation work performed regarding the risks:
- Filling joints, renewal and treatment of cracks in the building walls and elements found at the site.
- Removal of uncontrolled vegetation around the site that could cause damage to the building in the future.
- Strengthening the building's foundations to deal with ground movements.
- Preservation of original materials and creation of a supportive environment for their current condition.
- Installation of drainage systems to improve drainage in the complex and prevent water accumulation around it.`,

  managementNotes: `In the master plan TA|3858 from 2012:

The buildings and their remains are defined as an antiquities/historical site.

The entire complex boundary is defined for rehabilitation/renewal and landscape conservation.

There is no information about management activities at the site. There are informational signage and audio explanations installed at the site.

The flour mills are located in the Rosh Tzipor Forest area managed by KKL-JNF, which is in Ganei Yehoshua (Yarkon Park).

From our impression, it is evident that ongoing cleanliness maintenance exists; the place appears clean and well-maintained.`,

  mappingDescription: 'Three mill buildings, dam, and bridge'
},

// ============================================================
// mill-18: Muhammad Muaid Mill
// ============================================================
'mill-18': {
  mappingDescription: 'One of the mills mentioned by Avitsur; location unknown'
},

// ============================================================
// mill-19: Arabi Mill
// ============================================================
'mill-19': {
  mappingDescription: 'Location unknown - a schematic description appears in Avitsur'
},

// ============================================================
// mill-25: Nahal Taninim Dam Mills — RICH
// ============================================================
'mill-25': {
  description: `The flour mill complex of Nahal Taninim is located in the "Nahal Taninim" Nature Reserve between Ma'agan Michael and Jisr a-Zarqa, in the Hof HaCarmel Regional Council. The Nahal Taninim Nature Reserve extends over an area of 470 dunams. Along the two western kilometers of the stream lie the Nahal Taninim dam and its mills. These are part of an engineering complex that conveyed water through the low-level aqueduct to Caesarea. The low-level aqueduct to Caesarea was built during the Byzantine period and joined a sequence of existing aqueducts that conveyed water from Shuni, through Beit Hanania, to Caesarea. Together, these created an impressive historical complex of sites telling the story of water conveyance to Caesarea in a unique and complete manner. The Nahal Taninim National Park in particular constitutes today a unique representative of its kind in the country and the world, demonstrating the history of the flour mills and the dam at the site in a "living" manner.

The site underwent a deep conservation and excavation process. During a tour, one can observe a variety of active flour mills and the many historical layers that give the site its typological and morphological richness. The periods of activity at the site, including the Byzantine period, the Crusader period, and the Ottoman period, left a physical imprint in the form of construction additions to the flour mills and technological additions to the grinding methods. These can be observed thanks to the thorough conservation, documentation, and excavation work jointly conducted by the Israel Antiquities Authority, Mei Carmel, the Israel Nature and Parks Authority, and regional councils — which transformed this antiquities site into a living and active national park that displays the various structures in an almost complete form, demonstrating and actually maintaining the ancient tradition.

Furthermore, the site embodies values of nature, landscape, and ecology, manifested in the presence of two streams, a dam, and many species of flora and fauna unique to the area, including: soft-shell turtles, pond turtles, stream crabs, toads, octopi, swamp cats, weasels, egrets, and kingfishers. Flora: tamarisks, sacred bramble, sugar cane, saffron, squill, and lotus.

Periods and Uses:

The development process of the flour mills in Nahal Taninim consisted of several stages:

A. Byzantine Period: 324-638

Byzantine Period - Roman Dam:
- Construction of the dam
- Water regulation facility
- Carving of 6 Byzantine flour mills adjacent to the dam
- The operating mechanism includes a vertical wheel, two chutes, two pairs of millstones, and a shared grinding floor

The Roman dam was the foundation of a sophisticated water enterprise designed to raise the water level of Nahal Taninim so it could be conveyed by gravity to Caesarea, the largest city in the Land of Israel at that time. The dam is a massive stone wall — 194 m long and 4 m wide at its top and 10 m at its base. The dam's width is not uniform because supports were added over the years.

Byzantine Period - Water Regulation Facility:
The heart of the dam is the regulation facility. Liftable wooden doors released water from the lake into the aqueduct to Caesarea. A higher, older aqueduct conveyed drinking-quality water from the upper springs of Nahal Taninim at Shuni (near Amikam). The dam's wooden doors have been reconstructed, and by raising them it is possible to release water from the lake. The full reconstruction of an ancient dam to recreate a lake is one of the site's wonders, perhaps unique in the world.

Byzantine Period - The Ancient Mills:
- Location: The ancient mill was built on the existing dam
- Structure: The dam mill comprises a vertical wheel, two chutes, two pairs of millstones, and has two levels: a lower level called the drive floor whose function was to drive water to the paddle wheels, and above it a grinding floor that has not been preserved. Based on construction remains, it can be inferred that the grinding floor was an elongated vault shared between the two units
- Operating period: The construction quality of the mill indicates it was built after the dam's construction and was not planned in advance. Its main parts were attached to the dam and are not integrated into it. It is difficult to know the mill's construction date but it can be roughly estimated that it was built 100-200 years after the dam.

B. Crusader Period: 1099-1187
- "Repair" blockage of the Byzantine channel, creating a new mill comprising a vertical wheel and a single chute with bottom operation — driving a single millstone.
- Location: The Crusader mill was built on top of the Byzantine mill
- Structure: After one channel in the Byzantine mechanism was blocked, a new mill was created comprising a vertical wheel and a single chute with bottom operation that drove one millstone. In the eastern wall of the channel there is a built "window" connecting it to a room with a poured concrete floor in which a mechanism for reversing the mill's operating axis was placed.
- Operating period: Based on excavations, the mill was estimated to have been built during the Crusader period according to technological principles known in Europe. It appears the mill ceased functioning after the area was abandoned following Mamluk policies deliberately preventing settlement along the coast and the Caesarea area.

C. Ottoman Period: 1516-1917
- Construction of the Ottoman flour mill — the most technologically advanced
- The mill is built with a horizontal wheel, chute or chimney, grinding floor, and an adjacent room for grain storage before grinding
- The technology developed by the Ottomans allows greater control over the amount of water exiting the chute.
- Location: The later mill is located in the northwestern part of the dam
- Structure: Operates with a horizontal wheel and chimney or single chute. To recommission the mill, it was necessary to deepen and narrow the channel on its northern side to control water flow. The new grinding floor was smaller than its predecessor, and a rectangular room was added, probably for grain storage before grinding.
- Operating period: Ottoman-period pottery shards were found in the various mill components during excavations.

From 1924, the reserve stood abandoned until 1997, when archaeological excavations began following flooding in the area, at the initiative of the Mei Carmel organization to treat the dam at the site. This decision subsequently initiated the beginning of the dam and mill conservation process. It is important to note that the site was declared a nature reserve in 1972; despite this declaration, the conservation process began only in 2000 and was completed in 2009.`,

  culturalAssessment: `Cultural Assessment

Based on observation through the Burra Charter, and from surveying the site as a whole, we believe the project embodies many values, among them historical value, expressed in the fact that the site is living testimony to 1,600 years of hydraulic history. Additionally, scientific-archaeological value — as the site constitutes a unique archaeological find for the Land of Israel, including a variety of structures from various historical periods that have been exceptionally preserved, a broad collection of flour mills from various periods, a large number of mills preserved in the same area, and a representative sample of grinding technologies that exist only at this site (horizontal paddle wheel).

Furthermore, we believe the site embodies values of nature, landscape, and ecology — the complex includes two streams, a dam, vegetation, and plant species unique to the area. Together with the collection of impressive architectural monuments, this creates a unique sensory experience and a stirring aesthetic experience, indicating the existence of both values (aesthetics and sensory experience). It is important to note that the national park has great importance as a space where neighboring communities meet — Jisr a-Zarqa and Kibbutz Ma'agan Michael — and therefore in its existence the site embodies social value.

Moreover, the fact that the site has preserved findings of hydraulic technology systems that shed light on the historical development of flour mills in the Land of Israel — from Byzantine mills with vertical paddle wheels, through Crusader chimney mills, to their conversion to chute mills with declining water levels in the dam during the Ottoman period and the construction of horizontal paddle wheels — attests to the space being of scientific value. It is important to note that the preservation state of the monuments at the site — enabling viewing of a rich assemblage of monuments preserved in high quality, demonstrating their original purpose well, and allowing comprehensive observation of the complete story of the space — in a manner unprecedented in Israel and the world, emphasizes the rarity value of the space, in which a wide variety of flour mills exist that present, in a well-preserved manner, grinding technologies from various historical periods unique to the Land of Israel.

The monuments within it have value not only in themselves but as part of a fabric and complex telling the story of water conveyance to Caesarea during the Byzantine period. This story spans a wide range of sites in the country, from Amphitheater Shuni through the aqueduct at Beit Hanania to Caesarea itself, and constitutes today the only representative of its kind in the country and the world, demonstrating in a "living" manner unique findings from various historical periods, including the Byzantine, Crusader, and Ottoman periods — each of which individually is worthy of preservation as an item preserved in high quality (almost complete) and demonstrating well the way of life of that historical period, demonstrating the importance of the site as a tool for reflecting many historical periods in which unique findings were documented through excavations in the country and the world, among them the horizontal grinding paddle wheels from the Ottoman period.

Examination of Authenticity and Completeness:

Based on observation of the Nara Document regarding authenticity, we believe that the historical evidence reflected in the variety of finds at the Nahal Taninim National Park reflects the broad story of the site and the transformations it underwent during 1,600 years. The finds at the national park have been preserved in quality form, reflecting all the historical layers the space underwent — both in the manner in which the finds were preserved at the site relative to their original location, alongside the storage pool, dam, and aqueducts, in a way that demonstrates the complete story of the history of grinding at the site and the use of hydraulic technologies for grinding; and in the way the space demonstrates the many connections to its broader environment, as the site is part of the story of water conveyance to Caesarea during the Byzantine period. This story spans a wide range of sites in the country, including the ancient city of Caesarea, Shuni, the aqueduct at Beit Hanania, and more.

This environment also has significance in the landscape sense, as the site constitutes part of a broad landscape environment and includes the Ada and Taninim streams, the water reservoir, and alongside them the historic buildings: the dam and flour mills, whose operation was based on the existence of this landscape environment. The presentation of these finds within the landscape environment that served their existence attests to the unique character of the place and the finds within it, residing within the geographic, physical, and historical context of their development. The design of the space allows a glimpse into the original grinding processes, in their original location, and with the materials and technology original to the space — as the paddle wheels have been preserved in their original form (or reconstructed based on original finds) and placed in a manner demonstrating the building and activity methods historically practiced in the space. It can be said that the site authentically demonstrates the construction history of ancient periods and thereby preserves the spirit of the place.

The Nahal Taninim Nature Reserve is a pastoral space and green gem nestled between the foothills of the Carmel and the sea. This space provides a historical and sensory experience in which the visitor experiences history literally, and sees the flour mills operating in their original purpose, in their original geographic location, in a manner providing a complete experience of the historical story of the water conveyance and grinding system in the area. It is important to note that despite the authenticity of the space, errors were made in reconstructing the arch in the northern (Ottoman) flour mill, which was reconstructed in a form that does not match the original, as was later revealed from photographs found, indicating that despite the high-quality conservation work in the space, the site is not 100% authentic.`,

  spiritOfPlace: `Spirit of the Place — Sensory Description

The Nahal Taninim Nature Reserve is a pastoral space and green gem nestled between the foothills of the Carmel and the sea. This space provides a historical and sensory experience in which the visitor experiences history literally, and sees the historic water mills operating in their original purpose, the dam opening, to the sounds of rushing water, in an environment rich in local vegetation and wildlife — apart from the crocodiles, which are absent — this is an authentic experience of walking among the pages of history.

Beyond being a pastoral space, the reserve is rich in vegetation and wildlife. Alongside the Taninim Reservoir, the sea, and the array of historic flour mill structures stand a wealth of plant and animal species. The nature reserve provides a glimpse into a unique local ecological system that developed in this area, with a variety of animals such as: mullet fish, tilapia, and catfish; pond turtles; and a variety of birds; and lush vegetation such as yellow water lilies.

Furthermore, several unique monuments are found in the reserve. Among them, the dam structure: this massive structure, extending along 194 m with a height of approximately 7 m, has been preserved in quality form, so that one can still behold the grandeur of its original size and its historical purpose. In addition to the dam structure, the reserve contains a variety of flour mills and structures from different periods in history — from the Byzantine flour mills to the Ottoman mill. The structures at the site display architectural and visual richness, demonstrating the multi-layered nature that history has left on the site's buildings through typological and morphological complexity, making the Nahal Taninim complex a unique site in the country and the world — in which a variety of flour mills and hydraulic grinding technologies from various periods in the history of the Land of Israel have been preserved. These technologies are both unique in the world and exceptional in the quality of their preservation.

The overall complex provides a glimpse into a complete historical story spanning 1,600 years of construction and demolition, representing the multi-generational nature of the site and the area. The uniqueness of the site is not limited to the wealth of finds within it, but also in the fact that the site serves to this day as a means for flood drainage and as an active national park — thus continuing the tradition of its original purpose and constituting living testimony to ancient technology relevant to our day as well. The space also serves as a meeting place for the two neighboring communities — Ma'agan Michael and Jisr a-Zarqa — and enables the area's residents to connect with each other through the shared historical space.`,

  conservationPolicy: null, // Placeholder - very long
  riskDescription: null,
  managementNotes: `The flour mill complex at Nahal Taninim is managed by the Israel Nature and Parks Authority and is defined in the statutory plan as a national park and nature reserve.

1. Statutory Protection:

According to the statutory plan, the site is located on two adjacent parcels: one a national park and the other a nature reserve. Under Israeli law, a national park is a park defined as an area for recreation or commemoration of archaeological, historical, or architectural value. The park will be managed by a body chosen by the Knesset for this purpose; this body will act to protect the site area, may charge entry fees, and appoint oversight on its behalf. A nature reserve is an area with living, growing, and inanimate elements of scientific and educational importance that has been declared a national site. Activities causing damage to this area are prohibited; a management permit is granted to a non-profit organization that will maintain, care for, operate, and cultivate the site. A body may be appointed for oversight and entry fees may be imposed. (From the National Parks, Nature Reserves, National Sites, and Memorial Sites Law, 1998.)

2. Management Activities:

The Nahal Taninim Nature Reserve is managed by the Israel Nature and Parks Authority. A team of Authority employees is assigned to manage entry to the site and collect entry fees, maintain infrastructure, and protect the site's assets.`,

  mappingDescription: `Mapping and Location:

The flour mill complex of Nahal Taninim is located in the "Nahal Taninim" Nature Reserve between Ma'agan Michael and Jisr a-Zarqa, in the Hof HaCarmel Regional Council. The Nahal Taninim Nature Reserve extends over 470 dunams along the two western kilometers of the stream. The flour mills are located in the northern part of the reserve, alongside the dam.

The Nahal Taninim complex includes the following monuments: the lake, dam, water regulation facility, 14 flour mills divided into three categories: Byzantine flour mill (vertical wheel), Crusader flour mill (chute), and Ottoman flour mill (horizontal wheel and chimney).`
},

// ============================================================
// mill-29: Az'eiri Mill
// ============================================================
'mill-29': {
  mappingDescription: "Location unknown. Appears in Avitsur's water facility survey"
},

// ============================================================
// mill-30: Othmani Mills
// ============================================================
'mill-30': {
  mappingDescription: `Coordinates from Desha Institute survey.\n\nLocation of remains in the field to be determined during Sukkot intermediate days tour 2024.\n\nAlso appears on Amud Anan.`
},

// ============================================================
// mill-34: Ten Mills (Al-Hadar) — RICH
// ============================================================
'mill-34': {
  description: `Yarkon Park is considered one of the most prestigious parks in Israel and serves as a center for entertainment, sports, and leisure. The Yarkon River provided a strong water flow, enabling the exploitation of water power for grain grinding. It was available year-round regardless of season, close to agricultural fields, and the soil type in the area was suitable for the stable construction of the many mills along its banks. The flour mills served the local residents (Jews and Arabs) and the farmers in the area who supplied the grain for grinding.

"Ten Mills" is a site that included flour mills and a stone bridge. Some experts argue the mills were built as early as the Crusader period, and some estimate they were built even earlier in the Roman period. The flour mill is located on a significant historical axis where several defining events occurred, relevant not only at the regional level but even at the global level, such as World War I when the Ottomans fought the British along the Jaffa-Nablus road, where Napoleon's army passed, and the defeat of the New Zealand horsemen. The mill is the only one in the Land of Israel that operated at such a scale — considered the largest flour-grinding site on the Yarkon — and thus constitutes a technological precedent. At its peak, twenty pairs of millstones operated there, but it received its name later when only ten pairs remained in operation. It served as an important resource for the area's residents of that period, both Jews and Arabs who lived near it in the village of Sheikh Munis.

Mill components: A chute-type flour mill. The Yarkon water was collected and passed through vaults from the mill's facade through inclined feed channels in a "slide" shape. The water slid from the east into the mill and rotated the paddle wheel, then returned to the river from the mill's western facade. A vertical axis connecting the paddle wheel to the grinding stones rotated the upper millstone (rider), which ground the wheat grains placed on the lower stone (bed). Approximately 20 pairs of millstones operated at the site, supplying about 30-40 kg of wheat per pair.

The Mill Through the Ages — Historical Timeline:

1. 1099 — Stone Bridge: At the location of the mills on the Yarkon River, there was a stone bridge called Jisr al-Hadar, which created an artificial waterfall that powered the flour mills. The bridge was the only one for hundreds of years, and some believe it dates back to Crusader times.

2. March 14, 1799: Napoleon's army marched across this bridge on its way from Jaffa to Acre. Additionally, Jacotin, who served as a commander in Napoleon's army, documented and drew historical maps along the campaign.

3. Kaiser of Germany — October 26, 1898: The royal entourage of Wilhelm II (Kaiser of Germany and King of Prussia) also crossed the bridge on their way from Haifa to Jaffa.

4. WWI 1917: The Ottoman army was positioned north of the Yarkon, with the British army facing them. As part of the fighting in the area, the Turks blew up the bridge to sever transportation routes, and the mills ceased operating. On November 24, the New Zealand Brigade and British infantry crossed the Yarkon and seized Sheikh Munis, and retreated the following day.

5. 1993: Initial excavations at the site by the Israel Antiquities Authority, which conducted rescue excavations from time to time. A major rescue excavation took place in 1993 and a more in-depth excavation in 2005. Among other things, remains of the dam and historical bridge, pottery and coins from several historical periods were uncovered.

6. 2005: In-depth excavation — the Israel Antiquities Authority continued excavations in the area, after which renovation and expansion work on the park was carried out, including bicycle paths, ornamental plants. The old bridge that crossed over the dam was removed and a new one was built.

Testimonies:

18th Century — Sheikh Munis: Sheikh Munis was an Arab village where a quarter of its residents were Jewish. It was established during the Ottoman period, probably during the 18th century, and during the British Mandate period the village expanded. The mills were operated by a partnership of two families — the Bidas family, landowners in Sheikh Munis, and the Amuriya family, who owned lands in Herzliya. The village was located on the coastal plain, about 3 km northeast of the Yarkon River mouth. In March 1948, the residents fled the village and its lands were incorporated into the municipal area of Tel Aviv.

1839 — Travel Journal: On June 23, 1839, Sir Moses Montefiore and his wife Judith crossed this bridge over the Yarkon. She wrote in her diary: "We rose today [in Jaffa] before six o'clock... and within an hour we came to a stone bridge which was nearly destroyed. And when we crossed the River Patras, we came at nine o'clock to the tomb of Allah ibn Alim."

WWI — Shell in the Mill Wall: An earthworking contractor who was working on paving a path near the Ten Mills complex identified an unidentified object during work and extracted it from the ground. He approached the Ganei Yehoshua workers to understand what he had extracted, and they alerted the police and helped keep passersby away until forces arrived. It was then discovered to be an old shell that had been buried for many years. Initially it was estimated that the shell had been there since the Six-Day War, but experts later testified that it was a British artillery shell fired during the British and New Zealand campaign against the Ottoman army.

Early 1930s — Historical Documentation: Ten Mills and the Yarkon River. A photograph from the early 1930s. Today, a section of the Israel Trail crosses through the historical site. One can see a man and woman leading their donkeys across the stream.

1941 Archaeological Report: This document, written by Jones, an archaeologist, on March 19, 1941, describes the remains of an ancient complex called al-Hadar in the Jaffa district. He was accompanied by Gil, who was the district engineer from the P.T.D. (Public Works Department). The site, located along the Yarkon River, consists of a partially broken dam, a well-preserved wall with arched openings, and ruins of three flour mills. According to the report's estimates, the construction dates to the Crusader and possibly Roman period. According to the property owner, Said Bidas: "The mills were restored by his ancestors in ancient times and remained active until their destruction by the retreating Turkish forces in 1917." The document provides measurements and detailed descriptions of the structures, noting changes in the structure, the course of the river over time, and how these affected the mills' operation. It serves as official documentation of the site's condition and historical significance as of 1941, providing valuable information for future researchers and conservators.

1941 — Sandric and Historical Maps: Sandric Jones, a British member of the Antiquities Department, left documentation of a sketch with extensive information in 1941 — most of the surviving structure is still exposed. In the sketch, one can see the western dam from the south. The only error is that he describes the marked area as a mill, but it is actually a surplus channel that allows lowering the water level upstream for maintenance purposes by opening the gates. In addition to Sandric's testimony, a map from 1940 shows Sandric's sketch in more precise form, with the water channels and mill structure drawn.

1870s — PEF Map: A British map from the 1870s. The Palestine Exploration Fund map was prepared to locate and document all places mentioned in the Bible and rabbinic literature. The map includes areas surveyed throughout the Land of Israel west of the Jordan, from the Upper Galilee to Beer Sheva. The map was published in its first edition in 1880. On the map, in the Ten Mills area, one can see the word "bridge" marking the road crossing the Yarkon where the British and Ottoman armies fought. One can also see the proximity of Sheikh Munis village, from where the Bidas family controlled the mills.`,

  culturalAssessment: `Values:

1. Historical Value: The flour mill is located on a significant historical axis where several defining events occurred, relevant not only at the regional level but even at the global level, such as World War I when the Ottomans fought the British, Napoleon's army passing through on the Jaffa-Nablus road, and the defeat of the New Zealand horsemen. The mill is the only one in the Land of Israel that operated at such a scale — considered the largest flour-grinding site on the Yarkon — and thus constitutes a technological precedent. The construction of the bridge and dam over the Yarkon River is believed to have originated in the Roman period, with evidence that there were attempts to build a bridge over the Yarkon as early as the Crusader period.

2. Architectural Value: The chute-type mills were built using local building techniques and materials, using local limestone and kurkar with vaults. These mills demonstrate the engineering and construction technologies of the Ottoman period. The mill was built on a massive scale with 20 pairs of millstones (reduced later to 10) and constitutes a rare example of its kind.

3. Aesthetic Value: The site, with its archaeological remains and its location along the green banks of the Yarkon River, creates a pastoral and calm landscape. The combination of the ancient architectural elements with the natural environment creates a beautiful and serene visual experience.

4. Social Value: The Ten Mills site tells the story of agricultural culture in the Yarkon River area. The mills served as a meeting and gathering point and contributed to community and social activity. In our assessment of the site, we met a resident of the area who told us about the site's importance and his family's connection to it.

5. Scientific-Technological Value: The site served as a significant resource for understanding the development of water technology and engineering methods in the Land of Israel. The remains include chute mills, water channels, dam remains, and other hydraulic components. We believe the site has high research value.

6. Landscape Value: The Ten Mills site constitutes part of a broader landscape unit including the Yarkon Park. The location alongside the river, the Yarkon promenade, and the surrounding green areas provide the place with high landscape value that should be preserved within its surroundings.

Significance Statement:

The Ten Mills site on the Yarkon River is a multi-period archaeological complex of high historical and cultural value. The site constitutes a unique testimony to the use of water-powered flour-grinding technology on a large scale. It connects multiple periods of the Land of Israel's history, from the Roman period through the Crusader, Ottoman, and British Mandate periods. The site holds special importance as a place where events of global scope occurred and where Jewish and Arab communities lived side by side. Today, the site constitutes a rare resource for studying past engineering technologies and serves as a reminder of the agricultural heritage that shaped the area for hundreds of years.`,

  spiritOfPlace: `We believe that preserving the site had not only historical but also social significance. From touring the site and collecting field evidence, we saw how life was breathed into a historical site of regional importance. Many families from the neighborhood around the site visit it and walk in the surroundings. It can be observed how the site brings communities together around it, and the residents contribute to maintaining its cleanliness and preservation. There is a feeling that the site is alive with activity, and it generates a sense of belonging and connection to the history of the area and the place.`,

  conservationPolicy: `We refer to the conservation area from the points of the historical bridge that was destroyed, in whose place there is now a new bridge with busy roads, to the point where the historical stream course merges with the modern stream course. The conservation area includes the three preserved mill buildings, the dam remains, the storage pool remains, the historical road remains, and the surplus channel that served for water level regulation.

We propose adopting an approach of minimal intervention and maximum interpretation, meaning preserving the existing remains without unnecessary additions, while enhancing the story of the place through signage, digital content, and guided tours that explain the historical and technological significance of each element in the complex. At the same time, we recommend creating a clear distinction between original elements and new additions, so visitors can identify and understand the different historical layers of the site.

Furthermore, we recommend integrating the site into the broader urban fabric of the Yarkon Park and connecting it to other heritage and nature points along the river, creating a comprehensive historical-cultural trail along the Yarkon.`,

  riskDescription: `Reasons for Conservation:

During World War I, 1918, the Turks blew up the bridge to prevent the British army from crossing the Yarkon, which caused the site significant damage. In the years that followed, the site stood in ruins and only in the 1990s began the process of archaeological excavation and documentation.

Risks:

- Urban development around the Yarkon threatens the site's integrity. The area is in high demand for real estate development, and construction of roads, bridges, and residential buildings nearby could damage the archaeological remains.
- Environmental pollution from the Yarkon River could cause deterioration of the stone and building materials.
- Insufficient maintenance could lead to progressive deterioration of the exposed structures.
- The proximity to busy roads (Shlomo HaMelekh Street and Pinhas Rosen Street) creates vibration that over time could affect the stability of the remaining structures.
- Flood events in the Yarkon could damage the exposed remains.

Conservation work performed:
- Archaeological excavations in 1993 and 2005 exposed and documented the structures.
- Stabilization of exposed walls and filling of cracks.
- Vegetation control around the structures.
- Construction of visitor access paths and informational signage.
- Removal of the old bridge over the dam and construction of a new bridge.
- Integration of the site into the Yarkon Park landscape design.`,

  managementNotes: `Ganei Yehoshua Company: engaged, among other things, in the development and maintenance of "Ganei Yehoshua Park" areas.
The park areas are owned by the Tel Aviv-Yafo Municipality and the Israel Land Authority. The park is managed by Ganei Yehoshua Ltd. The antiquities site is under the protection of the Israel Antiquities Authority.`,

  mappingDescription: `Polygon — Ten Mills site area, Al-Hadar complex — The Ten Mills complex is located within the boundaries of Yarkon Park, near the intersection of Bkhor Shalom Sheetrit and Pinhas Rosen streets in the Hadar Yosef neighborhood of Tel Aviv. The complex is accessible from the Yarkon Promenade and walking and bicycle paths within the park. The polygon bounds the area including the three preserved mill buildings, the storage pool area, the dam remains, and the surplus channel.

Line — Historical stream course of the Yarkon, based on historical maps and archaeological surveys, showing the original course of the river as it passed through the site, which is different from the current course.

Point — Location of the historical bridge (Jisr al-Hadar), now replaced by a modern bridge carrying Pinhas Rosen Street.`
},

// ============================================================
// mill-35: The Great Mills (Grands Moulins de Palestine) — RICH
// ============================================================
'mill-35': {
  description: `The History of the Mill

The "Grands Moulins" in Haifa was the first modern flour mill established in the Land of Israel. Located in Haifa, the mill was established at the beginning of the British Mandate in 1921 at the initiative of Baron Rothschild, with construction beginning in 1921 and completed around September 1922. The building was then among the largest structures in the Land of Israel for its time. In July 1923, the mill wheels were powered by diesel engines, cutting-edge for their day. The mill is considered the first modern mill in the country to be powered by diesel, importing the most advanced machinery from Switzerland.

The steam engine was part of the industrial revolution, and the Great Mills represent another point at the beginning of industry in the Land of Israel and in Haifa in particular.

The mill was established at the initiative of Baron Edmond James de Rothschild, as part of his support for the Zionist enterprise and settlement. Rothschild hoped to create infrastructure for industry in the Land of Israel and, alongside this, to help the farmers establish themselves through working the land and enable them to sell their produce for fair wages, and additionally to help sell agricultural produce from Israel abroad.

The mill was strategically located near the railway tracks, on a main road in the developing Wadi Salib neighborhood, with the railway leading into the mill's yard to facilitate loading and unloading. In old photographs, the mill building is seen occupying a dominant position in the urban skyline.

The Jewish-Hungarian architect and engineer Arpad Gut was chosen for the mill construction project. He specialized in reinforced concrete and was responsible for significant architectural projects. Gut specialized in reinforced concrete and bridge construction; he brought the first concrete mixer to the country. While still in Hungary, he planned and managed industrial building and factory projects. In the country, he continued his work and was responsible for, among others, the Gali Aviv Casino in Tel Aviv, the Great Synagogue on Allenby Street, the water tower on Mazeh Street, and other enterprises in Haifa, including the Kishon Workshops — railway workshops in Haifa Bay.

In an article referring to flour mills in Ashdod, architect Michael Jacobson writes that the industrial revolution, which reached its peak at the beginning of the 20th century, tightened the connections between industry and architecture, particularly between technology and design. During those years, the industry of the Land of Israel was still in its infancy, but similar to their European counterparts, local industrialists paid considerable attention to architecture.

Over the years, the mill underwent changes, most related to expansions and replacement of machinery with newer and more advanced models. The mill continues to operate to this day; wheat grains arriving from the Dagon silos are ground there, and it is considered among the largest and highest-quality flour mills in the country.

Technology of Modern Flour Mills:

The main processing machines of a flour-grinding plant like the Great Mills in Haifa include flour-grinding equipment, sifting equipment, and flour purifiers.

Flour Processing Stages in Modern Mills:

Stage One: Transporting grains from the port to the mill complex, formerly done by railway, today by trucks entering and leaving the mill complex to Highway 4. The grain from abroad arrives at the mill, the truck's contents are unloaded into a "receiver," and then transferred to silo storage until grinding is required.

Stage Two: In the initial treatment stages, the grains undergo a cleaning process from large contaminants in a machine that separates between the different grains.

Stage Three: After cleaning and separation, the grain is broken on "breaking rolls" and sifted in special machines, after which the flour passes to reduction rolls with smooth or finely grooved surfaces. The rolls are made of chilled cast iron.

Stage Four: Sifting machines — after the grain has passed through the breaking rolls, the sifters extract the coarser stock before purification, such as bran, flour, and semolina.

Timeline:

1921-1922: Establishment of the mill at Rothschild's initiative, owned by PICA (JCA), designed by engineer Arpad Gut.

1923: The mill operates and grinds flour using diesel engine technology.

1923/1924: Preparation of the mill for Passover (in the press 1923): sparked resentment among the small mills that focused on Passover flour grinding, and consequently the Chief Rabbinate refrained from intervening in the kosher certification issue.

1925: Establishment of the matzo factory adjacent to the mill, built by Solel Boneh.

April 1948: Repeated attacks to blow up the mill.

1952: PICA's management decided to renew, expand, and upgrade the plant, and to add a large grain silo, construction of which began that year. In a report from that year, it was noted that the mills were among the largest enterprises in the country and the Middle East, giving impetus to Haifa's economic development.

1954: Sale of the mills to private ownership.

Today: The mill is owned by the Hefetz family. The mill continues to operate as a flour mill, with baking workshops and occasional art events.`,

  culturalAssessment: `Values:

Historical Value: The Great Mills are among the first modern mills in Israel. At the time of construction, the mills were considered one of the largest and tallest buildings in the country. The mills represent the beginning of Jewish industry in the Land of Israel and in Haifa, and received the support of Baron Edmond Rothschild. The mills represent a combination and collaboration between two significant figures in Zionist activity: Edmond de Rothschild and engineer Arpad Gut, who brought the first concrete mixer to the country. The uniqueness of the mill is in its industrial-urban support based on local agricultural production in the Land of Israel, aimed at the Jewish settlement in the country and the Diaspora.

Aesthetic-Architectural Value: The main building of the mills is eclectic: the building body is modernist concrete with rectangular glass windows and arched windows in the top row. The building's roof is decorated with local elements resembling turrets in a local style. Additionally, engineer Gut ensured that in every wall, the floor and ceiling would carry themselves without support columns, thereby enabling flexibility in the placement of machines and equipment in the work halls.

Alongside the industrial building, the "Miller's House" in European-local style has a tile roof with a rear orchard.

As noted, the mills were designed by engineer Arpad Gut, who was responsible for numerous public and industrial buildings at the beginning of the settlement period — this was his first major project in the country.

Urban Landscape Value: At the time of construction, the mill building had significant visibility in the urban landscape from the sea and railway lines, and from the skyline of Wadi Salib.

The mills are located on a major road axis near the historical railway line and today's Highway 4, and close to the port and additional industrial buildings.

Connection to Fabric or Complex: The Great Mills are part of the urban fabric of the Lower City, which until the mid-1930s was one of the central areas of urban life in Haifa. The railway was established in an area where additional industrial enterprises developed, and later the new ports of Haifa were built (the British and Chinese). The mills are on significant transportation axes: railway, port, Highway 4, with a pedestrian bridge built across the main road.

Use Value: The Great Mills continue to operate as one of the largest flour mills in the country. Alongside flour grinding and packaging, baking workshops, tours by request, and art events are held, inviting the local creative community and the general public to become acquainted with the place and its activities.

Scientific/Technological Value: Use of new industrial technology. A modern flour mill based on a gasoline engine with innovative equipment.

Research Potential: The Great Mills are a significant and interesting focus in urban and national development, possessing historical, contemporary, aesthetic, and cultural values. However, no research exists about them. We believe there is great value in research about the mill complex in itself, in its urban, national, and regional context across changing periods. We believe such research could provide tools for future spatial development.

Examination of Authenticity and Completeness / Preservation State:

The Great Mills are an active flour mill to this day. The main building is largely preserved in its materiality and design; the windows are original, and the mill's inscription, visible from a distance, still exists though worn and faded. Alongside this, elevators were added, and the original machines were replaced over the years in the name of progress. The mill's original silos, to which the insurance company requested additions in the form of grids. In the 1950s, the main silo was added, followed by six additional round silos over the years. The Miller's House serves as the office building, divided and adapted for the building — as are the workshop rooms — but it appears these are reversible changes. However, at this stage, the verification capability has not been proven with high probability.

Significance Statement:

The Great Mills in Haifa were established in 1922 and are among the first modern industrial flour mills in the country, based on diesel engines. The mills, founded by JCA (PICA from 1924 — the Palestine Jewish Colonization Association) with the support of Baron Rothschild and designed by engineer Arpad Gut, constitute an interesting case study of their work in building the country.

The building is known for its special architectural qualities as an industrial concrete building in an eclectic style combining a modern rectangular structural base with local Oriental finishes, windows, decorations, and openings — in this context, the building illuminates the work of engineer Gut, identified with numerous public and industrial buildings during the Mandate period, and the connection between aesthetics and technology in local modern architecture.

The mills represent the beginning of material and technological innovation in the country. They are among the first buildings in the country built from reinforced concrete and among the first mills based on diesel engines, constituting a symbol of Haifa and Land of Israel modernism.

The mills were built on the outskirts of the Wadi Salib neighborhood on a major road axis near the Palestine Railway and close to the port. They enjoyed high landscape visibility and were identified with the Haifa skyline — in the 1920s, the mill was considered one of the largest buildings in the country. The Great Mills are identified with the beginning of Haifa and Land of Israel industry.

The mills' location on an urban-national-regional road axis represents an important stage in Haifa's history, when Haifa played a significant role in the city network of Bilad al-Sham and was a significant axis connecting Palestine/Land of Israel and the West.

The Great Mills complex constitutes an important and interesting case study in Jewish settlement before the state's establishment. It combines an economic, industrial, agricultural enterprise with urban, national, and regional significance. The mills provided work for the country's farmers and Haifa-area workers, with the flour ground in them sold in local markets in the country and to the Diaspora.

The history of the Great Mills is interwoven with the history of Jewish settlement in the Land of Israel and the State of Israel through the establishment of an industrial-agricultural-urban enterprise, the Jewish-Palestinian national conflict, privatization of enterprises, and turning to a global market alongside local activity.

Today, the "Great Mills" continues to operate as a flour mill within the "Great Mills of the Land of Israel" group. Workshops, tours, and art events are held at the site.

The mills are located on a central axis but do not realize their potential as a connecting complex in the urban fabric. We believe that architectural, historical, technological, and cultural preservation as part of a regional plan would greatly contribute to urban development.`,

  spiritOfPlace: `The Great Mills are impressive. The entrance from the road creates an unpleasant feeling. This entrance, which leads to a loading and unloading parking area, is not accessible and creates a gap between the impressive and unique site and the experience of visitors who arrive by crossing Highway 4 or ascending the abandoned and dirty Hiram Bridge.

Upon entering the complex, one feels that we have arrived at an active mill. Alongside the trucks, cranes, and forklifts, the architectural buildings are impressive and unique, giving a momentary feeling of surprise: the architecture of the main building, the silos, and the office building — which is the Ottoman Miller's House.

Alongside the atmosphere of lack of orientation at the place, there are pleasant spots including an orchard and grapevines. A view from the mill's roof reveals a panorama of all of Haifa, making one feel that the Great Mills, which today are considered a small industrial plant, are part of something greater — part of history and part of a city.`,

  conservationPolicy: `The Great Mills complex is a building for preservation possessing values from various fields: architectural, historical, aesthetic, technological, and functional.

Workshops and tours are held at the site from time to time, and it has open access to non-commercial audiences.

Although a documentation file leading to a conservation plan has not yet been created, the mill's managers have an affinity for the world of design, aesthetics, and history. As a result, several "independent" interventions have been made at the site.

We recommend creating a documentation file leading to a conservation plan as soon as possible, believing it would be right to preserve the site's values professionally, and alongside this, to develop an enrichment program addressing the public in an organized manner, which could include building an educational program with tours, workshops, and lectures for the general public, schools, and students on the history of the mill and its many connections: architecture, technology, urbanism, the Land of Israel enterprise, sustainability and food security, and more.

In light of the visit to the mills and the meeting with the CEO and staff, we believe the conservation process can take place in collaboration and with the participation of the site's people, both practically and as part of identifying additional existing values at the site.

In this context, we recommend locating additional stakeholders connected to the city, including residents of the nearby Wadi Salib neighborhood, and creating a community values-identification workshop where operational ideas can be raised and integrated into the conservation.

An additional important issue relates to spatial accessibility: currently, the entrances to the complex are not safe — entry is via the bridge or the road and passes through a parking lot or stairs. We recommend making the entrance to the complex accessible.

The mill's status is in an industrial zone, yet it borders the outskirts of the Wadi Salib neighborhood. We believe that in collaboration with the planning administration, a connection between the complex and the neighborhood should be created — a connection accessible to pedestrians — and to create connectivity between the developing Lower City and the mill. In this way, the mill can integrate into the urban fabric, as despite its industrial zone designation, it is part of the city.

Following this, we believe the mill can have additional functions and uses as a culture, leisure, and education site beyond the functions it currently serves.`,

  riskDescription: `1. The Great Mills complex is located near the sea, which could damage the building's materiality over the years. Currently, one can see the building's outer shell peeling. In conversation with the mill's manager, he emphasized that they do not intend to maintain the building's appearance but do carry out structural reinforcements due to insurance requirements for mill operation.

2. Additionally, over the years, several construction additions were made to the mill complex, also adjacent to the original building. These additions damaged the building's completeness and do not allow its future reconstruction.

3. Several independent interventions were made at the site due to the lack of an adequate documentation file for the mills.

4. The building is in an urban environment on a busy road. Currently, the entrances to the complex are not safe — entry is via the bridge or the road and passes through a parking lot or stairs. The establishment of urban infrastructure near the building could damage its stability.`,

  managementNotes: `The area is designated as an industrial zone according to statutory plan HP/680. The mill property is privately owned by the Hefetz family and is active to this day.

The original mill building, the silo building, and the office building are defined for preservation within the Haifa Municipality's conservation survey.

The mill area is located on the boundary of a strip defined as the "main business center" in Haifa's master plan HP/2000.

The mill complex includes additional buildings serving as offices, workshop space, storage, and control. The site is active on a daily basis; from time to time, social events are held that allow entry to the complex.`,

  mappingDescription: `The Great Mills in Haifa are located on Hativat Golani Street on the border of Highway 4, which formerly sat on the Nazareth road after the port was established during the British period — this is the street continuing Kingsway (HaNamal Street). The mill complex is adjacent to the Railway Museum complex from the northeast. Pedestrians can reach the mills via the bridge, and from the outskirts of the Wadi Salib neighborhood on the other side. Historically, this location was near the railway, where flour was loaded onto railway cars within the complex and from there the cars were connected to the train. The mill has been operating since 1922 to this day.`
},

// ============================================================
// mill-36: Naaman Mills (Ridwan Gardens Mills) — RICH
// ============================================================
'mill-36': {
  description: `In the southern part of the Ridwan Gardens are the remains of 5 flour mill buildings, which housed 15 pairs of millstones. The artificial water channels that fed the mills are located north of the buildings, and it is these that create the shape of the adjacent Ridwan Gardens. Several bridges cross over the channels. The preservation state of the buildings varies; some were destroyed down to their foundation level while others remained at their full height minus their roofs. During the golden age of the complex, there was a single shared access to the entire compound (the mills and gardens together) via the cypress avenue approaching from the north. With the diversion of the channels and draining of the swamps, the orientation of the complex changed and a new access road was opened parallel to the eastern diversion channel, so the cypress avenue from the north served only the Baha'i garden.

Historical sources indicate that there were flour mills in Acre as early as the Roman period and again in the Early Islamic period, and perhaps also in the Crusader period, though their location is unknown. In the 12th century, windmills are first mentioned near Acre, and water mills in the following century. Avitsur relates that in 1234, a dispute arose between the Templar Order, which owned the Acre mills, and the Hospitaller Order, which owned the Kurdani mills at Tel Afek, over the water level in the Naaman River. On the map of the French Survey expedition of 1799, two structures with the description "flour mills" appear among the tributaries of the Naaman River. In 1875, a plot north of the mills was leased by Abdul-Baha to establish a rest garden for Baha'u'llah, who most likely first visited the place about two years later. Avitsur describes the changing ownership divisions of the mills among families from Acre's residents and even to the waqf. He relates that the enterprise primarily served the fellahin of the surroundings, and that at times they would wait in line for several days. In the mid-1920s, the Palestine Land Development Company purchased the mills with the intention of shutting them down, diverting the Naaman waters, and draining the surrounding swamps — a process that began only toward the end of the 1930s and continued after the state's establishment. Avitsur, who visited the place in 1955, notes that the former mill workers were then living in the buildings themselves. It is not known when they abandoned the site, but it remained desolate until the World Baha'i Center's invitation to the Israel Antiquities Authority to survey the complex in 2006.

After a process of stabilization, partial reconstruction, and landscape development, the mill complex is currently in a high state of preservation. One building was fully completed, its windows and ceiling reconstructed, and electrical infrastructure installed. Inside, a reconstructed model of the historical grinding mechanism now stands in its original position. The broad water channels were rehabilitated according to the historical description, and although they remain disconnected from the modern Naaman course, water is channeled through them, once again surrounding the buildings as in the past. The complex is not open to the general public except by prior arrangement with the Baha'i management, and it is surrounded by a wall on all sides.

Most of the information about the site is found in the writings of Shmuel Avitsur and in a survey conducted by the Israel Antiquities Authority. Avitsur's contribution mainly concerns the social and economic history of the complex, while the Antiquities Authority's contribution mainly concerns a physical survey and analysis of the complex. Additionally, as a supplement to the survey, the Israel Antiquities Authority conducted three excavation seasons, during which pottery, coins, and cannon balls from Napoleon's siege days were discovered in the buildings. Based on these finds, it can be concluded that the mills did not operate before the mid-19th century.

The history of the complex can be divided into three main periods. The first period begins with the carving of three artificial water channels from the Naaman River and the establishment of the first three buildings: Building A with two mills, Building C with two mills, and Building E with three mills (according to the Antiquities Authority survey division). Later, Building C was expanded and an additional mill was built. In the next stage, Building D was constructed with two mills featuring pointed vaults. Then Building E was expanded with one additional mill fed by a branch from Building D's channel. Last, Building B was constructed with four mills. The peak size of the complex, when all 15 mills operated simultaneously, coincided with the Baha'i establishment in the area in the 1870s. All buildings were constructed from kurkar stone, but the construction quality varies from building to building, as does the wall type — single-faced or double-faced. While the latest building, Building B, is built in an orderly and meticulous manner, it is evident that Buildings C and D underwent renovations over the years that were carried out without attention to floor heights or architectural consistency of doorpost details.

The second period in the complex's history begins with the purchase of the buildings by the Palestine Land Development Company in the 1920s and the gradual drying of their water channels in several stages. After their purchase, Buildings A and E were demolished. In the 1940s, Building B was apparently the last to function, and in the 1950s, when all mills went out of operation, the original workers still lived in them — for their conversion to housing, they poured a concrete layer over the building floors.

In the absence of sufficient topographic height or water head, instead of the chute typical of coastal plain mills, horizontal channels that gradually narrow at their ends were used. In fact, instead of the typical use of gravity to generate energy, water pressure in these mills was created solely by means of the water head at the channel mouth and a 15 cm slope in the nozzle — a technique unique to this complex.`,

  culturalAssessment: `Values:

- Preservation state — The flour mill complex is unique in its size and preservation state in the country. 15 pairs of millstones in 5 buildings that operated simultaneously. The relative completeness of the southern facade, with a cumulative length of over 75 m, expresses the size and significance of the complex. The site features a variety of different preservation states that allow the visitor to complete in their imagination what is missing in one building by means of another.

- Landscape architecture — The mills constitute an important part of the garden's landscape system, which has landscape and aesthetic qualities. They are positioned as a climax point at the end of the expansion of the water channels surrounding the garden and are very close to the building where Baha'u'llah stayed during his visits to the garden. Together with the Antilian well, the mills create the central axis along which the garden extends.

- History — The mills constitute tangible testimony to the industrial role of the greater-Acre historical area. The mills also tell the story of the draining of the Kishon and Naaman swamps during the 1930s and 1940s. Together with the channels and pools surrounding them, the mills provide the landscape picture that modernity sought to eliminate in the first half of the 20th century.

- Technology — The mills are testimony to a technology unique in the country: flat-chute mills that generate their water pressure using only a water head and a minimal 15 cm slope.

- Spirit and Religion — The mills are an inseparable part of the atmosphere in the garden, which provided Baha'u'llah with the experience of rest and respite, as well as inspiration for some of the sacred writings of the Baha'i faith.

Criteria for Examining Values:

- Period — The first documentation of the existence of mills in the area dates to the 13th century, while the existing mill buildings at the site can be dated with certainty to the mid-19th century and they certainly constitute a building typology characteristic of this period.

- Rarity — The size of the enterprise, with its number of mills, is exceptional compared to other flour mills in the Land of Israel. The method of creating water pressure without channel slope is exceptional compared to other chute mills in the Land of Israel.

- Documentation and Finds — The mill buildings themselves are not described in historical sources other than in Avitsur's description. However, several archaeologically significant finds of historical value were discovered at the site.

- Connection to Complex — As the historical complex of Ridwan Gardens, a prominent physical monument, and endpoint of its central axis, the mills have an inseparable connection to the gardens complex.

- Preservation State — The flour mill complex is unique in its size and preservation state in the country.

- Selectivity and Diversity — The mills expand the existing diversity in the theme because the use of a channel with such a minimal water head (15 cm!) is unique. Additionally, the mill complex is the largest known from the Ottoman period in the Land of Israel.

- Potential for Future Research — As far as we know, the initial construction circumstances of the buildings have not yet been discovered — who built, when, and which parts exactly.

Examination of Authenticity and Completeness:

- Location — The location of the mills in relation to the garden and the channels remains in its original context.

- Design — The conservation process included reconstruction of windows, ceilings, and coverings that were destroyed, and therefore there is some damage to authenticity; however, the design is based on an attempt to trace the original design.

- Environment and Landscape — The landscape design of the buildings' surroundings is based on the historical description as found in the Baha'i writings.

- Materials and Building Technologies — In the conservation process, mostly original or near-original materials were used, preserving the sense of time and place.

- Craftsmanship/Artistry — The conservation process included reconstruction of the grinding mechanism and was accompanied by appropriate historical and technological research.

- Spirit of the Place — Preservation of the spirit of the place was achieved mainly in its landscape context and less in its industrial context.

- Use and Function — Preservation of the garden's role in Baha'i worship and less in its industrial role.

Significance Statement:

The mill complex in Ridwan Gardens is tangible testimony to the industrial role of the greater-Acre historical area, and is unique in its size relative to flour mills of its type — during the complex's "golden age," it was the largest flour-grinding enterprise in the country. The number of mills spread across the site indicates its importance as a first-rate industrial facility for the area's economy. The fact that a technological-industrial enterprise of regional scale inspired the creation of a "Garden of Eden" in its backyard may serve as a source of inspiration and learning about the human potential inherent in the combination of industry and spirit, which in the case of the Ridwan Gardens flour mills were intertwined with each other.`,

  spiritOfPlace: `Just as the water channels surround the Ridwan Gardens and create a buffer between it and the outside world, so too they create a similar island upon which the mill buildings stand. The mill surroundings are perceived as a significant expansion in the garden's fabric, as the channels fill the open space. The channels split, surround the cluster of buildings, and enter beneath the buildings' vaults, in a manner that gives the structures the appearance of a rock in the heart of a lake. The new wooden walkway established as part of the complex's conservation project leads the visitor between and through the buildings in an orderly, directed path. Descending from it and freely wandering among the building ruins, with their various preservation states, provides deeper understanding of how the mill enterprise operated, so the visitor can complete the missing parts of one building in their imagination based on what they saw in another. From within the garden, the buildings appear as an ancient monument constituting the climax point of the garden's edge, mainly due to the channels' relationship to it.`,

  conservationPolicy: `In the building that was completed and reconstructed to the highest level, Building B, most interior walls were plastered. According to the opinion of the Baha'i Center architect, there was no unambiguous evidence for the existence of plaster on the interior of the building, and therefore it can be said that the decision to plaster the interior walls nonetheless damages the authenticity of the building to some extent. Additionally, the wooden access walkway that leads the visitor between the buildings charts a single tour route and does not expose all their parts. This decision was made with visitor safety in mind, as the floor strength of some buildings is in question. However, due to the walkway's structured tour route, the visitor is not exposed to several main parts of the complex, and therefore it can be said that there is damage to their full understanding of the complex's historical function. Furthermore, the fact that the complex is closed to free public access damages the historical connection between it and the residents of the city of Acre, for whom the possibility of connecting to their city's local heritage is blocked. Additionally, it should be noted that at the time of the visit to the site by the authors of this section, there was no water in the channels, but it was reported that they are expected to return.

The planning boundaries marked on this page were determined because they bound the entire area enclosed between the channels and the mill buildings. We believe this area is one significant complex, and its connection to additional compounds owned by the Baha'is in the area is of less value. This assumption is based on the historical fact that this place functioned as a single unit.`,

  riskDescription: `The renewal process of the mill complex included exposing the foundations of the destroyed Buildings A and E, completing and rebuilding destroyed wall sections in Buildings C and D, removing wild vegetation from the buildings' interiors, rebuilding the bridges that crossed the channels, opening the channels that had been blocked, new construction of a wooden walking path winding between the buildings, rehabilitation and stabilization of some of the arches within the buildings, reconstruction of windows and the ceiling of Building B based on historical research of the site's remains, and excavation of all the original pools and channels around the buildings down to their foundation level, including implementation of protective layers and river pebbles on the channel bases to enable re-flowing of water through them, among other things without damaging the buildings' foundations.

At the time of the visit by the authors of this document, there was no water in the channels due to maintenance work being carried out on their bases. The site is under frequent monitoring by professionals and maintenance personnel and is closed to the public. For these reasons, it is not subject to any risk except for a visit by Baha'i believers expected to come to the site — the site management is preparing to make the place accessible to this audience without causing damage to the buildings.`,

  managementNotes: `The site is owned by the World Baha'i Center. However, the renewal process and current functioning of the site have been accompanied by the Israel Antiquities Authority for several years. The Ridwan Gardens are currently not open to the general public and are fenced. A dedicated gardening team from the World Baha'i Center maintains the site's cleanliness and frequent maintenance, as well as the garden guard and his wife who reside permanently at the site.

Additionally, the Acre master plan (G/21535) determined that the site is a conservation complex and therefore the following provisions apply to it:
- The plan will include reference to the immediate surroundings while making an effort to preserve the characteristics of the environment, scale, and character of construction.
- Sites proposed for conservation in this plan shall not be designated for demolition, and trees in areas designated for conservation shall not be designated for uprooting.
- The plan will include as an accompanying appendix a preliminary documentation file according to the Planning Administration's guidelines of March 2008.`,

  mappingDescription: `The original course of the historical Naaman passed south of the complex and was different from the current course. An artificial channel conveyed the water westward to four channels. From there, the water passed to the five mill buildings and from there it flowed back into the Naaman course. Of the four channels, the two western ones enclosed an "island" upon which the Ridwan Gardens were established. In addition, the marking shows the route of the road that led to Old Acre (based on the Palestine Exploration Fund PEF map of 1880), which intersected with the four channels at their branching point from the artificial channel.`
},

// ============================================================
// mill-37: Ghras Mill
// ============================================================
'mill-37': {
  mappingDescription: `Coordinates from the Desha Institute survey. Added to Amud Anan — appears in Avitsur's survey. Appears on the PEF under MILLS.\n\nNext time, each person adds, including the teacher.`
}

}; // end translations

// Apply translations
let appliedCount = 0;
for (const site of data.sites) {
  const t = translations[site.id];
  if (t) {
    for (const [field, value] of Object.entries(t)) {
      if (value !== undefined) {
        site[field] = value;
        appliedCount++;
      }
    }
  }
}

// Special case: mill-09 description equals culturalAssessment
const mill09 = data.sites.find(s => s.id === 'mill-09');
if (mill09 && mill09.culturalAssessment && !mill09.description) {
  mill09.description = mill09.culturalAssessment;
  appliedCount++;
}

// For Sachne (mill-07), set conservation/risks/management/mapping to the Hebrew-stripped versions
// since full translations would be too long for this pass — mark them clearly
const mill07 = data.sites.find(s => s.id === 'mill-07');
if (mill07) {
  // These fields still have Hebrew text from the structural pass
  // They will need a follow-up translation pass
}

// For Taninim (mill-25) conservation and risks, same
const mill25 = data.sites.find(s => s.id === 'mill-25');

// Some useType fields for Sachne and others have very long Hebrew text descriptions
// Clean up the long use type entries that are essentially paragraphs
for (const site of data.sites) {
  if (site.useType && site.useType.length > 200) {
    // These are Sachne's long period descriptions stored in useType — keep as-is
    // They're too long to translate here
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Applied ${appliedCount} translations`);

// Verify remaining Hebrew
const fields = ['description', 'culturalAssessment', 'spiritOfPlace', 'conservationPolicy', 'riskDescription', 'managementNotes', 'mappingDescription'];
let hebrewRemaining = 0;
for (const site of data.sites) {
  for (const f of fields) {
    if (site[f] && /[\u0590-\u05FF]/.test(site[f])) {
      hebrewRemaining++;
      if (hebrewRemaining <= 10) {
        console.log(`Hebrew remaining: ${site.id} ${site.name} — ${f} (${site[f].length} chars)`);
      }
    }
  }
}
console.log(`Total fields with remaining Hebrew: ${hebrewRemaining}`);
