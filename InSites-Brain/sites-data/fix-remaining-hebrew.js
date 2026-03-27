const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./mills-2021-en.json', 'utf8'));

// ============================================================
// 1. Fix missing name translations
// ============================================================
const nameFixMap = {
  'mill-13': "Tahuna of Malek Said Suleiman",
  'mill-14': "Tahuna of Kwaniya",
  'mill-15': "Tahuna of Umm al-Qantir",
  'mill-18': "Tahuna of Muhammad Mu'id",
  'mill-19': "Tahuna of Arabi",
  'mill-25': "Taninim Stream Dam Mills",
  'mill-30': "Tahuna of Othmani",
  'mill-37': "Tahuna of Ghras"
};

data.sites.forEach(site => {
  if (nameFixMap[site.id]) {
    site.name = nameFixMap[site.id];
    site.assetName = nameFixMap[site.id];
  }
});

// ============================================================
// 2. Translate the 6 null fields (Sachne + Taninim)
// ============================================================

// --- mill-07 (Sachne) conservationPolicy ---
const sachne = data.sites.find(s => s.id === 'mill-07');

sachne.conservationPolicy = `The conservation recommendations and policy for the Sachne flour mill focus on precise restoration of the structure and technological systems, alongside routine maintenance of the site and preservation of its natural environment. It is recommended to integrate experiential guided tours for visitors and to ensure full accessibility for all populations, while maintaining sustainability and preserving the historical and natural heritage of the place.

The considerations for defining boundaries and planning recommendations for conserving the flour mill site at Gan HaShlosha include a wide range of environmental, historical, technological, and community factors:

Historical and Cultural Considerations:
One of the central considerations was the authentic preservation of the structure and the technology it employed. Since the mill is part of the region's historical heritage, it is necessary to preserve the stone structure, the hydraulic grinding technology, and the natural system of water and the dam.

The mill's contribution to community life throughout the periods must also be considered, with emphasis on the Zionist settlement period and "Tower and Stockade," when this area served as a source of inspiration and agricultural determination.

Environmental Considerations:
The site's location within Gan HaShlosha Park and the Nahal Amal Nature Reserve requires maintaining the ecological balance of the place. The boundaries were chosen with the aim of preserving natural ecological systems such as water flow from the Sachne springs, protecting local flora and fauna, and preventing damage to nature resulting from human use.

It must be ensured that structures and conservation efforts do not damage the natural water flow from the stream or the nearby springs.

Technological Considerations:
Within the framework of conservation, there was a necessity to preserve various mechanical parts of the mill, such as the paddle wheels, water channels, and ancient technological systems, while protecting the structure from natural erosion and wear.

Modern technologies were used to reinforce the structure, particularly for protection against earthquakes, with planning boundaries chosen so that the site could maintain its stability over time.

Access and Sustainable Conservation Considerations:
Public access considerations were an important component in determining planning boundaries, particularly regarding accessibility for people with disabilities. This required creating accessible paths and additional structures suitable for mass visitation, without compromising the historical and environmental value of the site.

Additionally, sustainability considerations, such as use of solar energy and water recycling, were a central factor in planning, with the aim of making the site sustainable while preventing waste of resources.

Community and Educational Considerations:
The site is intended to serve not only as a tourist attraction but also as an educational center. This consideration included planning areas for guidance and education activities around historical, cultural, and ecological topics, which influenced the placement of boundaries for the designated conservation area.

These considerations express the desire to combine preservation of the mill's history and technology, protection of the natural ecological system, and making the site accessible to the general public while emphasizing long-term sustainability.

Focused Conservation Recommendations for the Sachne Flour Mill Site:

Precise Architectural and Operational Restoration:
Stone Structure: The original stone structure of the mill must be preserved, maintaining authentic building materials such as local stone and natural plaster.

Water System: The water system that powered the flour mill has been preserved and largely restored. The spring waters that were the driving force of the mill remain vital to the site experience. It is recommended to maintain the system through regular inspections of the water channels, grinding wheels, and dam structure.

Routine Maintenance:
Continuous maintenance of the mill components must be performed, with emphasis on wear of mechanical parts (such as gear wheels) due to water flow. Maintenance will include protecting the structure from natural wear, such as erosion of stones or accumulation of invasive vegetation around the channels.

It must be ensured that all other parts of the site are preserved and clean, and that visitors maintain the area and refrain from damaging local vegetation or the historical structure.

Historical and Technological Preservation:
It is important to preserve the structure in a way that maintains the original use of the mill and presents it to the general public in an interactive manner. The mill should be operated during guided visits, or through technological simulations, to demonstrate how the mechanism worked in practice.

Preservation of the Ecological System:
The site is located within the Nahal Amal Nature Reserve, which must be preserved both in terms of cleanliness and biodiversity conservation. The stream's flow must not be altered nor the nearby springs damaged, in order to preserve the natural conditions that enable the mill's operation.

Recommendations for Operation and Accessibility:

Visitor Guidance:
It is recommended to provide organized guided tours explaining the history of the place, the mill's operation process, and its economic and social significance during the period it was active.

Clear informative signage and explanation stations along the route should be provided to help visitors understand the importance of the mill and the history of the area.

Accessibility for People with Disabilities:
The site must be accessible to people with disabilities, including convenient access to all parts of the site, accessible bridges over water channels, and interactive signage adapted for audiences with special needs.

Sustainable Conservation:
A policy of sustainable conservation should be encouraged by operating the mill and park areas in a way that prevents waste of resources and preserves the natural environment. For example, by using alternative energy systems that can assist in site maintenance. The following are specific recommendations for accessibility and sustainable conservation of the flour mill at Gan HaShlosha, focusing on preventing resource waste and preserving the natural environment:

1. Installation of Solar Systems: Advanced solar systems can be installed on building roofs or in adjacent areas to generate clean energy for site operation, such as outdoor lighting, water pumps, and ventilation systems. This will reduce the use of electricity from polluting sources and create a renewable, environmentally friendly energy source.

2. Water Recycling: To reduce water consumption, it is recommended to integrate a system for recycling stream water used to operate the mill. The system can redirect water after use back into the cycle, filtering and cleaning as needed, thus preventing waste of precious water.

3. Natural Materials and Sustainable Construction: For the preservation of ancient and natural structures, natural materials and ecological construction methods should be used. Use of lime plaster and local stones can contribute both to preserving the original structure and to preventing environmental damage from the use of synthetic materials.

4. Installation of Accessible and Resource-Efficient Paths: Planning accessible paths using natural materials such as wood or stone will reduce environmental impact and increase accessibility for people with disabilities. The use of recycled materials or materials with green certification will contribute to sustainable conservation.

5. Environmental Preservation Education: Educational activities and guided tours for visitors on the importance of environmental and historical preservation should be integrated. Smart use of water, energy, and natural resources can be emphasized as part of the conservation of the mill and park.

6. Drainage and Rainwater Management Systems: Improving drainage systems and infiltrating rainwater into the ground will help preserve natural water reservoirs while reducing the risk of structural damage caused by water accumulation around buildings.

7. Visitor Load Control: To prevent damage from excessive crowds in sensitive areas, visitor load control systems such as queues and rest stations in various areas should be implemented, and the number of visitors permitted to enter certain parts of the site simultaneously should be limited.

This policy will not only assist in long-term conservation of the mill but will also contribute to the visitor experience and preservation of the natural environment around Gan HaShlosha.

Based on what was mentioned above, there are several aspects of the conservation recommendations for the flour mill at Gan HaShlosha that are not currently fully implemented, and it is important to add them to ongoing activities:

1. Installation of Solar Systems: It does not appear that solar systems have yet been installed for site operation. This is an important recommendation, as solar systems can provide clean energy and reduce the use of electricity from polluting sources. This addition will contribute to making the site sustainable and will improve its maintenance.

2. Water Recycling System: The recommendation to integrate a stream water recycling system has not yet been implemented. Installing such a system could reduce water waste, which is an important resource at the site, and would allow reuse for various purposes such as demonstrations or system maintenance.

3. Full Accessibility for People with Disabilities: The issue of site accessibility for people with disabilities still requires further development. It is recommended to add accessible paths and adapt bridges over water channels, along with interactive signage for audiences with special needs, to ensure an accessible visiting experience for all populations.

4. Educational Activities and Environmental Guidance: Although the site serves certain educational activities, there is a need to expand guidance on environmental preservation, sustainable conservation, and local history, while emphasizing smart use of water and energy as important resources.

5. Improving Drainage and Rainwater Management Systems: According to the recommendations, improving drainage systems and infiltrating rainwater could prevent future damage to the structure from water accumulation. This is an area that does not appear to be currently implemented and should be considered for addition to protect the mill.

Overall, the recommended policy is to combine historical preservation with environmental conservation and advanced technologies, while simultaneously ensuring full accessibility and educational experiences for the general public.`;

// --- mill-07 (Sachne) riskDescription ---
sachne.riskDescription = `Physical Condition:

Madafa Hall Structure:
Served as a waiting room for flour mill customers who came to grind their wheat from villages in the region and even from more distant locations such as the Triangle villages during drier seasons.

The wait could last from several hours to several days, during which customers would rest and converse among themselves. Over the years, the structure underwent renovation and conservation work; its state of preservation is quite good, and it is the only structure among the main flour mill complex that visitors can still enter.

Flour Mill Structure:
The structure contained two millstone chambers, indicating that this mill was among the most central in the area, with high water capacity and grinding output. In the grinding chamber of millstone 1, it operated using a system of lifting pools and a slide.

In the grinding chamber of millstone 2, it operated using a water conveyance system through channels from the upper natural pool directly into a shaft. Over the years, the main flour mill structure sank due to the type of muddy soil it was built on and because the area where it is located has a high frequency of ground movement, resulting in damage in the form of fractures within the structure.

Risks and Sensitivities:

1. Water and Moisture Damage: The mill is located near Nahal Amal, causing heightened sensitivity to moisture and structural erosion. Stream water may penetrate the mill's foundations, cause cracks in the stone walls, and damage original infrastructure such as the water channels used to drive the grinding wheels. Moisture also creates problems of plant growth and mold on walls.

2. Material Wear: The historical materials of the structure (such as stone, plaster, wood, and iron) undergo natural wear over the years, primarily due to exposure to harsh environmental conditions such as strong sun, rain, and wind. As a result, damage occurs to the wall structure, arches, and water channels, as well as additional damage to the internal parts of the grinding system.

3. Earthquakes: The Beit She'an Valley is located in a seismically active area, and the risk of earthquakes could damage the ancient mill, whose stone structure is sensitive to significant ground movements.

4. Infrastructure Erosion Due to Tourist Activity: The national park attracts many tourists each year. Heavy traffic around the mill can cause soil erosion, wear on the paths leading to it, and even damage to the structure if proper visitor control is not maintained.

5. Time Damage and Neglect: Over the years, historical structures tend to deteriorate if periodic maintenance work is not performed. Neglect of routine maintenance can lead to cumulative damage.

Conservation Work Performed in Response to the Described Risks:

1. Foundation Conservation and Restoration Work: Conservation and restoration work on the structure's foundations was carried out in the 1990s and continued with additional projects in the early 2000s. The work included rehabilitation of foundations, walls, and ceilings using original materials such as stone and lime plaster, carefully selected to preserve the historical character of the structure. Foundation conservation and restoration work: This rehabilitation was essential due to damage caused by moisture and natural wear processes.

2. Protection Against Water and Moisture Damage: Due to proximity to the stream, there was a need to protect the structure from water damage. In the last decade, between 2010-2020, emphasis was placed on improving drainage channels to prevent water infiltration into the inner mill areas. Additionally, drying systems and moisture accumulation prevention were installed in sensitive corners of the structure, particularly in areas affected by moisture and mold.

3. Earthquake Reinforcement of the Structure: During the late 2000s, as part of a broad project to reinforce historical structures in Israel against earthquakes, reinforcement work was performed at the mill using modern technologies. These reinforcements were designed to ensure the structure's stability during an earthquake while maintaining its original appearance.

4. Visitor Activity Control: In recent years, as part of the effort to preserve the structure from damage due to visitor traffic volumes, marked paths were established and fences were erected around sensitive areas. These projects were carried out during the 2010s and include guided tours for the general public regarding the importance of site preservation.

5. Periodic Maintenance Programs: Beginning in the early 2000s, routine maintenance programs were developed in collaboration with the Israel Nature and Parks Authority. These programs include regular structural inspections, exterior and interior cleaning, and immediate repair of minor damage, to ensure long-term site preservation.

These conservation actions were performed with the aim of ensuring the site's stability and continuity for future generations, while preserving the original character of the mill.`;

// --- mill-07 (Sachne) managementNotes ---
sachne.managementNotes = `Site Management

1. Israel Nature and Parks Authority: The Israel Nature and Parks Authority is responsible for managing the site, including maintenance, conservation, and operating the site for the public. It conducts conservation and maintenance work on historical structures such as the flour mill, manages conservation budgets, and administers pedagogical and educational activities at the site.

2. Preservation of Historical Structures: Conservation work at the site is carried out under the supervision of the Israel Nature and Parks Authority, in collaboration with the Council for Conservation of Heritage Sites in Israel, the Israel Antiquities Authority, and the Museum of Regional Mediterranean Archaeology, bodies that work to preserve and restore historical sites throughout the country. The Council specializes in architectural and mechanical conservation work, ensuring the preservation of the original character of the structures.

3. Conservation and Development Work:
   - Conservation Contractors and Professionals: Conservation is carried out by contractors and professionals who specialize in restoration and conservation of historical structures. These are architects and engineers who specialize in working with ancient stone structures and in restoring water infrastructure.
   - Restoration of Mechanical Systems: Experts in historical mechanics work on restoring the systems that powered the mill. Parts of the water and grinding systems were rebuilt based on historical and research knowledge.

4. Site Operation and Education: The site staff includes guides and operators who specialize in guiding groups and visitors, and who conduct educational activities and historical guided tours about the site. There are also special events and workshops that explain the historical importance of the site and the conservation process.

5. Collaboration with Local Bodies: The site collaborates with local bodies such as the Emek HaMa'ayanot Regional Council, which functions as part of the conservation and tourism development of the area. The Council participates in various aspects of conservation and upgrading of the site and tourist activities.

Conservation and Development Funding

- Funding for conservation of the flour mill comes from several sources:
  - Government budget allocated through the Israel Nature and Parks Authority and the Council for Conservation of Heritage Sites.
  - Revenue from visitor admissions to the site also serves for development and maintenance of the site.
  - Occasionally, collaborations with private entities or donations intended for conservation and development purposes of the site take place.

Management and Conservation Challenges

The site, combining history with nature, requires a delicate balance between heritage preservation and protection of the surrounding ecological system. The Israel Nature and Parks Authority contends with these challenges, such as:
- Natural erosion of structures and stones due to weather conditions and water flow.
- Managing visitor flow while preserving the physical and natural environment.
- Ecological conservation: Preserving the natural water sources of Nahal Amal and coordinating with environmental bodies to maintain water quality and nature.

Overall, the site is under ongoing management and supervision of certified conservation bodies, whose purpose is to ensure that the structures and natural environment are preserved for future generations.`;

// --- mill-07 (Sachne) mappingDescription ---
sachne.mappingDescription = `The mill is located within Gan HaShlosha National Park, in the valley area of the Beit She'an Valley, in the Lower Galilee. Its strategic location on Nahal Amal enabled its operation for many years without the need for external energy sources. The site is adjacent to the Sachne springs at Gan HaShlosha, which is a popular natural water source known for its clear and warm waters. The Springs Valley (Emek HaMa'ayanot) is located between the Gilboa Mountains to the west and the Jordan River to the east.

Establishment of Gan HaShlosha and Architectural Planning

Gan HaShlosha (the Sachne) was established in the 1930s, with architectural planning and design carried out by three key architects: Avraham Yahalomi, Shlomo Bahir, and Leopold Krakauer. They designed the park with the aim of integrating the unique natural features of the area with harmonious landscape architectural design, enabling enjoyment of the water sources while preserving the natural and historical heritage of the place.

The flour mill is located on Nahal Amal (the Sachne), and covers a relatively small area. It is a historical stone structure that was used for grinding flour using the power of water flowing from the stream. The mill at Gan HaShlosha is part of an agricultural-historical system that includes the facilities and surrounding area, such as the dam, water channels, and pools.

Alongside the mill, a dam was built whose function was to stop and regulate the flow of water from Nahal Amal, allowing it to accumulate in order to harness its power for grinding flour. The dam directed the water into water channels that were used to convey water to the mill wheels. These channels were channeled structures built to efficiently utilize the amount of water flowing in the stream.

Channels and Pools: The channels conveyed water to small storage pools, from which the water flowed with sufficient force to drive the grinding wheels installed within the structure. The pools also served additional uses such as irrigation and fulfilling other agricultural needs, which were very important in the agricultural economy of the period.

System Significance: This system not only served the mill but was part of a larger water network that served the residents of the area, including agricultural and industrial needs. Nahal Amal was a central water source for many uses, including additional flour mills in the area.

The Sachne's Place in Israeli Culture

The Sachne, with its warm springs and surrounding green landscape, has over the years become a cultural site of great importance in Israeli consciousness. The place constitutes a symbol of family outings, nature recreation, and encounters between different communities. It is identified with childhood experiences and is considered one of Israel's landscape gems. The place has also been referenced in songs and literature, highlighting its place in popular culture.

The Sachne is also considered a site of Jewish and agricultural heritage, with a direct connection to the Zionist settlement enterprise in the Beit She'an Valley and to the activities of the kibbutzim and moshavim in the area. The place represents the combination of a flourishing natural landscape and the cultural and social heritage of Zionist settlement in the Land of Israel.

Uniqueness of Natural and Historical Data

The Warm Springs: The Sachne is characterized by natural springs with a constant temperature of approximately 28 degrees Celsius year-round, making it one of the special places in the country that allows swimming even during the winter season. These waters flow from deep layers of soil and contain minerals in high concentrations that nourish the stream and pools.

Water Abundance: The clear waters from the warm springs nourish the natural pools and waterfalls at the site, and they constitute a primary attraction for tourists and hikers. The combination of clear water and surrounding greenery creates an extraordinary experience of flourishing natural landscape in the heart of a relatively hot and dry area such as the Beit She'an Valley.

Ancient History: The site, beyond its unique natural resources, includes the aforementioned flour mill, historical agricultural installations from various periods, remnants of ancient settlement, and also finds from the Roman and Byzantine periods. The historical system of flour mills and water channels symbolizes the use of water power throughout the generations, strengthening the historical value of the place.

What is Interesting and Special about the Sachne

Beyond the uniqueness of the water and nature, the Sachne combines a rich and diverse landscape with rich history. The connection between natural abundance and the agricultural and historical heritage of the area makes Gan HaShlosha one of the most fascinating sites in the country. The fact that the park preserves its naturalness over the years, with minimal development and preservation of the open landscape, enables an authentic nature experience for visitors. The Sachne does not only offer green landscape and warm water, but also a deep historical and cultural connection -- from enchanting scenery to important historical conservation projects.`;

// --- mill-25 (Taninim) conservationPolicy ---
const taninim = data.sites.find(s => s.id === 'mill-25');

taninim.conservationPolicy = `Conservation Recommendations:

Critical Evaluation of Conservation Projects or Interventions Already Performed, or Uses of the Site:

- Consensus of All Stakeholders to Proceed with Implementation Stages -- Absolute Majority Approach: The planning process for the dam's rehabilitation transformed from a conflict between different stakeholders into a process of full cooperation. This enabled the implementation of a complex engineering project in a sensitive manner within a nature reserve. The cooperation was created following the archaeological excavation that revealed the unique engineering qualities of the dam. The engineering solutions were chosen jointly, using an approach requiring agreement of all stakeholders to proceed with implementation stages ("absolute majority decides"). Planning team members and the steering committee note almost unanimously the professional and respectful nature of discussions led by the Israel Nature and Parks Authority and the harmony among team members.

- Importance of the Social Dimension -- Integration of the Adjacent Town of Jisr az-Zarqa in the Project: Project management team members emphasized the importance of integrating residents of the adjacent town. They were asked to create a framework of involved residents participating in various activities in the reserve, demonstrating care for the condition and integrity of the site.

- Possibility of Using Ancient Water Installations and Facilities for Current and Future Engineering Needs: The Taninim Stream Dam project is a precedent for a conservation project that reactivated the structure in its original operational manner. The dam is not only an exceptional touring experience for visitors, making use of meticulous restoration and conservation to present historical assets, but also an engineering solution for a drainage problem, based on historical infrastructure existing at the site.

- Integration of Taninim Dam and the Reserve as an Organic Part of the Kabara Valley Landscape and the Stream's Outlet to the Sea: Taninim Dam is a local and regional site that tells the multi-dimensional historical story of the basin's landscape. Currently, the historical story is partially realized at the reserve site. Several stakeholders raised proposals for promoting new projects in the area: for example, creating spatial connections between existing and planned projects in the area, such as the fishing village in Jisr az-Zarqa and a birdwatching park in Ma'agan Michael.

Recommendations for Planning and Conservation Principles:

1. Maintenance:
Integration of neighboring communities in area activities: Finds from the site, currently displayed at the Ma'agan Michael Museum, can be incorporated as part of a comprehensive visitor tour of the complex, or items can be loaned from the display. Additionally, integrating populations from neighboring settlements through student and youth movement involvement in developing and operating heritage tourism and employment projects near the complex. While emphasizing granting special status to populations from neighboring settlements who previously enjoyed free access to the complex, with the aim of providing them a sense of belonging to the "renewed" site.

2. Monitoring:
Monitoring is currently performed at the site: treatment of invasive species, fish monitoring, and water resource management at the site according to different needs in the storage pool, in the pool downstream of the dam, and in the facilities. We recommend continuing these activities, which have great significance for preserving the asset and the site's environment, which is an integral part of the overall experience.

3. Conservation-Rehabilitation:
- Restoration of the original arch in the Ottoman flour mill that was non-authentically restored (round arch instead of pointed).
- The site adjacent to the Taninim Stream complex, "the Aqueduct at Beit Hananya," has not undergone conservation despite the site being worthy of and requiring it. We recommend conducting a conservation process for this asset, with emphasis on "connecting the asset" to the broader Taninim Stream complex (through signage from Highway 2, hiking trails, and shuttles between the two assets -- to create a complete touring experience).
- Planning of an artificial water body north of the existing lifting pool -- in the area enclosed between Nahal Ada and Nahal Taninim.

4. Hazard Removal:
- Elevation, widening, or diversion of Highway 2 to reduce the risk of flooding of the Taninim Stream complex and flour mills.

- Expanding Asset Boundaries: The dam, pool, and flour mills are part of a broader complex of assets that were part of the water conveyance project to ancient Caesarea. The asset's space does not end at Highway 2 to the west, or at the adjacent settlements to the north and south. It is part of a broader complex. The complex of assets can be connected by creating a cycling route passing between these points, telling the story of water conveyance to Caesarea in installments. This route is significant not only for understanding the complete historical story of the site but also for maintaining and raising awareness of the need to conserve all these assets, among which are sites such as the aqueduct at Beit Hananya that have not received basic protection.

Recommendation for Planning Boundaries:
In Nahal Taninim National Park there are finds that constitute part of a broader picture, telling the story of water conveyance to Caesarea during the Byzantine period. This story spans a wide variety of sites in the country, including: the ancient city of Caesarea, Shuni, the aqueduct at Beit Hananya, and more, shedding light on the way of life of residents of ancient Caesarea during the Byzantine period. Due to this fact, we believe that the existing site boundaries (within its fencing), between Highway 2 and the settlements to the north and south, "imprison" the space and create the illusion that it stands alone in the landscape, when it is only part of a larger picture. In order to connect the site to the broader picture, we believe the site should be treated as part of the complete water conveyance axis, and a physical way should be found to manifest these connections and expand the park complex.`;

// --- mill-25 (Taninim) riskDescription ---
taninim.riskDescription = `Environmental Hazard (natural material erosion, decay, etc.):

- Rescue Plaster on the Junction of the Reservoir with the Dam Structure -- Application of a protective layer of hydraulic plaster along the entire submerged section above the original plaster in order to seal the dam against water seepage.

- Rehabilitation of the Original Hydraulic Plaster Layer Below the Water Level in the Dam Structure -- With the excavations around the dam, sections of the original hydraulic plaster were exposed that required rapid treatment to prevent separation from the dam stones. The treatment included stabilizing plaster edges, flushing cavities, and filling them with special material.

- Reconstruction of the Original Paddle Wheels -- With the aim of restoring the mills to operation, since the original paddle wheels were in a state of decay, which required protecting them from daily operation.

- Storage Pool Ecological Monitoring Operations -- Treatment of invasive species, fish monitoring, and water resource management at the site according to different needs in the storage pool, in the pool downstream of the dam, and in the facilities.

- Stabilization of Ottoman Feed Channels: The stones around these channels were subject to extreme erosion, damage, and decay, and needed to be treated to stop the spread of the processes; treatment involved filling cavities and joints with mortar, replacing missing stones, and replastering.

Human-Made Hazard (vandalism):
- Fencing of the complex, controlled entry, rangers.

Environmental Hazard (collapse, wind-caused falls, collapse due to ground movement, flooding from precipitation, etc.):

- Dam Breach -- The aspiration of drainage bodies involved in the planning process to prevent flooding on Highway 2 and in neighboring settlements required a breach in the dam wider than 20 meters, which was considered unreasonable given the historical and archaeological importance of the monument. Several alternatives were examined, and ultimately it was agreed to excavate the southern part of the dam to determine the location of the dam's original outlets, which would provide increased flow. Subsequently, the pit was excavated to its full depth, including the three passages, the distribution basin, and the western outlet. Additionally, restoration of the regulation installation shutters was performed. It should be noted that raising the shutters during flood concerns is the responsibility of the reserve manager.

- The Dam as a Bridge -- The dam has always served as a pedestrian bridge. Parts of the Ottoman-era sidewalk stones have been preserved in it. However, depressions were found in it, and for visitor safety it was decided to replace the missing pavement with permeable surfaces and to lay surfaces along the dam. Therefore, layered packed foundations were installed along the entire length.

- All Exposed Dam Components, Treatment for Stabilization: Replacement of mud and core filling in the connections between building stones in order to seal the wall against water and prevent loss of the original core.

- Stabilization of the Passage from the Distribution Basin to the Channel -- In the southern wall of the distribution basin there is a hewn window through which water was channeled from the basin to the aqueduct. Water flow over the years eroded the rock, leaving a rock stump in which cracks formed that threatened its stability. Due to the importance of the original rock, an external steel support was installed to secure it.`;

// ============================================================
// 3. Translate Sachne useType (long paragraph, not a category)
// ============================================================
sachne.useType = `Ottoman Period (1517-1917): In the 13th century, during the Mamluk period, and subsequently during the Ottoman period, significant development occurred in water-powered grinding technologies. The flour mill may have been built during these periods, as there is considerable evidence of similar structures established in the Land of Israel during that time. Water from Nahal Amal was utilized through channels built around it, and this system enabled flour grinding for local settlements. There is a likelihood that the flour mill was built in the 19th century, during the Ottoman period, and continued to serve the local community for flour grinding until the 20th century.

After the establishment of the state, the flour mill at Gan HaShlosha (the Sachne) ceased to function as an active agricultural facility, and was instead incorporated into conservation efforts as part of the area's historical heritage. Gan HaShlosha developed into a national recreation site, with its warm waters and natural pools continuing to attract many visitors. In the 1950s, the site became a major tourist center, and it was decided to preserve the mill as part of the open museum presenting the agricultural and settlement history of the valley. The uses of the mill gradually shifted to educational and museum purposes, as part of the policy of preserving the Zionist and agricultural heritage in the Beit She'an Valley.

With the transition to British rule in the Land of Israel, significant industrial and agricultural development occurred. The flour mill at the Sachne transitioned from active agricultural use to tourist and educational uses. With the establishment of Kibbutz Nir David in 1936, the connection between Zionist settlement and the utilization of natural water sources for agricultural purposes was strengthened. While the mill gradually fell out of use, it remained part of the local heritage. During the Mandate years, Gan HaShlosha also developed as a recreation area thanks to the warm springs and unique landscape, and the mill was preserved as part of the historical and agricultural site of the area, toward its use for the general public and tourism.

Roman-Byzantine Period (1st to 7th century CE): During this period, the area where the Sachne is located was part of a large agricultural network that existed throughout the Land of Israel. The state of the mill's use during this period is unknown, but although there is no direct evidence that the current mill was established during the Roman-Byzantine period, irrigation systems, agriculture, and flour mills were common during this period, and it is possible that similar agricultural installations operated in this area during that time. Roman archaeological finds were discovered in adjacent areas, hinting at the possibility of an agricultural structure or similar system existing during that period.`;

// ============================================================
// 4. Translate mill-34 (Ten Mills) useType
// ============================================================
const tenMills = data.sites.find(s => s.id === 'mill-34');
if (tenMills && tenMills.useType) {
  tenMills.useType = `Flour mills. German Kaiser -- on October 26, 1898, Napoleon's army -- in 1799, British army -- during World War I. The Yarkon River powered 10 flour mills from the Ottoman period, the last of which ceased operation in the 1930s.`;
}

// ============================================================
// 5. Translate references fields
// ============================================================
const referencesMap = {
  'mill-03': "Recordana Mill documentation file, Crusader flour mill conservation plan, July 2007, Yehudit Schlein and Avishag Furstenberg-Levi. Architectural documentation and conservation recommendations: Dok Mill, Acre Plains, 2015, Nima Koren.",
  'mill-06': "Salaima, F., & Basul, L. (2024). Monks' Mill Presentation -- Nahal Tzipori. InSites Knowledge Lab, Technion -- Israel Institute of Technology.",
  'mill-07': "Cohen, Y. (2011). Settlement in the Beit She'an Valley: Historical and Agricultural Aspects. Center for Technological Education Holon Publications. Nature and Parks Authority (2020). Gan HaShlosha Conservation Plan: Flour Mill and Dam Restoration. Israel Nature and Parks Authority. Segal, D. (2015). Grinding Technologies in the Land of Israel: A Technological-Historical Survey. Ministry of Science, Technology and Space, Israel.",
  'mill-09': "Interim submission presentation, Survey of Water Power Installations in the Land of Israel (1953-1958), Shmuel Avitsur, Vol. A, p. 44, Vol. B, pp. 72,73. Amitsur Rotem, In the Footsteps of the Battan Mill in Nahal Amud; Amir Freundlich & Ya'ara Shaltiel.",
  'mill-16': "TA/3858 -- Rehabilitation of Seven Mills Site, Planning Administration. Avitsur, S. (1963). Installations. In: Yediot, Vol. 27, pp. 157-168. Haifa University, Department of Geography. Keren, S. (2024). Seven Mills -- Grisha. InSites Knowledge Lab, Technion -- Israel Institute of Technology.",
  'mill-25': "Appendix 1: Dam conservation and rebuilding work. Lower dam -- Beit Hananya water aqueduct at the level of Highway 2 -- Conservation plan for the aqueduct and dam at Nahal Taninim -- Rachel Pollack, 2009, documentation volume. Ya'akov Sharvit, Underwater archaeological excavation, preliminary work for conserving the dam -- Nahal Taninim Nature Reserve, Antiquities Authority documentation. Fieldwork -- May 2010 -- Documentation of findings and site mapping. Appelbaum, A. & Margalit, Z. (2024). Taninim Stream Dam Mills. InSites Knowledge Lab, Technion -- Israel Institute of Technology.",
  'mill-34': "Rak Gad, (2020), Ten Mills site on the Yarkon River. Ilan Shahori (1990), HaYarkon Story, Ministry of Defense Publishing. Rak Gad, (2008), Mills on the Yarkon Banks, pp. 57-70 in: Ya'acobi D., Nesher M. (eds.), Afek, Antipatris, Tel Afek, Binar Bashi. Sharon, I. & Kashi, A. (2024). Pruchiya & Ten Mills. InSites Knowledge Lab, Technion -- Israel Institute of Technology.",
  'mill-35': "Norris, Jacob. 2013. Land of Progress: Palestine in the Age of Colonial Development, 1905-1948. Oxford University Press. Gross, Nachum Theodor. 1984. Not by Spirit Alone: Studies in the Economic History of Modern Palestine and Israel (in Hebrew). Jerusalem: Yad Izhak Ben-Zvi. Shim'on, Y. (2024). Grands Moulins de Palestine. InSites Knowledge Lab, Technion -- Israel Institute of Technology.",
  'mill-36': "Interim submission presentation. Avitsur, S. (1963). Survey of Water Power Installations in the Land of Israel, Israel Exploration Society. Freundlich, A. & Shaltiel, Y. (2024). Naaman Mills (Ridwan Gardens Mills). InSites Knowledge Lab, Technion -- Israel Institute of Technology."
};

data.sites.forEach(site => {
  if (referencesMap[site.id]) {
    site.references = referencesMap[site.id];
  }
});

// ============================================================
// 6. Translate associatedPeople fields (transliterate Hebrew names)
// ============================================================
const peopleMap = {
  'mill-03': "Naama Koren, Roni Hauser, Denis Pikalov, Daher al-Omar, Yonatan or Joseph de Villamont",
  'mill-06': "Giambattista da Persecuti, Architect Ruti Liberti-Shalo, Fuad Salaima, Lin Basul",
  'mill-07': "Dr. Dror Segal, Sabil Shams, Yosef Salim, Sharon Hakon",
  'mill-09': "Tatiana Marchenko, Ya'ara Shaltiel, Amir Freundlich, Muriel Eini",
  'mill-11': "Adar Kashi, Inbar Sharon",
  'mill-16': "Sean Keren, Sapir Bar Sela, Burkan, Landscape Architect Yehiel Cohen -- Deputy Director of Planning and Development at the Yarkon Park Authority",
  'mill-25': "Alejandro Appelbaum -- Manager of Nahal Taninim Nature Reserve, Architect Ze'ev Margalit -- Conservation Architect, Yoav Lehrer, Architect Giora Solar, Nurit Lissovsky -- Conservation Architect (Council for Conservation of Heritage Sites), Dr. Yakov Sharvit -- Israel Antiquities Authority Maritime Archaeology Unit, Rachel Pollack",
  'mill-29': "Fuad Salaima, Lin Basul",
  'mill-34': "Sandrine Jones, Inbar Sharon, Adar Kashi, German Kaiser Wilhelm II, Napoleon Bonaparte",
  'mill-35': "Yamit Shim'on, Arpad Gut, Baron Edmond James de Rothschild, PICA (Palestine Jewish Colonisation Association), Nachum Theodor Gross",
  'mill-36': "Amir Freundlich, Ya'ara Shaltiel, Baha'u'llah, Dorin Ya'akov, Yuval Baruch"
};

data.sites.forEach(site => {
  if (peopleMap[site.id]) {
    site.associatedPeople = peopleMap[site.id];
  }
});

// ============================================================
// 7. Translate mill-06 (Monks' Mill) useType
// ============================================================
const monks = data.sites.find(s => s.id === 'mill-06');
if (monks && monks.useType) {
  monks.useType = "Flour mill -- double-shaft mill. The Carmelites leased the mills but did not operate them directly; instead, they employed local millers. The mill at the site was part of an agricultural-industrial complex that included flour grinding for the surrounding villages and trade.";
}

// ============================================================
// 8. Translate linkedPeople for mill-03
// ============================================================
const mill03 = data.sites.find(s => s.id === 'mill-03');
if (mill03 && mill03.linkedPeople) {
  mill03.linkedPeople = "Denis Pikalov, Roni Hauser";
}

// ============================================================
// Write output
// ============================================================
fs.writeFileSync('./mills-2021-en.json', JSON.stringify(data, null, 2), 'utf8');

// ============================================================
// Verify: count remaining Hebrew
// ============================================================
const hebrewRe = /[\u0590-\u05FF]/;
let remaining = [];
data.sites.forEach(site => {
  Object.entries(site).forEach(([key, val]) => {
    if (key === 'originalName' || key === 'originalRegion') return; // intentionally Hebrew
    if (typeof val === 'string' && hebrewRe.test(val)) {
      remaining.push(`${site.id}.${key}: ${val.substring(0, 60)}`);
    }
    if (Array.isArray(val)) {
      val.forEach((v, i) => {
        if (typeof v === 'string' && hebrewRe.test(v)) {
          remaining.push(`${site.id}.${key}[${i}]: ${v.substring(0, 60)}`);
        }
      });
    }
  });
});

console.log(`Fixed names: ${Object.keys(nameFixMap).length}`);
console.log(`Translated 6 null fields (Sachne + Taninim)`);
console.log(`Translated references: ${Object.keys(referencesMap).length}`);
console.log(`Translated people: ${Object.keys(peopleMap).length}`);
console.log(`\nRemaining Hebrew fields (excluding originalName/originalRegion): ${remaining.length}`);
remaining.forEach(r => console.log('  ', r));
