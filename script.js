const serverName = document.getElementById('name');
const serverIP = document.getElementById('ip');
const addBtn = document.querySelector('.add');
const serversList = document.querySelector('.servers');
const toast = document.getElementById('toast');

  let servers = JSON.parse(localStorage.getItem("serversList") || "[]");
renderServers();

function addServer() {
    if(serverName.value === "" || serverIP.value === ""){
            toast.style.display = "block";
        toast.style.animation = 'toastRight 100ms ease';
        
        toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all the info.`;
        setTimeout(() => {toast.style.display = "none";

        }, 2000);
        return;
    }
    const serverDetails = [serverName.value, serverIP.value];
    servers.push(serverDetails);

    localStorage.setItem("serversList", JSON.stringify(servers));

    renderServers();

    serverName.value = "";
    serverIP.value = "";
}
function renderServers() {
    serversList.innerHTML = "";

    servers.forEach((server, index) => {
        const newServer = document.createElement('div');
        newServer.classList.add('server');

        newServer.innerHTML = `
            <span>${server[0]}</span>
            <span>
                ${server[1]}
                <button class="ipbtn" onclick="copyIP('${server[1]}')">
                    <i class="fa-regular fa-copy"></i>
                </button>
                <button class="ipbtn" onclick="removeServer(${index})"><i class="fa-solid fa-xmark"></i></button>
            </span>
        `;

        serversList.appendChild(newServer);
    });
}
function copyIP(ip){
        
    navigator.clipboard.writeText(ip);
}
function removeServer(index){
    servers.splice(index, 1);
    localStorage.setItem("serversList", JSON.stringify(servers));
    renderServers();
}
