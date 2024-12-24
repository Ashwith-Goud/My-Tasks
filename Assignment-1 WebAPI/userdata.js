document.getElementById('fetchData').onclick = async function() {
    const udata = document.getElementById('data');
    udata.innerHTML = 'Loading...';

    try {
        const response = await fetch('https://randomuser.me/api/?results=30');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const users = data.results;

        localStorage.setItem('allUsers', JSON.stringify(users));

        let userHTML = ''; 

        for (let i = 0; i < users.length; i++) {
            const user = users[i]; 
            userHTML += `
            <div class="card">
                <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <button onclick="selectUser(${i})">View Address</button>
                <div id='address-${i}' style="display: none;"></div>  
            </div>
        `;
    }

udata.innerHTML = userHTML; 

    } catch (error) {
        console.error('Error fetching data:', error);
        udata.textContent = 'An error occurred while fetching the data. Please try again later.';
    }
};

function selectUser(i) {
    const users = JSON.parse(localStorage.getItem('allUsers'));
    const selectedUser = users[i];
    const address = document.getElementById(`address-`+i);
    
    address.innerHTML = `
        <p><strong>State:</strong> ${selectedUser.location.state}</p>
        <p><strong>City:</strong> ${selectedUser.location.city}</p>
        <p><strong>Country:</strong> ${selectedUser.location.country}</p>
    `;
    address.style.display = 'block';
}
