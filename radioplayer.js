// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'
async function getRadioData() {
    const response = await fetch(
        "https://api.sr.se/api/v2/channels?format=json&size=100"
    );
    let data = await response.json();
    return data;
}

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

async function getChannel() {
    data = await getRadioData();
    console.log(data);
    data.channels.forEach((channel) => {
        let radioContainer = document.getElementById("radiocontainer");

        // Create Elements

        let channelDiv = document.createElement("div");
        let channelSubDiv = document.createElement("div");
        let channelName = document.createElement("p");
        let channelImg = document.createElement("img");
        let text = document.createElement("p");
        let audio = document.createElement("audio");

        // Make sure image is not undefined

        if (channel.image == undefined) {
            channelImg.src =
                "https://static-cdn.sr.se/images/2384/c160e908-00ff-47f7-bdf7-0834100950e8.jpg?preset=api-default-square";
        } else if (channel.image != undefined) {
            channelImg.src = channel.image;
        }
        // Set attributes and style

        channelImg.setAttribute("class", "image")
        channelName.textContent = channel.name;
        channelName.setAttribute("class", "name")
        audio.controls = "controls";
        audio.src = `${channel.liveaudio.url}`;
        audio.setAttribute("class", "audio")
        console.log(channelImg);
        channelDiv.style.backgroundColor = `#${channel.color}`;
        channelDiv.setAttribute("class", "channel");
        channelSubDiv.setAttribute("class", "channelsub");
        text.textContent = channel.tagline
        text.setAttribute("class", "text")

        // Append items

        channelDiv.append(channelImg);
        channelSubDiv.append(channelName);
        channelSubDiv.append(text);
        channelSubDiv.append(audio);

        channelDiv.appendChild(channelSubDiv);
        radioContainer.appendChild(channelDiv);

    });
}

getChannel();

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>
