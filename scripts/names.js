// #todo make a function to suggest a few names from each category and cycle through them (shuffle at start and then proceed by modulo
// #todo make sure to remove names that are already in use!
var namesList = {
  masc: 
    `Andrew
    Alan
    Aram
    Arthur
    Asbel
    August
    Ambrose
    Axel
    Antimony
    Basil
    Buckwheat
    Barnaby
    Barley
    Burdock
    Bartholomew
    Caleb
    Connor
    Costantin
    Cyrus
    Damian
    Danny
    Denim
    Devon
    Dominic
    Felix
    Gavin
    Henry
    Hugh
    Hugo
    Hickory
    Icarus
    Ira
    James
    Jude
    Jax
    Jayden
    Jeremy
    Jerome
    Joseph
    Justin
    Koi
    Lee
    Lentil
    Leonardo
    Liam
    Lior
    Logan
    Luke
    Lysander 
    Mihaly (MEE-hai)
    Milo
    Nick
    Nickola
    Nicola
    October
    Pascal
    Percy
    Quinn
    Richard
    Robert
    Roy
    Ryan
    Silas
    Sebastian
    Spruce
    Talon 
    Tau
    Theo
    Torin
    Tyler
    Winter
    Wintergreen
    Wyatt
    Xavier
    Xenon
    Zach
    Zagreus`,
  neutral:
    `Aeron
    Alfalfa
    Bergamot
    Billie
    Birch
    Balm
    Blake
    Bryn
    Chaos
    Cherry
    Circuit
    Clary
    Clove
    Copper
    Corderoy
    Coriander
    Cypress
    Danny
    Denim
    Dirt
    Dusty
    Esper
    Eucalyptus
    Fable
    Feather
    Feldspar
    Fig
    Finch
    Forage
    Hero
    Hyacinth
    Indigo
    Kit
    Lace
    Lake
    Leaf
    Lichen
    Linen
    Link
    Locust
    Loki
    Lumi
    Marjoram
    Mint
    Molly
    Mugwort
    Mulberry
    Mxchief
    Neu
    Never
    Nex
    Ode
    Peanut
    Pennyroyal
    Porcelain
    Puck
    Quinn
    Retracted
    Rhubarb
    Riley
    Riot
    Robin
    Rocky
    Rook
    Rosemary
    Sage
    Scout
    Sky
    Spaces
    Star
    Steel
    Sterling
    Tamarind
    Tarragon
    Thread
    Vetiver
    Winter
    Zee`,
  femme:
    `Acacia
    Ada
    Pansy
    Adelia
    Adina
    Akira
    Alice
    Amara
    Amaryllis
    Arcadia
    Aria
    Arnica
    Audra
    Ava
    Betony
    Blaire
    Brooke
    Clementine
    Colette
    Cora
    Dahlia
    Daisy
    Dove
    Effie
    Eilette
    Estelle
    Estrella
    Eve
    Evelyn
    Flicka
    Florence
    Freja
    Grace
    Gwen
    Hazel
    Holly
    Hyssop
    Ivy
    Josie
    Joy
    Juno
    Kira
    Layla
    Lenalee
    Lila
    Lilly
    Lyra
    Mara
    Marigold
    Marion
    May
    Melody
    Molly
    Myrrh
    Nadia
    Nina
    Noel
    Patience
    Quilla
    Reyna
    Rhea
    Rhiannon
    Roxi
    Ruby
    Salome
    Salvia
    Sarennya
    Selina
    Seraphina
    Sloan
    Sophie
    Star
    Sylvia
    Tera
    Trish
    Valerie
    Vita
    Wanda
    Wren`,
  alt:
    `Abby
    Ace
    Angel
    Apollo
    Archie
    Arya
    Ash
    Astro
    Atlas
    Aurora
    Ava
    Axel
    Bailey
    Balto
    Bandit
    Bear
    Beau
    Bella
    Belle
    Benny
    Blaze
    Blu
    Bolt
    Books
    Boomer
    Bowie
    Briar
    Bruce
    Bruno
    Buddy
    Buster
    Celery
    Chance
    Charlie
    Chase
    Chief
    Chloe
    Cleo
    Coco
    Cody
    Copper
    Cosmo
    Daisy
    Dakota
    Dante
    Diamond
    Diesel
    Duke
    Echo
    Ella
    Ellie
    Elsa
    Emma
    Everest
    Finn
    Frankie
    Freya
    Ghost
    Ginger
    Gus
    Hank
    Harper
    Hazel
    Honey
    Hunter
    Iris
    Ivy
    Jackson
    Jake
    Jasper
    Jax
    Josie
    Kai
    Kane
    King
    Kira
    Kobe
    Kody
    Kylo
    Lady
    Laika
    Lilo
    Lily
    Lobo
    Logan
    Loki
    Lola
    Louie
    Luca
    Lucky
    Lucy
    Luka
    Luke
    Lulu
    Maggie
    Marley
    Maui
    Millie
    Mocha
    Molly
    Moose
    Murphy
    Nala
    Nova
    Oakley
    Obi
    Ollie
    Oreo
    Otis
    Ozzy
    Penny
    Pepper
    Phoebe
    Piper
    Prince
    Princess
    Ranger
    Rex
    Riley
    River
    Rocco
    Rocket
    Rocky
    Roscoe
    Rose
    Rosie
    Roxy
    Ruby
    Sage
    Sam
    Scout
    Simba
    Sky
    Skye
    Smokey
    Snow
    Sophie
    Stella
    Storm
    Stormy
    Teddy
    Thor
    Thunder
    Timber
    Titan
    Toby
    Tucker
    Whiskey
    Willow
    Winnie
    Winston
    Winter
    Zelda
    Zoe`
  }