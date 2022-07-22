console.clear(); // for debugging, remove @later

const headmateAttributes = {
1: { nickname: "Moth", pk_id: "cbkpk", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/990774676903059637/moth_cropped.png"},
2: { nickname: "Clover", pk_id: "wzgzt", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994839470119587941/clover_cropped.png"},
3: { nickname: "Val", pk_id: "swbxu", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995558609889001542/404676_pY37ByAS.png"},
4: { nickname: "Kent", pk_id: "praje", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995558994238263377/kent_cropped.png"},
5: { nickname: "Faun", pk_id: "nmklp", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994460956795080735/faun_cropped.png"},
6: { nickname: "Ruth", pk_id: "uznhu", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/983894148002250812/six_new.png"},
7: { nickname: "Lucky", pk_id: "qkxux", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994840570746896476/lucky_cropped.png"},
8: { nickname: "Giles", pk_id: "yabia", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994634921480048721/giles.png"},
9: { nickname: "Thorn", pk_id: "dvyjx", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995961210765856880/thorn_cropped.png"},
12: { nickname: "Parsley", pk_id: "grenm", profile_image: "https://picrew.me/shareImg/org/202206/287392_PY2z1I7T.png"},
13: { nickname: "Hope", pk_id: "uidnq", profile_image: "https://picrew.me/shareImg/org/202206/1433548_4mfndKOt.png"},
14: { nickname: "Temperance", pk_id: "dcelj", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/990780735696814090/temperance_cropped.png"},
15: { nickname: "Wander", pk_id: "pemyi", profile_image: "https://picrew.me/shareImg/org/202206/125605_mVMwVORa.png"},
16: { nickname: "Juniper", pk_id: "nnrhi", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995552605587652628/juniper_cropped.png"},
17: { nickname: "Brook", pk_id: "akjcu", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/997387771620638871/brook_cropped.png"},
18: { nickname: "Thyme", pk_id: "vaxli", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995553141191880714/thyme_cropped.png"},
19: { nickname: "Aster", pk_id: "qgwtc", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/990793330453520474/aster_cropped.png"},
23: { nickname: "Magpie", pk_id: "xafyp", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/997346980168732742/magpie_cropped.png"},
24: { nickname: "Fern", pk_id: "dyrwl", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/990798814459887616/fern_new.png"},
25: { nickname: "Moss", pk_id: "dxzha", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/984323983870672956/moss_2.png"},
26: { nickname: "Lavender", pk_id: "lyxzi", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995553676049514547/lavender_cropped.png"},
27: { nickname: "Chicory", pk_id: "dniid", profile_image: "https://picrew.me/shareImg/org/202206/1473879_ECHszZKW.png"},
28: { nickname: "Honesty", pk_id: "lhkvc", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994636246636830800/honesty_cropped.png"},
29: { nickname: "Yarrow", pk_id: "qjpul", profile_image: "https://picrew.me/shareImg/org/202206/1433548_fRttKIwy.png"},
34: { nickname: "Mark", pk_id: "ulfel", profile_image: "https://picrew.me/shareImg/org/202206/194446_IuWyhm8O.png"},
35: { nickname: "Thistle", pk_id: "efkdt", profile_image: "https://picrew.me/shareImg/org/202206/41329_ch7rlTVC.png"},
36: { nickname: "Autumn", pk_id: "trubk", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/987367174077296660/tuesday_cropped.png"},
37: { nickname: "Candor", pk_id: "jsoyw", profile_image: "https://picrew.me/shareImg/org/202206/1627414_OPt8PVz0.png"},
38: { nickname: "Leo", pk_id: "xbwdi", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/984582416708534282/leo_cropped.png"},
39: { nickname: "Void", pk_id: "qdcky", profile_image: "https://picrew.me/shareImg/org/202206/69653_2kskaSIk.png"},
45: { nickname: "Damson", pk_id: "hdfqk", profile_image: "https://picrew.me/shareImg/org/202206/21969_urKf0eSy.png"},
46: { nickname: "Torque", pk_id: "rmjug", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995554068535709798/torque_cropped.png"},
47: { nickname: "June", pk_id: "xcyal", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/992864107902541844/june_cropped.png"},
48: { nickname: "Neil", pk_id: "zaexz", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995554637006516315/neil_cropped.png"},
49: { nickname: "Athame", pk_id: "zajnk", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994637653481897984/athame_cropped.png"},
56: { nickname: "Cress", pk_id: "ziciz", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995555048224469055/cress_cropped.png"},
57: { nickname: "Dill", pk_id: "djvac", profile_image: "https://picrew.me/shareImg/org/202206/61925_68kRmOyx.png"},
58: { nickname: "Sebastian", pk_id: "kxbcp", profile_image: "https://picrew.me/shareImg/org/202206/27146_q4I7D83J.png"},
59: { nickname: "Artifice", pk_id: "tdcdx", profile_image: "https://picrew.me/shareImg/org/202206/125919_2eBhR3bH.png"},
67: { nickname: "Quince", pk_id: "igrbx", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/983906071540289546/quince_new.png"},
68: { nickname: "Violet", pk_id: "upsyd", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/983892487481475112/68_cropped.png"},
69: { nickname: "Audre", pk_id: "ucakj", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994640993666224208/audre.png"},
78: { nickname: "Will", pk_id: "zoppn", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994640622877147196/unknown.png"},
79: { nickname: "Coral", pk_id: "jplcp", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994640307402588253/coral_cropped.png"},
89: { nickname: "Owl", pk_id: "hgmhs", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/987362369950851082/owl.png"},
123: { nickname: "", pk_id: "pfwcx", profile_image: ""},
124: { nickname: "Vesper", pk_id: "xhhzz", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994459617956462733/vesper_cropped.png"},
125: { nickname: "Magnolia", pk_id: "fgovk", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994641247174144070/magnolia.png"},
126: { nickname: "Anise", pk_id: "wwohm", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994642074810974208/anise_cropped.png"},
127: { nickname: "", pk_id: "", profile_image: ""},
128: { nickname: "Case", pk_id: "xkldh", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/998064461590036510/case_cropped.png"},
129: { nickname: "Tea", pk_id: "hsbzk", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/987363140608081960/tea_cropped.png"},
134: { nickname: "Wisteria", pk_id: "fswbf", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994650133654413494/wisteria_cropped.png"},
135: { nickname: "Twine", pk_id: "iniih", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994643268258234418/twine_cropped.png"},
136: { nickname: "Mica", pk_id: "mpziv", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/987363712363020288/mica_cropped.png"},
137: { nickname: "", pk_id: "", profile_image: ""},
138: { nickname: "", pk_id: "", profile_image: ""},
139: { nickname: "Chervil", pk_id: "uxevf", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/992945914647945266/chervil_cropped.png"},
145: { nickname: "", pk_id: "", profile_image: ""},
146: { nickname: "August", pk_id: "kbebh", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/994666335873273969/august_cropped.png"},
147: { nickname: "", pk_id: "", profile_image: ""},
148: { nickname: "", pk_id: "", profile_image: ""},
149: { nickname: "", pk_id: "mitup", profile_image: ""},
156: { nickname: "", pk_id: "", profile_image: ""},
157: { nickname: "", pk_id: "", profile_image: ""},
158: { nickname: "", pk_id: "", profile_image: ""},
167: { nickname: "", pk_id: "", profile_image: ""},
168: { nickname: "", pk_id: "", profile_image: ""},
169: { nickname: "Jean", pk_id: "mlbtd", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/993023222775816253/thursday_cropped.png"},
178: { nickname: "Evelyn", pk_id: "agpdf", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/990799962973569084/evelyn_cropped.png"},
179: { nickname: "Lark", pk_id: "spuzi", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/988126182664978462/179_cropped.png"},
189: { nickname: "", pk_id: "", profile_image: ""},
159: { nickname: "Altar", pk_id: "echdf", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/988465985587642448/altar_cropped.png"},
234: { nickname: "", pk_id: "", profile_image: ""},
235: { nickname: "", pk_id: "lgefu", profile_image: ""},
236: { nickname: "", pk_id: "", profile_image: ""},
237: { nickname: "", pk_id: "", profile_image: ""},
238: { nickname: "", pk_id: "", profile_image: ""},
239: { nickname: "Hell", pk_id: "furyg", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995934170884878357/239.png"},
245: { nickname: "Saffron", pk_id: "leuza", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996289586298900491/saffron_cropped.png"},
246: { nickname: "", pk_id: "", profile_image: ""},
247: { nickname: "Liz", pk_id: "ecuag", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/997180400201904238/liz_cropped.png"},
248: { nickname: "Rue", pk_id: "mybzi", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996290233131859998/rue_cropped.png"},
249: { nickname: "", pk_id: "", profile_image: ""},
256: { nickname: "Clara", pk_id: "fztdv", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/998646407122661577/clara_cropped.png"},
257: { nickname: "Gentian", pk_id: "rmzmz", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996289104075571200/gentian_cropped.png"},
258: { nickname: "Caspian", pk_id: "scxnw", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995555618788212807/caspian_cropped.png"},
259: { nickname: "", pk_id: "", profile_image: ""},
267: { nickname: "Eden", pk_id: "xdxec", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995801494886559855/eden_cropped.png"},
268: { nickname: "Quinn", pk_id: "xlusg", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/992957009408311316/quinn_cropped_2.png"},
269: { nickname: "", pk_id: "", profile_image: ""},
278: { nickname: "", pk_id: "", profile_image: ""},
279: { nickname: "", pk_id: "", profile_image: ""},
289: { nickname: "", pk_id: "", profile_image: ""},
345: { nickname: "Lad", pk_id: "qqkmp", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996288799367766016/lad_cropped.png"},
346: { nickname: "", pk_id: "", profile_image: ""},
347: { nickname: "Gorse", pk_id: "ezpcy", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996288389810770020/gorse_cropped.png"},
348: { nickname: "Francis ", pk_id: "ogeay", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995555998053965854/francis_cropped.png"},
349: { nickname: "Florence", pk_id: "rhqea", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995556284118077481/florence_cropped.png"},
356: { nickname: "", pk_id: "", profile_image: ""},
357: { nickname: "", pk_id: "", profile_image: ""},
358: { nickname: "", pk_id: "", profile_image: ""},
359: { nickname: "", pk_id: "uioxq", profile_image: ""},
367: { nickname: "", pk_id: "", profile_image: ""},
368: { nickname: "Friday", pk_id: "lpcno", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/985039694872055868/friday_cropped.png"},
369: { nickname: "", pk_id: "", profile_image: ""},
378: { nickname: "", pk_id: "", profile_image: ""},
379: { nickname: "", pk_id: "", profile_image: ""},
389: { nickname: "", pk_id: "", profile_image: ""},
456: { nickname: "Alder", pk_id: "cnifu", profile_image: "https://picrew.me/shareImg/org/202206/1650524_JoI5q2Ox.png"},
457: { nickname: "Thomas", pk_id: "ehxfl", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/992959949577658469/thomas_cropped.png"},
458: { nickname: "Cedar", pk_id: "rejkr", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/988125392672010261/258_cropped.png"},
459: { nickname: "Danger", pk_id: "bsjiy", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995556609973555270/danger_cropped.png"},
467: { nickname: "Jodie", pk_id: "bfqur", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996287181322723378/jodie_cropped.png"},
468: { nickname: "Summer", pk_id: "tvprl", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996286932063625357/summer_cropped.png"},
469: { nickname: "", pk_id: "", profile_image: ""},
478: { nickname: "Milo", pk_id: "pbbdj", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995557029139709992/oliver_cropped.png"},
479: { nickname: "Nettle", pk_id: "aybzn", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995558320221999224/nettle_cropped.png"},
489: { nickname: "Raven", pk_id: "rcrdb", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995551953364996116/raven_cropped.png"},
567: { nickname: "Whin", pk_id: "znkuf", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/989546073867571220/whin_cropped.png"},
568: { nickname: "", pk_id: "", profile_image: ""},
569: { nickname: "", pk_id: "", profile_image: ""},
578: { nickname: "", pk_id: "", profile_image: ""},
579: { nickname: "", pk_id: "", profile_image: ""},
589: { nickname: "", pk_id: "", profile_image: ""},
678: { nickname: "", pk_id: "", profile_image: ""},
679: { nickname: "", pk_id: "", profile_image: ""},
689: { nickname: "Vivian", pk_id: "hgqjs", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995464717579599982/Vivian_cropped.png"},
789: { nickname: "Vern", pk_id: "ggast", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996466810360713286/789_cropped.png"},
1249: { nickname: "", pk_id: "", profile_image: ""},
2369: { nickname: "Hemlock", pk_id: "xasyw", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/995950009134632960/hemlock_cropped.png"},
2457: { nickname: "Jes", pk_id: "ywmjr", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/993230028701716550/jes_cropped.png"},
2459: { nickname: "", pk_id: "yhbsd", profile_image: ""},
3567: { nickname: "Morgan", pk_id: "rkekm", profile_image: "https://cdn.discordapp.com/attachments/982166756837707786/996287547363831808/morgan_cropped.png"}
};
const hexVals = [
"#B0171F",
"#DC143C",
"#FFB6C1",
"#FFAEB9",
"#EEA2AD",
"#CD8C95",
"#8B5F65",
"#FFC0CB",
"#FFB5C5",
"#EEA9B8",
"#CD919E",
"#8B636C",
"#DB7093",
"#FF82AB",
"#EE799F",
"#CD6889",
"#8B475D",
"#FFF0F5",
"#EEE0E5",
"#CDC1C5",
"#8B8386",
"#FF3E96",
"#EE3A8C",
"#CD3278",
"#8B2252",
"#FF69B4",
"#FF6EB4",
"#EE6AA7",
"#CD6090",
"#8B3A62",
"#872657",
"#FF1493",
"#EE1289",
"#CD1076",
"#8B0A50",
"#FF34B3",
"#EE30A7",
"#CD2990",
"#8B1C62",
"#C71585",
"#D02090",
"#DA70D6",
"#FF83FA",
"#EE7AE9",
"#CD69C9",
"#8B4789",
"#D8BFD8",
"#FFE1FF",
"#EED2EE",
"#CDB5CD",
"#8B7B8B",
"#FFBBFF",
"#EEAEEE",
"#CD96CD",
"#8B668B",
"#DDA0DD",
"#EE82EE",
"#FF00FF",
"#EE00EE",
"#CD00CD",
"#8B008B",
"#800080",
"#BA55D3",
"#E066FF",
"#D15FEE",
"#B452CD",
"#7A378B",
"#9400D3",
"#9932CC",
"#BF3EFF",
"#B23AEE",
"#9A32CD",
"#68228B",
"#4B0082",
"#8A2BE2",
"#9B30FF",
"#912CEE",
"#7D26CD",
"#551A8B",
"#9370DB",
"#AB82FF",
"#9F79EE",
"#8968CD",
"#5D478B",
"#483D8B",
"#8470FF",
"#7B68EE",
"#6A5ACD",
"#836FFF",
"#7A67EE",
"#6959CD",
"#473C8B",
"#F8F8FF",
"#E6E6FA",
"#0000FF",
"#0000EE",
"#0000CD",
"#00008B",
"#000080",
"#191970",
"#3D59AB",
"#4169E1",
"#4876FF",
"#436EEE",
"#3A5FCD",
"#27408B",
"#6495ED",
"#B0C4DE",
"#CAE1FF",
"#BCD2EE",
"#A2B5CD",
"#6E7B8B",
"#778899",
"#708090",
"#C6E2FF",
"#B9D3EE",
"#9FB6CD",
"#6C7B8B",
"#1E90FF",
"#1C86EE",
"#1874CD",
"#104E8B",
"#F0F8FF",
"#4682B4",
"#63B8FF",
"#5CACEE",
"#4F94CD",
"#36648B",
"#87CEFA",
"#B0E2FF",
"#A4D3EE",
"#8DB6CD",
"#607B8B",
"#87CEFF",
"#7EC0EE",
"#6CA6CD",
"#4A708B",
"#87CEEB",
"#00BFFF",
"#00B2EE",
"#009ACD",
"#00688B",
"#33A1C9",
"#ADD8E6",
"#BFEFFF",
"#B2DFEE",
"#9AC0CD",
"#68838B",
"#B0E0E6",
"#98F5FF",
"#8EE5EE",
"#7AC5CD",
"#53868B",
"#00F5FF",
"#00E5EE",
"#00C5CD",
"#00868B",
"#5F9EA0",
"#00CED1",
"#F0FFFF",
"#E0EEEE",
"#C1CDCD",
"#838B8B",
"#E0FFFF",
"#D1EEEE",
"#B4CDCD",
"#7A8B8B",
"#BBFFFF",
"#AEEEEE",
"#96CDCD",
"#668B8B",
"#2F4F4F",
"#97FFFF",
"#8DEEEE",
"#79CDCD",
"#528B8B",
"#00FFFF",
"#00EEEE",
"#00CDCD",
"#008B8B",
"#008080",
"#48D1CC",
"#20B2AA",
"#03A89E",
"#40E0D0",
"#808A87",
"#00C78C",
"#7FFFD4",
"#76EEC6",
"#66CDAA",
"#458B74",
"#00FA9A",
"#F5FFFA",
"#00FF7F",
"#00EE76",
"#00CD66",
"#008B45",
"#3CB371",
"#54FF9F",
"#4EEE94",
"#43CD80",
"#2E8B57",
"#00C957",
"#BDFCC9",
"#3D9140",
"#F0FFF0",
"#E0EEE0",
"#C1CDC1",
"#838B83",
"#8FBC8F",
"#C1FFC1",
"#B4EEB4",
"#9BCD9B",
"#698B69",
"#98FB98",
"#9AFF9A",
"#90EE90",
"#7CCD7C",
"#548B54",
"#32CD32",
"#228B22",
"#00FF00",
"#00EE00",
"#00CD00",
"#008B00",
"#008000",
"#006400",
"#308014",
"#7CFC00",
"#7FFF00",
"#76EE00",
"#66CD00",
"#458B00",
"#ADFF2F",
"#CAFF70",
"#BCEE68",
"#A2CD5A",
"#6E8B3D",
"#556B2F",
"#6B8E23",
"#C0FF3E",
"#B3EE3A",
"#9ACD32",
"#698B22",
"#FFFFF0",
"#EEEEE0",
"#CDCDC1",
"#8B8B83",
"#F5F5DC",
"#FFFFE0",
"#EEEED1",
"#CDCDB4",
"#8B8B7A",
"#FAFAD2",
"#FFFF00",
"#EEEE00",
"#CDCD00",
"#8B8B00",
"#808069",
"#808000",
"#BDB76B",
"#FFF68F",
"#EEE685",
"#CDC673",
"#8B864E",
"#F0E68C",
"#EEE8AA",
"#FFFACD",
"#EEE9BF",
"#CDC9A5",
"#8B8970",
"#FFEC8B",
"#EEDC82",
"#CDBE70",
"#8B814C",
"#E3CF57",
"#FFD700",
"#EEC900",
"#CDAD00",
"#8B7500",
"#FFF8DC",
"#EEE8CD",
"#CDC8B1",
"#8B8878",
"#DAA520",
"#FFC125",
"#EEB422",
"#CD9B1D",
"#8B6914",
"#B8860B",
"#FFB90F",
"#EEAD0E",
"#CD950C",
"#8B6508",
"#FFA500",
"#EE9A00",
"#CD8500",
"#8B5A00",
"#FFFAF0",
"#FDF5E6",
"#F5DEB3",
"#FFE7BA",
"#EED8AE",
"#CDBA96",
"#8B7E66",
"#FFE4B5",
"#FFEFD5",
"#FFEBCD",
"#FFDEAD",
"#EECFA1",
"#CDB38B",
"#8B795E",
"#FCE6C9",
"#D2B48C",
"#9C661F",
"#FF9912",
"#FAEBD7",
"#FFEFDB",
"#EEDFCC",
"#CDC0B0",
"#8B8378",
"#DEB887",
"#FFD39B",
"#EEC591",
"#CDAA7D",
"#8B7355",
"#FFE4C4",
"#EED5B7",
"#CDB79E",
"#8B7D6B",
"#E3A869",
"#ED9121",
"#FF8C00",
"#FF7F00",
"#EE7600",
"#CD6600",
"#8B4500",
"#FF8000",
"#FFA54F",
"#EE9A49",
"#CD853F",
"#8B5A2B",
"#FAF0E6",
"#FFDAB9",
"#EECBAD",
"#CDAF95",
"#8B7765",
"#FFF5EE",
"#EEE5DE",
"#CDC5BF",
"#8B8682",
"#F4A460",
"#C76114",
"#D2691E",
"#FF7F24",
"#EE7621",
"#CD661D",
"#8B4513",
"#292421",
"#FF7D40",
"#FF6103",
"#8A360F",
"#A0522D",
"#FF8247",
"#EE7942",
"#CD6839",
"#8B4726",
"#FFA07A",
"#EE9572",
"#CD8162",
"#8B5742",
"#FF7F50",
"#FF4500",
"#EE4000",
"#CD3700",
"#8B2500",
"#5E2612",
"#E9967A",
"#FF8C69",
"#EE8262",
"#CD7054",
"#8B4C39",
"#FF7256",
"#EE6A50",
"#CD5B45",
"#8B3E2F",
"#8A3324",
"#FF6347",
"#EE5C42",
"#CD4F39",
"#8B3626",
"#FA8072",
"#FFE4E1",
"#EED5D2",
"#CDB7B5",
"#8B7D7B",
"#FFFAFA",
"#EEE9E9",
"#CDC9C9",
"#8B8989",
"#BC8F8F",
"#FFC1C1",
"#EEB4B4",
"#CD9B9B",
"#8B6969",
"#F08080",
"#CD5C5C",
"#FF6A6A",
"#EE6363",
"#8B3A3A",
"#CD5555",
"#A52A2A",
"#FF4040",
"#EE3B3B",
"#CD3333",
"#8B2323",
"#B22222",
"#FF3030",
"#EE2C2C",
"#CD2626",
"#8B1A1A",
"#FF0000",
"#EE0000",
"#CD0000",
"#8B0000",
"#800000",
"#8E388E",
"#7171C6",
"#7D9EC0",
"#388E8E",
"#71C671",
"#8E8E38",
"#C5C1AA",
"#C67171"  
];


//      = Next =
// mark unavailable component digits etc (since it's easier to split into those by tapping fronters)

//      = To Do =
// style present digits by % to fit on one line
// known issues: sort order doesn't always put present headmates first (fixed?)
// search by name + digits
// output as ?active=24,5,6 and generate a link (output to search bar?)
// load from URL parameter
// style: size up the present fronters to be all on one row (when possible) and add some space below that
// show emojis
// connect to PluralKit API
// names off to right side with details?
// refactor to use an object to store current, past, and future states

//          = Later =
// ? silhouette for headmates that don't have portraits
   // suggest picrews from headmates who share digits
// shift click multiple portraits to merge
// CTRL + click headmates to split; pulls up a popup that shows split options/previews the split (that disappears when CTRL is released - split to digits - or an option is clicked)
// search by emojis (use the emoji list in the spreadsheet to allow search by near miss)
// toggle show/hide: 
  // digits
  // emojis (if portraits aren't shown, make them big?)
  // fursona view (images + names)
// double click? to pull up details (including Picrew)
// output possible duties to address?
// track what front combinations happen most often
// support undo/redo?
// double click to open pluralkit info page
// add background colors for images without background colors
    // sample from images where present and add those colors to the spreadsheet + PK

let baseNum = 9;
let cap = 4; // n-fusion maximum
let totalNum = 0;
let fronting = [];
let headmates = {};

let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

let note = document.createElement("div");
note.classList.add("note");
document.body.appendChild(note);

function elementByCallsign(callsign) {
  return document.getElementById("tile-" + callsign);
}

function sortOrder(callsign, headmate) {
  let num = callsign.length;
  if (!headmate.status.available) {
    num += (20 ** (cap + 1));
  } else if (!headmate.status.present) {
    num += (10 ** (cap + 1));
  }
  return num;
}

function sortByCallsign(arr) {
  // sorts and deduplicates a callsign list
  // @later use custom sort?
  return [...new Set(arr)].sort(function(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}

function onClick(event) {
  
  function checkStatus(callsign, string, bool = true) {
    return (headmates[callsign].status[string] == bool);
  }
  function setStatus(callsign, string, bool) {
    headmates[callsign].status[string] = bool;
  }
  function bulkSetStatus(list, string, bool) {
    list.forEach(a => {
      setStatus(a, string, bool);
    })
  }
  function unmerge(callsign) {
    callsign.split('').forEach(d => {        
      setStatus(d, "present", true);    
      setStatus(d, "available", true);
    });
    setStatus(callsign, "present", false);  
  }
  function toggleOn(callsign) {
    setStatus(callsign, "present", true);
    
    // for digits:
    setStatus(callsign, "available", true);
    
    let bigSibs = headmates[callsign].in;
    let lilSibs = headmates[callsign].components;  
    let sideSibs = headmates[callsign].siblings;
    let all = [].concat(sideSibs, lilSibs, bigSibs);
    all = sortByCallsign(all).reverse();
    // @todo test
    //.slice() // makes shallow copy
    all.forEach(s => {
      if (s.length > 1 && checkStatus(s, "present")) {
        unmerge(s);
      }
      setStatus(s, "present", false);
    });
  }
  function toggleOff(callsign) {
    setStatus(callsign, "present", false);  
    if (callsign.length == 1) {
      setStatus(callsign, "available", false); 
    } else {
      unmerge(callsign);
    }
  }
  
  let cs = event.target.id.slice("tile-".length);
  if (event.target.classList.contains("present")) {
    toggleOff(cs);
  } else {
    toggleOn(cs);
  }
   
  // reset availability
  for (const [callsign, p] of Object.entries(headmates)) {
    if (callsign.length > 1) {
      setStatus(callsign, 'available', true);
    }
  }
  
  // @todo deprioritize/show with less emphasis the headmates who cannot (also) be present
  for (const [callsign, p] of Object.entries(headmates)) {    
    if (callsign.length == 1 && !p.status.available) {
      // mark unavailable any fusions with unavailable digits
      bulkSetStatus(p.in, 'available', false);
    } else if (callsign.length > 1 && p.status.present) {
      // mark unavailable siblings of present fusions
      bulkSetStatus(p.siblings, 'available', false);
    }
  }
  
  for (const [callsign, value] of Object.entries(headmates)) {
    let e = elementByCallsign(callsign);
    e.classList.toggle("available", value.status.available);
    e.classList.toggle("present", value.status.present);    
    e.style.order = sortOrder(callsign, value);
  }
  
  // output front signature
  fronting = [];
  for (const [callsign, value] of Object.entries(headmates)) {
    if (value.status.present) {
      fronting.push(callsign);
    }
  }
  fronting = sortByCallsign(fronting);
  
  note.textContent = `${totalNum} shown & fronting: ${fronting.join(', ')}`;
}

// currently called inside fillInHeadmates
function addHeadmateTile(num, headmate) {
  let tile = document.createElement("div");
  tile.addEventListener("click", onClick);
  tile.classList.add("tile");
  tile.id = "tile-" + num;
  
  let icon = document.createElement("div");
  icon.classList.add("icon");
  icon.style.backgroundColor = hexVals[(num * 61) % hexVals.length];
  
  if (headmate.status.present) {
    tile.style.order = num.length;
    tile.classList.add("present");
    tile.classList.add("available");
  } else {
    tile.style.order = sortOrder(num, headmate);
    tile.classList.add("available");
  }
  tile.title = num;
    
  let name = document.createElement("div");
  name.classList.add("name");  
  name.textContent = num;
  
  if (headmateAttributes[num]) {
    let a = headmateAttributes[num];
    if (a.nickname) {
      tile.title += ' | ' + a.nickname;
      name.innerHTML += '&nbsp|&nbsp' + a.nickname;
    }
    if (a.profile_image) {
      icon.style.backgroundImage = `url('${a.profile_image}')`;      
    }
    // @later
    //pk_id: "cbkpk"
    
  }
  tile.title += '\n' + status;
  
  tile.appendChild(icon);
  tile.appendChild(name);
  container.appendChild(tile);
}

// sorts digits within a callsign
function sortCallsign(callsign) {
  let key = callsign + '';
  if (key.length > 1) {
    key = sortByCallsign(key.split('')).join('');
  }
  return key;
}

// populate the headmates object and return # generated
function fillInHeadmates() {
  let count = 0;
    
  function newHeadmate(callsign, status = "not present") {
    let n = {
      in: [],
      components: [],
      siblings: [],
      status: { 
        available: true, 
        present: false
      }
    };
    let key = callsign + '';
    headmates[key] = n;
    if (status == "present") {
      n.status.present = true;
    }
    addHeadmateTile(callsign, headmates[key]);
    count++;
  }
  
  for (a = 1; a <= baseNum; a++) { 
    newHeadmate(a, "present");
    fronting.push(a);
  }
  
  function mergeEntries(a, b) {
    // @later why does removing the length from here cause an infinite loop?
    let comb = (a + '' + b);
    let key = sortCallsign(comb);
    if (a !== b && key.length <= cap && comb.length == key.length) {
      let A = headmates[a].components;
      let B = headmates[b].components;
      let C = [];
      if (headmates.hasOwnProperty(key)){
        C = headmates[key].components;
      } else {
        newHeadmate(key);
      }
      headmates[key].components = [a, b].concat(A, B, C);
      
      headmates[a].in.push(key);
      headmates[b].in.push(key);
    }
  }
  function addMergeGeneration() {
    let currentKeys = Object.keys(headmates);
    currentKeys.forEach(a => {
      currentKeys.forEach(b => {
        mergeEntries(a, b);
      });
    });
  }
  
  function dedupCallsigns() {
    for (const [key, value] of Object.entries(headmates)) {
      for (const [p, list] of Object.entries(value)) {
        if (Array.isArray(list)) {
          headmates[key][p] = sortByCallsign(list);
        }
      }
    }
  }
  
  for (g = 0; g < cap; g++) {
    addMergeGeneration();
    dedupCallsigns();
  }
  
  /*
  for (a = 1; a <= baseNum; a++) {
    for (b = a + 1; b <= baseNum; b++) {
      num = "" + a + b;
      newHeadmate(num, "not present");
      //headmates[a + ""].siblings.push(num);
      //headmates[b + ""].siblings.push(num);

      
      for (c = b + 1; c <= baseNum; c++) {

        num = '' + a + b + c;

        addHeadmateTile(num, "not present");
        headmates[a + ''].siblings.push(num);
        headmates[b + ''].siblings.push(num);
        headmates[c + ''].siblings.push(num);

      }
      
    }
  }
  */

  // fill in all siblings
  function fillInSiblings(key) {
    let sibs = [];

    function addSibs(sibKey) {
      let lilSib = headmates[key].components.includes(sibKey);
      let bigSib = headmates[key].in.includes(sibKey)
      if (!lilSib & !bigSib) {
        sibs.push(sibKey);
      }
    }

    if (key.length > 1) {
      key.split('').forEach(a => {
        // @todo add support for multi-part components?
        headmates[a].in.forEach(addSibs);
      });
    }
    
    // deduplicate and sort the sibling array
    sibs = sortByCallsign(sibs);

    // remove the callsign for this headmate
    if (sibs.indexOf(key) >= 0) {
      sibs.splice(sibs.indexOf(key), 1);
    }
    
    headmates[key].siblings = sibs;
  }
  for (const [callsign, value] of Object.entries(headmates)) {
    fillInSiblings(callsign);
  }
  
  return count;
}

totalNum = fillInHeadmates();
note.textContent = `${totalNum} shown & fronting: ${fronting.join(', ')}`;


// make a printout to check values
function printDetails(printIf = [1, 12]) {
  let printout = `-------------------\n\n`;
  printIf.forEach(a => {
    printout += `Callsign: ${a}\n\n`
    if (headmates[a + '']) {
      for (const [key, value] of Object.entries(headmates[a + ''])) {
        if (value.length > 0) {
          printout += `${key}: ${value.join(', ')}\n\n`;
        }
      }
    } else {
      printout += `not found\n\n`;
    }
    printout += `-------------------\n\n`;
  });
  console.log(printout);
}
//printDetails();

