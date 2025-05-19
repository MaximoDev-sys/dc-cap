document.addEventListener('DOMContentLoaded', () => {
    // Lista de perfiles (puedes modificar las IDs y los identificadores HTML a gusto)
    const profiles = [
        { id: "837149144476155905", imgId: "img1", usernameId: "username1", decorId: "deco_us1" },
        { id: "941757673441988671", imgId: "img2", usernameId: "username2", decorId: "deco_us2" },
        { id: "1215022068991660054", imgId: "img3", usernameId: "username3", decorId: "deco_us3" },
        { id: "642610076632350721", imgId: "img4", usernameId: "username4", decorId: "deco_us4" },
        { id: "829065403090731051", imgId: "img5", usernameId: "username5", decorId: "deco_us5" },
        { id: "837149144476155905", imgId: "img1x", usernameId: "username1x", decorId: "deco_us1x" },
        { id: "941757673441988671", imgId: "img2x", usernameId: "username2x", decorId: "deco_us2x" },
        { id: "1215022068991660054", imgId: "img3x", usernameId: "username3x", decorId: "deco_us3x" },
        { id: "642610076632350721", imgId: "img4x", usernameId: "username4x", decorId: "deco_us4x" },
        { id: "829065403090731051", imgId: "img5x", usernameId: "username5x", decorId: "deco_us5x" },
    ];

    profiles.forEach(profile => {
        const apiUrl = `https://discord-lookup-api-alpha.vercel.app/v1/user/${profile.id}`;

        const profilePicture = document.getElementById(profile.imgId);
        const usernameText = document.getElementById(profile.usernameId);
        const avatarFrame = document.getElementById(profile.decorId);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`API Response for ID ${profile.id}:`, data);

                // Set avatar
                const avatarUrl = data.avatar ? `${data.avatar.link}?size=1024` : './assets/pfp/default.jpg';
                if (profilePicture) {
                    profilePicture.src = avatarUrl;
                }

                // Mostrar nombre de usuario + tag
                if (usernameText) {
                    const tag = data.discriminator && data.discriminator !== "0" ? `#${data.discriminator}` : "";
                    usernameText.textContent = `${data.username}${tag}`;
                }
                // Set avatar frame if available
                if (data.avatar_decoration && data.avatar_decoration.asset) {
                    const asset = data.avatar_decoration.asset;
                    const frameUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=1024&passthrough=true`;
                    // console.log("Avatar Frame URL:", frameUrl); // Debug: log frame URL
                    avatarFrame.src = frameUrl;
                    avatarFrame.style.display = 'block'; // Show the avatar frame
                } else {
                    console.warn("No avatar frame asset found.");
                }
            })
            .catch(error => {
                console.error(`Error fetching user data for ID ${profile.id}:`, error);
            });
    });
});