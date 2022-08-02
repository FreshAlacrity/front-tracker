// see https://www.javascripttutorial.net/javascript-fetch-api/

function testAPI() {
  
  async function getData(token = pkToken) {
    let root = "https://api.pluralkit.me/v2"
    let url = root + "/systems/lhexq"
    //url += "/pbbdj" // Milo's member ID

    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  async function renderUsers() {
    let data = await getData();
    console.log(data)
  }

  renderUsers()
  
}