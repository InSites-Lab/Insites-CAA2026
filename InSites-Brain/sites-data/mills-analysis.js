// ============================================================================
// Mills Collection — MA-RC Qualitative Analysis Datasets
// Source: mills-2021-en.json (9 rich entries) + mills-kg-data.json
// Generated: 2026-03-26
// ============================================================================

// ---------------------------------------------------------------------------
// 1. VALUE_EXTRACTION — Heritage Value Matrix (9 sites x 9 values)
//    Ratings: "e" = explicitly stated, "i" = implied, "a" = absent
// ---------------------------------------------------------------------------

const VALUE_EXTRACTION = {
  "dok": {
    siteId: "mill-03",
    name: "Dok Mill (Crusader Mill)",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "i",
      technological: "e",
      economic: "e",
      ecological: "e",
      archaeological: "e",
      spiritual: "a",
      landscape: "e"
    },
    valueSpecs: {
      historical: "Only surviving Crusader-period mill in good condition along Nahal Naaman; witness to Templar-Hospitaller conflict requiring papal intervention, later served as headquarters of Emperor Frederick during the Sixth Crusade",
      aesthetic: "Kurkar stone with barrel and cross vaults blending Crusader, Ottoman, and British architectural layers; panoramic roof view of Acre Valley",
      social: "Visitor center and education hub for kindergartens, schools, and university students; converted central hall hosts exhibitions and film screenings",
      technological: "Chute-mill type with 5 grinding stations fed by 652m dam; water channeled from Mill Lake through canals to individual paddle wheels",
      economic: "Central flour supply hub for entire Acre Valley from Crusader period through Ottoman era; also served as fish distribution center",
      ecological: "Located within Ein Afek Nature Reserve, a Ramsar-designated wetland since 1996; springs drain through channels into Naaman River",
      archaeological: "Comprehensive engineering conservation survey (2015) by Yaakov Shefer; conservation plan by Yonatan Orlin (2023); settlement remains from Canaanite through Roman periods at Tel Afek",
      landscape: "Fortified structure integrated into wetland reserve landscape; Mill Lake, dam, Naaman River springs, and tamarisk-bordered pools form unified cultural landscape"
    }
  },
  "monks": {
    siteId: "mill-06",
    name: "Monks' Mill",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "e",
      technological: "e",
      economic: "e",
      ecological: "i",
      archaeological: "i",
      spiritual: "e",
      landscape: "e"
    },
    valueSpecs: {
      historical: "Over 200 years of documented history; Carmelite monk Persiceto purchased and renovated the mill around 1821 to finance rebuilding the Carmelite monastery on Mount Carmel in Haifa",
      aesthetic: "Four-level terraced structure built of local stone, settling into topography between steep hill and stream; impressive architectural complexity of vaults in various forms; imported iron-framed windows representing unprecedented use of non-local materials",
      social: "Supplied flour to multiple surrounding settlements including Shfar'am, Migdal, Tzipori, and Tivon; reflects communal inter-settlement dynamics and connection between inhabitants, nature, agriculture, and food processing",
      technological: "Double-chimney mill with built aqueduct from Ein Ras al-Ain; water fell through chimneys to drive paddle wheels on two floors; evolving from stream-power to engineered spring-water system across construction stages",
      economic: "Mill income financed the complete renovation of the Carmelite monastery in Haifa; Carmelites leased operation to local millers while retaining ownership",
      ecological: "Rich scenic area along Nahal Tzipori course; diverse vegetation and relatively open, broad natural surroundings",
      archaeological: "Located within two declared antiquities areas; multiple historical maps (Jacotin 1799) and written testimonies in books and newspapers document the site",
      spiritual: "Named after the Carmelite religious order; direct connection to rebuilding the Carmelite monastery; owned by Carmelite Order to this day",
      landscape: "Property settles into existing topography mediating between steep hill and stream; described as having a 'timeless quality, as if it had stood there for ages'; includes bridge, orchard, and stone terraces"
    }
  },
  "sachne": {
    siteId: "mill-07",
    name: "Sachne Flour Mill (Gan HaShlosha)",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "e",
      technological: "e",
      economic: "i",
      ecological: "e",
      archaeological: "i",
      spiritual: "a",
      landscape: "e"
    },
    valueSpecs: {
      historical: "Ottoman-period mill directly connected to Zionist 'Tower and Stockade' settlement enterprise; Kibbutz Nir David (Tel Amal), the first Tower and Stockade settlement (1936), established nearby",
      aesthetic: "Natural pools, lush vegetation, and pastoral Beit She'an Valley landscape; considered one of the most beautiful places in Israel; warm springs at constant 28 degrees Celsius year-round",
      social: "Madafa hall served as communal waiting room where farmers from villages across the region rested and conversed, sometimes for days; symbol of cooperative agricultural culture",
      technological: "Combined chimney and chute hydraulic system; two millstone chambers indicating high capacity; dam, pool, channels, and paddle wheel vaults form integrated water-power system",
      economic: "Served Arab fellahin and communities; primary means of grinding grain for area's agricultural settlements during Ottoman and Mandate periods",
      ecological: "Located within Nahal Amal Nature Reserve; warm springs with mineral-rich waters nourish unique ecological system; seismically active area requiring special conservation attention",
      archaeological: "Roman archaeological finds in adjacent areas hint at possible earlier agricultural installations; settlement evidence from prehistoric through Byzantine periods in the Beit She'an Valley",
      landscape: "Situated between Gilboa Mountains and Jordan River in the Springs Valley; warm springs, natural pools, and waterfalls create extraordinary flourishing landscape in heart of semi-arid region"
    }
  },
  "batan": {
    siteId: "mill-09",
    name: "M9 Battan Mill (The Fulling Mill)",
    values: {
      historical: "e",
      aesthetic: "i",
      social: "e",
      technological: "e",
      economic: "e",
      ecological: "e",
      archaeological: "e",
      spiritual: "i",
      landscape: "e"
    },
    valueSpecs: {
      historical: "Built during Crusader period; converted to fulling mill in 16th century by Sephardic Jewish exiles from Spain who brought wool-processing knowledge; mentioned by Joseph Karo and Hayim Vital in period literature",
      aesthetic: "Ancient stone construction blending naturally and archaically into the landscape among high cliffs, broad plane trees, and green stream vegetation",
      social: "Wool industry provided livelihood for Safed's Sephardic community; fulling mills are mentioned by name 'battan' preserving the Spanish origin; fellahin wheat owners were last users",
      technological: "Most prominent of 18 mills along 2.5 km of stream; converted between fulling (textile processing) and flour grinding; concrete water channels later improved system sealing and efficiency",
      economic: "Wool fabric industry reached peak in 16th century; approximately 6 mills converted to fulling mills with 2-6 hammers each; industry declined due to Ottoman taxation on raw wool imports",
      ecological: "Located within Nahal Amud Nature Reserve among tall plane trees and rich stream vegetation; Israel Trail passes through site",
      archaeological: "Extensive documentation by Emanuel Damati (1980s); architectural survey by Amir Freundlich and Ya'ara Shaltiel; most stable and complete structure among all Nahal Amud mills",
      spiritual: "Hayim Vital mentions the battan in Sha'ar HaGilgulim in connection with grave markers around Safed; Safed was a major center of Jewish mystical learning",
      landscape: "Strategic location at confluence of Nahal Meron and Nahal Amud on eastern Galilee mountain slopes; part of historical-cultural hiking route connecting multiple mills"
    }
  },
  "jarisha": {
    siteId: "mill-16",
    name: "Seven Mills - Jarisha",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "e",
      technological: "e",
      economic: "e",
      ecological: "i",
      archaeological: "e",
      spiritual: "a",
      landscape: "e"
    },
    valueSpecs: {
      historical: "Roman-period bridge and dam foundations; village of Jarisha first mentioned in 13th century; during British Mandate supplied 4,000 tons flour/year feeding 3,000 people",
      aesthetic: "Green spaces combined with Yarkon water flow create quiet and tranquility; river vegetation, grass fields, and pine forests alongside water sounds merge into pastoral scene",
      social: "Mill became leisure center; long grinding queues led to cafes and restaurants; eventually became a social center and key leisure point along the Yarkon",
      technological: "Largest flour-grinding complex on the Yarkon with 11 grinding facilities; water diverted from river to storage pool then channeled through water wheels to rotating grinding stones",
      economic: "Served both Jewish and Arab local residents; flourished during Ottoman and Mandate periods; declined with invention of steam and diesel technologies in 1936",
      ecological: "Part of Rosh Tzipor Forest maintained by KKL-JNF; diverse trails and ecological activities",
      archaeological: "1990s rescue excavations by Israel Antiquities Authority; 2005 in-depth excavation uncovering dam, bridge remains, pottery and coins from multiple periods; Tel Gerisa nearby showing layers of ancient settlement",
      landscape: "Located in western part of Yarkon River within Rosh Tzipor Forest (Ganei Yehoshua/Yarkon Park); pastoral riverbank setting"
    }
  },
  "taninim": {
    siteId: "mill-25",
    name: "Taninim Stream Dam Mills",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "e",
      technological: "e",
      economic: "i",
      ecological: "e",
      archaeological: "e",
      spiritual: "a",
      landscape: "e"
    },
    valueSpecs: {
      historical: "1,600 years of hydraulic history spanning Byzantine, Crusader, and Ottoman periods; part of the water conveyance system to ancient Caesarea, the largest city in the Land of Israel",
      aesthetic: "Pastoral green gem nestled between Carmel foothills and the sea; architectural and visual richness demonstrating multi-layered typological and morphological complexity",
      social: "National park serves as meeting place for neighboring communities Ma'agan Michael and Jisr a-Zarqa; integration of Jisr a-Zarqa residents in conservation activities",
      technological: "Three distinct grinding technologies preserved at single site: Byzantine vertical paddle wheels, Crusader chimney/chute mills, and Ottoman horizontal paddle wheels; Roman dam 194m long, 4m wide at top",
      economic: "Part of water conveyance infrastructure serving Caesarea; mills served local agricultural community through Ottoman and Mandate periods",
      ecological: "470-dunam nature reserve; two streams, dam, soft-shell turtles, pond turtles, stream crabs, swamp cats, egrets, kingfishers; tamarisks, sacred bramble, sugar cane, lotus",
      archaeological: "Deep conservation and excavation process; Byzantine mills carved into dam; Crusader mill built atop Byzantine one; Ottoman pottery shards found; dam's original hydraulic plaster preserved and treated",
      landscape: "Reserve spanning two western kilometers of stream; dam, storage pool, aqueducts to Caesarea, and surrounding ecological system form coherent landscape unit"
    }
  },
  "ten_mills": {
    siteId: "mill-34",
    name: "Ten Mills (Al-Hadar)",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "e",
      technological: "e",
      economic: "e",
      ecological: "i",
      archaeological: "e",
      spiritual: "a",
      landscape: "e"
    },
    valueSpecs: {
      historical: "Located on axis where Napoleon's army passed (1799), Kaiser Wilhelm II crossed (1898), and Ottomans fought British in WWI (1917); Turks blew up the bridge severing transportation routes",
      aesthetic: "Archaeological remains along green Yarkon banks create pastoral, calm landscape; ancient architectural elements combined with natural environment",
      social: "Served both Jewish and Arab residents; mill partnership between Bidas family (Sheikh Munis landowners) and Amuriya family; Montefiore and wife crossed the bridge in 1839",
      technological: "Largest flour-grinding site on the Yarkon; at peak operated 20 pairs of millstones (later reduced to 10); chute-type mill using vaults to channel water through inclined feed channels",
      economic: "Supplied 30-40 kg wheat per pair of millstones; served residents of Sheikh Munis village and surrounding area; constitutes a technological precedent at national scale",
      ecological: "Integrated into Yarkon Park green corridor; site now part of broader park ecological system",
      archaeological: "Jones archaeological report (1941) documenting dam, wall with arched openings, and three mill ruins; PEF map (1870s) and Sandric sketch (1941); excavations 1993 and 2005 uncovering pottery and coins from multiple periods",
      landscape: "Part of broader Yarkon Park landscape unit including promenade and surrounding green areas; historical stream course different from current course"
    }
  },
  "grands_moulins": {
    siteId: "mill-35",
    name: "The Great Mills (Grands Moulins de Palestine)",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "i",
      technological: "e",
      economic: "e",
      ecological: "a",
      archaeological: "a",
      spiritual: "a",
      landscape: "e"
    },
    valueSpecs: {
      historical: "First modern flour mill in the Land of Israel (1921-22); founded by Baron Rothschild as part of Zionist enterprise; represents beginning of Jewish industry in Haifa and the country",
      aesthetic: "Eclectic architectural style: modernist concrete body with rectangular and arched windows, roof decorated with local turret elements; designed by Hungarian architect Arpad Gut who brought the first concrete mixer to the country",
      social: "Currently hosts baking workshops, tours, and art events inviting local creative community; historically provided work for country's farmers and Haifa-area workers",
      technological: "First modern mill powered by diesel engines; cutting-edge Swiss machinery imported; reinforced concrete construction unprecedented at the time; structural design enabling column-free work halls",
      economic: "Flour ground and sold in local markets and to the Diaspora; among the largest enterprises in the country and Middle East by 1952; still operates today under Hefetz family ownership",
      landscape: "Dominant position in urban skyline at time of construction; located on major road axis near historical railway and Highway 4; Miller's House with orchard and grapevines; rooftop panorama of all Haifa"
    }
  },
  "naaman": {
    siteId: "mill-36",
    name: "Naaman Mills (Ridwan Gardens Mills)",
    values: {
      historical: "e",
      aesthetic: "e",
      social: "e",
      technological: "e",
      economic: "e",
      ecological: "i",
      archaeological: "e",
      spiritual: "e",
      landscape: "e"
    },
    valueSpecs: {
      historical: "Mills mentioned in Acre area from 13th century; Templar-Hospitaller water rights dispute in 1234; Palestine Land Development Company purchased in 1920s for swamp-draining project",
      aesthetic: "Five buildings with cumulative southern facade over 75m; various preservation states allow visitors to complete missing parts imaginatively; buildings appear as rock in heart of lake surrounded by channels",
      social: "Fellahin waited in line for days to use the mills; Napoleon-era cannon balls found in excavations; Avitsur found former mill workers living in the buildings in 1955",
      technological: "Unique flat-chute technology generating water pressure using only water head and minimal 15cm slope, without conventional channel gradient; 15 pairs of millstones in 5 buildings",
      economic: "Largest flour-grinding enterprise in the country during its golden age; served fellahin from surrounding areas of Acre",
      ecological: "Channels and water system create buffer zone; rehabilitated channels with water flowing through them once again surrounding the buildings",
      archaeological: "Three excavation seasons by Israel Antiquities Authority; pottery, coins, and Napoleon-era cannon balls discovered; complex dated to mid-19th century based on finds",
      spiritual: "Inseparable from Baha'i Ridwan Gardens; Baha'u'llah first visited around 1877; mills part of atmosphere inspiring sacred Baha'i writings; owned and managed by World Baha'i Center",
      landscape: "Mills positioned as climax point at end of water channel expansion surrounding Ridwan Gardens; together with Antilian well create central axis of garden; channels split and surround building cluster entering beneath vaults"
    }
  }
};


// ---------------------------------------------------------------------------
// 2. THEMES — Cross-cutting Cultural Themes (9 themes)
// ---------------------------------------------------------------------------

const THEMES = [
  {
    id: "water-tech",
    label: "Water Technology & Hydraulics",
    description: "Every mill harnesses water through sophisticated engineering: dams, channels, aqueducts, chutes, chimneys, and paddle wheels spanning centuries of hydraulic innovation",
    sites: ["dok", "monks", "sachne", "batan", "jarisha", "taninim", "ten_mills", "naaman"],
    evidence: {
      "dok": "652m dam creating Mill Lake; water channeled through canals to 5 individual grinding stations in a chute-mill system",
      "monks": "Double-chimney mill with built aqueduct from Ein Ras al-Ain; water fell through chimneys on two floors to drive paddle wheels",
      "sachne": "Combined chimney and chute system; dam, pool, channels, and paddle wheel vaults forming integrated water-power system with two millstone chambers",
      "batan": "Part of 18-mill series along 2.5km fed by springs; concrete channels later replaced stone channels improving sealing",
      "jarisha": "Yarkon water diverted to storage pool then split into channels, each driving one of 11 grinding facilities via water wheels",
      "taninim": "Three distinct technologies at one site: Byzantine vertical wheels, Crusader chute, Ottoman horizontal wheels; 194m Roman dam",
      "ten_mills": "Chute-mill with 20 pairs of millstones at peak; water collected through vaults via inclined 'slide' channels",
      "naaman": "Unique flat-chute technology using only 15cm slope and water head pressure — unlike any other known mill in the country"
    }
  },
  {
    id: "military-strategic",
    label: "Military & Strategic Significance",
    description: "Mills occupying strategic positions on transportation corridors, serving as fortifications, and witnessing military campaigns from Crusades through World War I",
    sites: ["dok", "ten_mills", "grands_moulins"],
    evidence: {
      "dok": "Fortified Crusader structure; served as fortress guarding Acre-Nazareth road; headquarters of Emperor Frederick during Sixth Crusade; British guard post built on roof in 1936",
      "ten_mills": "Bridge where Napoleon's army passed (1799), Kaiser Wilhelm II crossed (1898); Ottomans blew up bridge in WWI (1917) to sever routes; British shell found embedded in mill wall",
      "grands_moulins": "Repeated attacks to blow up the mill in April 1948 during Arab-Israeli conflict; strategic location near railway and port"
    }
  },
  {
    id: "religious-monastic",
    label: "Religious & Monastic Heritage",
    description: "Mills directly connected to religious orders and sacred traditions — Crusader military orders, Carmelite monks, and Baha'i holy gardens",
    sites: ["dok", "monks", "naaman", "batan"],
    evidence: {
      "dok": "Built by Templar Order on Roman-era remains; Hospitaller Recordana mill nearby; papal intervention required to settle water dispute between the two orders",
      "monks": "Carmelite Order purchased and renovated the mill to finance rebuilding their Haifa monastery; still owned by Carmelites today; named 'Monks' Mill' after the order",
      "naaman": "Integral part of Baha'i Ridwan Gardens where Baha'u'llah stayed; mills part of atmosphere inspiring sacred Baha'i writings; owned by World Baha'i Center",
      "batan": "Located near Safed, a center of Jewish mysticism; Hayim Vital mentions the battan in Sha'ar HaGilgulim; Joseph Karo references fulling mills in his responsa"
    }
  },
  {
    id: "agricultural-economy",
    label: "Agricultural Economy & Food Supply",
    description: "Mills as essential infrastructure for grain-based food production, serving villages, cities, and armies across the region",
    sites: ["dok", "monks", "sachne", "batan", "jarisha", "ten_mills", "naaman", "grands_moulins"],
    evidence: {
      "dok": "Flour grinding and supply facility for entire Acre Valley; also served as fish distribution center for the country",
      "monks": "Supplied flour to Shfar'am, Migdal, Tzipori, Tivon and surrounding settlements; operated by local millers leased from Carmelites",
      "sachne": "Served Arab fellahin and communities; primary grain grinding for area's agricultural settlements during Ottoman and Mandate periods",
      "batan": "Originally flour grinding for Safed population; later adapted for wool processing; returned to flour grinding as industry declined",
      "jarisha": "During British Mandate supplied 4,000 tons flour/year feeding 3,000 people; served both Jewish and Arab populations",
      "ten_mills": "Supplied 30-40 kg wheat per pair of millstones; partnership between Bidas and Amuriya families serving Sheikh Munis area",
      "naaman": "15 pairs of millstones in 5 buildings; largest enterprise during golden age; fellahin waited days for their turn",
      "grands_moulins": "First modern industrial mill; flour sold locally and exported to Diaspora; among largest enterprises in country and Middle East by 1952"
    }
  },
  {
    id: "social-gathering",
    label: "Community & Social Gathering",
    description: "Mills functioning as communal hubs where people gathered, waited, traded, and socialized — far beyond their industrial purpose",
    sites: ["jarisha", "sachne", "ten_mills", "naaman", "taninim"],
    evidence: {
      "jarisha": "Long grinding queues led to establishment of cafes and restaurants; mill became a social center and key leisure point along the Yarkon; boat dock established nearby",
      "sachne": "Madafa hall served as communal waiting room where farmers from distant villages rested and conversed, sometimes for several days",
      "ten_mills": "Served both Jewish and Arab communities living side by side; today families from surrounding neighborhoods visit and walk, generating sense of belonging",
      "naaman": "Fellahin from surrounding areas waited in line for several days according to Avitsur; after closure, former workers continued living in the buildings",
      "taninim": "National park serves as meeting place for neighboring communities Ma'agan Michael and Jisr a-Zarqa"
    }
  },
  {
    id: "adaptive-reuse",
    label: "Adaptive Reuse & Transformation",
    description: "Mills continuously repurposed across centuries — from grinding to fortification, from pig pens to event halls, from industrial plants to museums and education centers",
    sites: ["dok", "monks", "sachne", "jarisha", "taninim", "grands_moulins", "naaman"],
    evidence: {
      "dok": "Crusader mill -> Ottoman flour supply -> British guard post -> Israel Nature and Parks Authority visitor center with museum, exhibitions, film screenings, and education center",
      "monks": "Druze-era mill -> Carmelite income source -> abandoned -> animal shelter/pig pen (1950s) -> events hall/restaurant/guest rooms (2000s) -> stream rehabilitation training center (2012+)",
      "sachne": "Ottoman flour mill -> part of Tower and Stockade settlement infrastructure -> historic site within open museum at Gan HaShlosha national park",
      "jarisha": "Ottoman flour mills -> abandoned 1936-1990 -> archaeological excavation and reconstruction -> heritage site with educational center and walking trails",
      "taninim": "Byzantine water regulation -> Crusader mill on top -> Ottoman mill with new technology -> abandoned 1924-1997 -> excavated, conserved, and reopened as active national park with operational mills",
      "grands_moulins": "First modern industrial mill (1922) -> expanded with silos (1952) -> privatized (1954) -> still operating as flour mill today; also hosts baking workshops and art events",
      "naaman": "Ottoman flour mills -> purchased for swamp draining (1920s) -> workers' housing -> desolate ruins -> Baha'i Center stabilization and reconstruction -> heritage tourism site"
    }
  },
  {
    id: "landscape-nature",
    label: "Landscape & Nature Integration",
    description: "Mills embedded in their natural settings — streams, reserves, wetlands, and valleys — where built heritage and ecological systems are inseparable",
    sites: ["dok", "monks", "batan", "sachne", "taninim", "jarisha"],
    evidence: {
      "dok": "Within Ein Afek Nature Reserve, a Ramsar-designated wetland; Mill Lake, springs, tamarisk pools form integrated cultural-natural landscape",
      "monks": "Built of local stone settling into topography between hill and stream; pastoral and green nature, removed from urban development; bridge, orchard, and stone terraces",
      "batan": "Within Nahal Amud Nature Reserve among tall plane trees; high cliffs, broad plane trees, green surroundings create feeling of wild, untouched nature; Israel Trail passes through",
      "sachne": "Within Gan HaShlosha National Park; warm springs at constant 28C; natural pools, waterfalls, lush vegetation in semi-arid Beit She'an Valley",
      "taninim": "470-dunam reserve between Carmel foothills and sea; soft-shell turtles, egrets, kingfishers; tamarisks, lotus, sugar cane alongside historic structures",
      "jarisha": "Within Rosh Tzipor Forest on Yarkon banks; river vegetation, grass fields, pine forests; diverse ecological activities for nature education"
    }
  },
  {
    id: "multi-period",
    label: "Multi-Period Historical Layering",
    description: "Sites accumulating physical evidence from multiple civilizations — Roman foundations, Crusader walls, Ottoman expansions, British additions, Israeli conservation",
    sites: ["dok", "taninim", "ten_mills", "batan", "jarisha", "naaman"],
    evidence: {
      "dok": "Built on Roman-era remains; Crusader diagonal-dressed stone; Ottoman smaller stone expansion adding 2 grinding stations; British guard tower (1936); Israeli conservation (2015-2023)",
      "taninim": "Roman dam foundation; 6 Byzantine mills carved into dam; Crusader mill built atop Byzantine one; Ottoman horizontal-wheel mill; modern conservation (2000-2009) reactivating ancient dam",
      "ten_mills": "Possible Roman/Crusader bridge foundations; Ottoman flour mills with 20 millstones; WWI destruction; 1993 and 2005 excavations; modern park integration",
      "batan": "Crusader-period foundations; 16th-century Sephardic fulling conversion; Ottoman flour grinding adaptation; early 20th-century concrete channel modernization; 1990s/2014 conservation",
      "jarisha": "Roman-period bridge and dam; Crusader agricultural center; Ottoman flour mill; British Mandate peak production; 1936 closure; 1990s+ reconstruction",
      "naaman": "Mills mentioned from 13th century (Crusader-era water disputes); mid-19th century buildings; 1920s swamp-draining purchase; 1950s workers' housing; 2006+ Baha'i conservation"
    }
  },
  {
    id: "zionist-mandate",
    label: "Nation-Building & Colonial-Era Heritage",
    description: "Mills as witnesses and instruments of modern nation-building — Rothschild industrial investment, Tower and Stockade settlement, British infrastructure, and early statehood",
    sites: ["grands_moulins", "sachne", "ten_mills", "jarisha"],
    evidence: {
      "grands_moulins": "Founded by Baron Rothschild through PICA to support Zionist enterprise; designed by Arpad Gut who brought first concrete mixer to country; represents beginning of Jewish industry in Haifa",
      "sachne": "Mill connected to Tower and Stockade enterprise; Kibbutz Nir David (Tel Amal) established nearby in 1936 as first such settlement; mill symbolizes connection between agricultural heritage and Zionist determination",
      "ten_mills": "Partnership between Jewish and Arab families operating mills; Sheikh Munis village residents fled in March 1948; site incorporated into Tel Aviv",
      "jarisha": "Village of Jarisha population grew from 120 (1596) to 190 by state establishment; mills served both Jewish and Arab communities; closure linked to technological modernization"
    }
  }
];


// ---------------------------------------------------------------------------
// 3. ARGUMENTS — Significance Argument Analysis
// ---------------------------------------------------------------------------

const ARGUMENTS = [
  {
    siteId: "dok",
    name: "Dok Mill (Crusader Mill)",
    argumentType: "event-memorial",
    strength: "strong",
    evidenceBasis: "archaeological+textual",
    claimScope: "regional",
    premises: ["uniqueness", "archive", "cultural_landscape", "completeness"],
    weakLink: "Economic claims about trade route significance rely on general historical context rather than site-specific documentation",
    keyClaim: "Only Crusader-period mill surviving in good condition along Nahal Naaman, with documented papal intervention in the Templar-Hospitaller water dispute"
  },
  {
    siteId: "monks",
    name: "Monks' Mill",
    argumentType: "place-as-character",
    strength: "strong",
    evidenceBasis: "documentary",
    claimScope: "regional",
    premises: ["archive", "community", "cultural_landscape"],
    weakLink: "Early history before 1821 is highly speculative with no documented evidence for the first construction stage",
    keyClaim: "A single building's revenue financed the complete reconstruction of the Carmelite monastery in Haifa, linking an industrial structure to religious institutional survival"
  },
  {
    siteId: "sachne",
    name: "Sachne Flour Mill (Gan HaShlosha)",
    argumentType: "living-heritage",
    strength: "moderate",
    evidenceBasis: "tradition+landscape",
    claimScope: "national",
    premises: ["community", "cultural_landscape", "assessment_impact"],
    weakLink: "Connection to Tower and Stockade is contextual rather than direct; no evidence the mill itself served the kibbutz movement; Roman-Byzantine period claims are speculative",
    keyClaim: "The mill embodies the transition from Ottoman agricultural infrastructure to Zionist settlement heritage, situated at one of Israel's most culturally significant natural sites"
  },
  {
    siteId: "batan",
    name: "M9 Battan Mill (The Fulling Mill)",
    argumentType: "event-memorial",
    strength: "strong",
    evidenceBasis: "archaeological+textual",
    claimScope: "national",
    premises: ["uniqueness", "archive", "completeness"],
    weakLink: "The name 'battan' preserves Spanish origin but physical fulling equipment has not been found at M9 itself — only at nearby M14",
    keyClaim: "Tangible evidence of Spanish Jewish exiles' wool industry transplanted to Safed, referenced in major rabbinic sources (Joseph Karo, Hayim Vital) and preserving a Spanish-language industrial term"
  },
  {
    siteId: "jarisha",
    name: "Seven Mills - Jarisha",
    argumentType: "living-heritage",
    strength: "moderate",
    evidenceBasis: "archaeological+textual",
    claimScope: "local",
    premises: ["community", "cultural_landscape", "assessment_impact"],
    weakLink: "Metal conservation work and landscape development create 'feelings of fading' that diminish spirit of place; over-development risks losing authenticity",
    keyClaim: "Largest flour-grinding complex on the Yarkon where industrial function organically evolved into social and leisure hub, establishing the Yarkon as a cultural corridor"
  },
  {
    siteId: "taninim",
    name: "Taninim Stream Dam Mills",
    argumentType: "event-memorial",
    strength: "strong",
    evidenceBasis: "archaeological+textual",
    claimScope: "international",
    premises: ["uniqueness", "archive", "completeness", "cultural_landscape"],
    weakLink: "Ottoman arch reconstruction did not match original form as later photographs revealed, compromising partial authenticity",
    keyClaim: "Only site in the world preserving three distinct grinding technologies (Byzantine vertical, Crusader chute, Ottoman horizontal) on a single reactivated Roman dam, with mills still operational"
  },
  {
    siteId: "ten_mills",
    name: "Ten Mills (Al-Hadar)",
    argumentType: "event-memorial",
    strength: "moderate",
    evidenceBasis: "archaeological+textual",
    claimScope: "regional",
    premises: ["uniqueness", "archive", "cultural_landscape"],
    weakLink: "Physical condition is ruined with partial preservation; only three of original buildings survive; historical bridge replaced by modern road bridge",
    keyClaim: "The only mill complex in the Land of Israel that operated at industrial scale with 20 pairs of millstones, situated on an axis crossed by Napoleon, Kaiser Wilhelm II, and WWI armies"
  },
  {
    siteId: "grands_moulins",
    name: "The Great Mills (Grands Moulins de Palestine)",
    argumentType: "place-as-character",
    strength: "strong",
    evidenceBasis: "documentary",
    claimScope: "national",
    premises: ["uniqueness", "archive", "assessment_impact"],
    weakLink: "No formal documentation file or conservation plan exists despite the building's heritage value; independent interventions made without professional guidance",
    keyClaim: "First modern industrial flour mill in the country, still operating continuously since 1922, representing the intersection of Rothschild philanthropy, Zionist settlement, and Haifa's industrial modernization"
  },
  {
    siteId: "naaman",
    name: "Naaman Mills (Ridwan Gardens Mills)",
    argumentType: "place-as-character",
    strength: "strong",
    evidenceBasis: "archaeological+textual",
    claimScope: "international",
    premises: ["uniqueness", "completeness", "cultural_landscape", "community"],
    weakLink: "Complex is closed to general public access, blocking historical connection between Acre residents and their local heritage",
    keyClaim: "Largest Ottoman-era flour mill complex in the country (15 millstones in 5 buildings) using a flat-chute technology unique to this site, embedded within a Baha'i sacred garden — industry and spirit intertwined"
  }
];


// ---------------------------------------------------------------------------
// 4. MANAGEMENT_CLUSTERS — Management Analytics
// ---------------------------------------------------------------------------

const MANAGEMENT_CLUSTERS = {
  byBody: [
    {
      id: "govt",
      label: "Government-managed (INPA)",
      type: "managing-body",
      color: "#2563eb",
      sites: ["dok", "sachne", "batan", "taninim"],
      description: "Sites under Israel Nature and Parks Authority management, within declared nature reserves or national parks, with daily ranger presence and ongoing maintenance"
    },
    {
      id: "religious",
      label: "Religious Order Heritage",
      type: "managing-body",
      color: "#7c3aed",
      sites: ["monks", "naaman"],
      description: "Sites owned by religious organizations: Monks' Mill by Carmelite Order (leased to Kishon Drainage Authority), Naaman Mills by World Baha'i Center"
    },
    {
      id: "private",
      label: "Private Ownership",
      type: "managing-body",
      color: "#059669",
      sites: ["grands_moulins"],
      description: "Grands Moulins privately owned by Hefetz family, operating as active industrial flour mill since 1954 privatization"
    },
    {
      id: "municipal",
      label: "Municipal/Public Entity",
      type: "managing-body",
      color: "#d97706",
      sites: ["jarisha", "ten_mills"],
      description: "Yarkon sites managed through public bodies: Seven Mills within KKL-JNF Rosh Tzipor Forest; Ten Mills within Ganei Yehoshua Park (Tel Aviv Municipality/Israel Land Authority)"
    }
  ],
  byConservationNeed: [
    {
      id: "active-reuse",
      label: "Active Adaptive Reuse",
      sites: ["dok", "taninim", "grands_moulins", "sachne"],
      description: "Sites transformed into museums, visitor centers, or continuing original function. Dok: visitor center/museum. Taninim: operational national park with working mills. Grands Moulins: still grinding flour. Sachne: part of open museum."
    },
    {
      id: "conservation-complete",
      label: "High-Quality Conservation Achieved",
      sites: ["taninim", "naaman", "dok"],
      description: "Sites where comprehensive conservation, excavation, and stabilization have been completed. Taninim: dam reactivated, mills operational (2000-2009). Naaman: Baha'i Center stabilization and reconstruction. Dok: engineering conservation survey and plan."
    },
    {
      id: "needs-documentation",
      label: "Needs Documentation & Planning",
      sites: ["grands_moulins", "monks"],
      description: "Sites lacking formal conservation plans. Grands Moulins: no documentation file despite recognized heritage value; independent interventions without professional guidance. Monks' Mill: leased for stream rehabilitation but requires comprehensive conservation."
    },
    {
      id: "stabilization-needed",
      label: "Needs Structural Stabilization",
      sites: ["sachne", "ten_mills"],
      description: "Sites with structural vulnerabilities. Sachne: main structure sank due to muddy soil and seismic activity; fractures within structure. Ten Mills: ruined condition, partial preservation, three buildings survive in damaged state."
    }
  ],
  byThreat: [
    {
      id: "bio",
      label: "Biological Threats",
      sites: ["dok", "taninim"],
      description: "Root penetration from vegetation into cracked walls; moisture-related biological growth. Dok: constant capillary moisture risk, root penetration danger. Taninim: invasive species management in storage pool."
    },
    {
      id: "env-water",
      label: "Water & Moisture Damage",
      sites: ["dok", "monks", "sachne", "taninim", "naaman"],
      description: "Proximity to water sources creating humidity, erosion, and structural moisture risks. Monks: high humidity in interior vaults endangering stability. Sachne: stream water penetrating foundations. Taninim: dam plaster erosion."
    },
    {
      id: "env-geo",
      label: "Geological & Seismic",
      sites: ["sachne", "dok"],
      description: "Sachne: located in seismically active Beit She'an Valley; structure sank due to ground movement. Dok: geomorphological threats identified in conservation assessment."
    },
    {
      id: "human-urban",
      label: "Urban Development Pressure",
      sites: ["ten_mills", "jarisha", "grands_moulins"],
      description: "Urban encroachment and infrastructure impacts. Ten Mills: real estate development, road vibration from adjacent streets, flood events. Jarisha: area development concerns. Grands Moulins: unsafe pedestrian access, Highway 4 adjacency, sea-salt deterioration."
    },
    {
      id: "human-neglect",
      label: "Maintenance & Neglect Risk",
      sites: ["ten_mills", "jarisha", "grands_moulins"],
      description: "Risk of progressive deterioration without sustained intervention. Ten Mills: insufficient maintenance leading to exposed structure decay. Jarisha: continuous maintenance requirements. Grands Moulins: building shell peeling, manager has no plans to maintain appearance."
    },
    {
      id: "authenticity",
      label: "Authenticity Compromise",
      sites: ["dok", "taninim", "jarisha", "naaman"],
      description: "Past interventions damaging authenticity. Dok: 1990s stone parapet and metal railings alter original form. Taninim: Ottoman arch incorrectly reconstructed. Jarisha: metal conservation work diminishes spirit of place. Naaman: interior walls plastered without evidence of original plaster."
    }
  ]
};


// ---------------------------------------------------------------------------
// 5. SPIRIT_ANALYSIS — Spirit of Place Synthesis
// ---------------------------------------------------------------------------

const SPIRIT_ANALYSIS = [
  {
    siteId: "dok",
    sensory: ["water sounds from Naaman springs", "stone textures of kurkar walls", "panoramic views from roof across Acre Valley", "pastoral landscape of pools and swamps", "birdsong and tangled vegetation"],
    emotional: ["enchantment", "tranquility", "power", "historical weight"],
    connection: ["nature-human", "past-present", "military-pastoral"],
    excerpt: "The Crusader flour mill reflects the meeting between ancient history and pastoral nature. The Crusader structure, with its stone walls and impressive arches, stands as a symbol of events that took place here hundreds of years ago."
  },
  {
    siteId: "monks",
    sensory: ["local stone settling into topography", "pastoral green nature along stream", "structural diversity of different materials at different stages", "quiet and peaceful environment"],
    emotional: ["timelessness", "stability", "solidity", "naturalness"],
    connection: ["building-landscape", "human-nature", "permanence-change"],
    excerpt: "The property structure stands and overlooks in a stable and solid manner as if it had always been there. This structural diversity gives it a timeless quality, as if it had stood there for ages and is still being used to this day."
  },
  {
    siteId: "sachne",
    sensory: ["warm spring water at 28 degrees", "lush valley vegetation", "open landscape of Springs Valley", "stone walls and grinding wheels"],
    emotional: ["repose", "natural beauty", "historical rootedness", "resilience"],
    connection: ["nature-settlement", "ancient-modern", "water-livelihood"],
    excerpt: "The feeling at the site combines an experience of repose and natural beauty with a sense of historical rootedness. The flour mill is a living testimony to the area's agricultural heritage, where water was not only a natural resource but also a source of livelihood."
  },
  {
    siteId: "batan",
    sensory: ["flowing water sounds", "silence broken only by stream", "high cliffs crowning the stream", "broad plane trees", "scent of earth and ancient stone"],
    emotional: ["calm", "disconnection from modern world", "deep connection to nature", "awe", "appreciation for the past"],
    connection: ["nature-industry", "past-present", "human-water"],
    excerpt: "Upon arrival at the site, the disconnection from the modern world materializes through the silence accompanied by flowing water. The ancient flour mills, built of local stones that blend naturally into the landscape, give a sense of ancient power in which humans worked in cooperation with the environment."
  },
  {
    siteId: "jarisha",
    sensory: ["Yarkon water gurgling", "birdsong", "wind through trees", "scents of earth and plants", "aromas of history between walls", "grass fields and pine forests"],
    emotional: ["quiet", "tranquility", "calm", "fading (from modern interventions)"],
    connection: ["nature-culture", "industrial-leisure", "past-present"],
    excerpt: "The green spaces combined with the water flow create a sense of quiet and tranquility. Although the place radiates tranquility, the metal conservation work and landscape development create feelings of fading that diminish the spirit of the place."
  },
  {
    siteId: "taninim",
    sensory: ["rushing water through reopened dam", "green gem between Carmel and sea", "vegetation and wildlife", "massive 194m stone dam", "yellow water lilies"],
    emotional: ["awe at engineering grandeur", "authentic historical immersion", "pastoral calm"],
    connection: ["technology-nature", "ancient-living", "community-landscape"],
    excerpt: "This space provides a historical and sensory experience in which the visitor experiences history literally, and sees the historic water mills operating in their original purpose, the dam opening, to the sounds of rushing water — this is an authentic experience of walking among the pages of history."
  },
  {
    siteId: "ten_mills",
    sensory: ["Yarkon riverbank greenery", "walking trails through park", "archaeological remains among trees"],
    emotional: ["belonging", "connection to area's history", "community"],
    connection: ["community-heritage", "Jewish-Arab coexistence", "urban-historical"],
    excerpt: "Many families from the neighborhood around the site visit it and walk in the surroundings. It can be observed how the site brings communities together around it, and the residents contribute to maintaining its cleanliness and preservation."
  },
  {
    siteId: "grands_moulins",
    sensory: ["unpleasant road entrance via Highway 4", "active mill atmosphere: trucks, cranes, forklifts", "impressive architectural buildings", "orchard and grapevines", "rooftop panorama of Haifa"],
    emotional: ["surprise at architectural quality", "disorientation", "sense of being part of something greater"],
    connection: ["industry-city", "past-present", "local-global"],
    excerpt: "A view from the mill's roof reveals a panorama of all of Haifa, making one feel that the Great Mills, which today are considered a small industrial plant, are part of something greater — part of history and part of a city."
  },
  {
    siteId: "naaman",
    sensory: ["water channels surrounding buildings like a lake", "wooden walkway between buildings", "varying preservation states", "channels splitting beneath vaults"],
    emotional: ["contemplation", "imaginative completion", "sacred garden atmosphere"],
    connection: ["industry-spirit", "ruin-reconstruction", "water-architecture"],
    excerpt: "The channels split, surround the cluster of buildings, and enter beneath the buildings' vaults, in a manner that gives the structures the appearance of a rock in the heart of a lake. Descending and freely wandering among the building ruins provides deeper understanding of how the mill enterprise operated."
  }
];


// ---------------------------------------------------------------------------
// 6. COLLECTION_SUMMARY — Overall Collection Reading
// ---------------------------------------------------------------------------

const COLLECTION_SUMMARY = {
  narrative: "38 historic flour mills along Israel's major watercourses document a continuous tradition of water-powered grain processing spanning from Byzantine antiquity to the early 20th century. Nine entries with rich cultural assessments reveal a network of industrial heritage sites that served not merely as grinding facilities but as economic engines, social gathering places, military strongholds, and even catalysts for religious and national movements. The collection stretches from the Galilee highlands (Nahal Amud's Sephardic fulling mills) through the Carmel coast (Taninim's Byzantine-to-Ottoman dam complex) to the central Yarkon valley (the largest milling complexes in the country), capturing a geographic and cultural cross-section of the Land of Israel's hydraulic heritage.",

  patterns: [
    "Water technology is the unifying thread — every mill harnesses stream power through dams, channels, chutes, chimneys, or paddle wheels, with each site adapting hydraulic engineering to local topography",
    "Strong multi-period layering in the richest sites: Dok (Crusader-Ottoman-British), Taninim (Byzantine-Crusader-Ottoman), Ten Mills (Roman?-Crusader-Ottoman-Mandate), demonstrating continuous reuse of water infrastructure",
    "Mills functioned as communal spaces far beyond their industrial purpose — Jarisha and Sachne developed into social gathering points; Naaman fellahin waited days; all became leisure destinations",
    "Religious institutions played outsized roles in mill heritage: Crusader military orders, Carmelite monks, and Baha'i sacred gardens all shaped mill development and preservation",
    "Adaptive reuse is near-universal: 7 of 9 rich sites have been transformed into museums, parks, training centers, or heritage tourism destinations, often retaining operational elements",
    "The transition from water-powered to diesel/electric milling marks a clear historical boundary — most traditional mills ceased between 1917-1936, with Grands Moulins (1922) representing the new era"
  ],

  gaps: [
    "29 of 38 entries lack cultural assessment, spirit of place, and conservation policy — the collection is severely uneven in documentation depth",
    "No intangible heritage documentation exists: oral histories, grinding songs, miller traditions, recipes, and seasonal rhythms are entirely absent from the dataset",
    "Economic quantification is sparse — only Jarisha provides production figures (4,000 tons/year); most sites give qualitative economic claims without supporting data",
    "The Nahal Amud cluster (18 mills in 2.5km) has only one rich entry (M9 Battan); the most concentrated mill landscape in the collection remains largely undocumented",
    "Gender is invisible — women's roles in grain processing, household economies, and community life around mills are never mentioned across all 9 assessments",
    "Cross-site comparative analysis is absent: no assessment references other mills in the collection, missing the opportunity to position each site within the broader network"
  ],

  distinctives: [
    "Dok Mill: Only Crusader-era mill surviving in good condition; scene of papal intervention in Templar-Hospitaller dispute; Emperor Frederick's Sixth Crusade headquarters",
    "Monks' Mill: Revenue from a single flour mill financed reconstruction of the Carmelite monastery in Haifa; four-level terraced double-chimney structure still owned by the Order",
    "Sachne Mill: The only mill explicitly connected to the Tower and Stockade settlement narrative; situated at one of Israel's most beloved natural sites with year-round warm springs",
    "Battan Mill: Preserves the Spanish word 'battan' (fulling mill) brought by Sephardic exiles; referenced by major rabbinic authorities (Joseph Karo, Hayim Vital); most stable structure among 18 Nahal Amud mills",
    "Seven Mills (Jarisha): Largest complex on the Yarkon with 11 grinding facilities; uniquely documented as evolving from industrial to leisure function, establishing the Yarkon as recreational corridor",
    "Taninim Dam Mills: Only site in the world preserving three distinct grinding technologies (Byzantine, Crusader, Ottoman) on a single dam, with mills still operational — a living technology museum",
    "Ten Mills (Al-Hadar): Largest-scale milling operation in the country (20 millstone pairs at peak); bridge crossed by Napoleon, Kaiser Wilhelm, and WWI armies; embedded WWI shell found in wall",
    "Grands Moulins: First modern industrial mill in the Land of Israel (1922), still operating after 100+ years; founded by Baron Rothschild; designed by architect who brought first concrete mixer to the country",
    "Naaman Mills: Largest Ottoman-era complex in the country (15 millstones, 5 buildings); unique flat-chute technology with only 15cm slope; embedded within Baha'i sacred Ridwan Gardens"
  ]
};
