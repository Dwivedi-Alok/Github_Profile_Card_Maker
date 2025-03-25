// const btn=document.querySelector('#btn');

// const inp=document.querySelector('#in');
// const res=document.querySelector('.result');
// const img=document.createElement('img');
// const fol=document.querySelector('.follower')
//     res.appendChild(img);
// function fetchurl(apiurl){
//     return new Promise(function(resolve,reject){
//         fetch(apiurl)
//          .then(response=>{
//             if(!response.ok){
//                 console.log(`ERROR: api: ${apiurl} \n status: ${response.status}`);
//                 reject(`HTTP Error: ${response.status}`);
//             }
//             else{
//                 return response.json();
//             }
            
//          }).then(response=>{
            
//             resolve(response)
//         console.log(response);
        
//         })
//          .catch(error=>reject(error))
//     });
// }
// btn.addEventListener('click',(e)=>{
    
//     const apiurl=`https://api.github.com/users/${inp.value}`;
    
// fetchurl(apiurl)
//    .then(response=>{
//     if(response.avatar_url){
//         img.src=response.avatar_url;
//          img.alt='logo';
//          img.style.display = "block"; // Ensure the image is visible
//         img.style.width = "150px";
//     }
//     if(response.followers && response.login){
          
           
//           fol.innerHTML=`follower:${response.follower}<br> username:${response.login}`
//     }
//     else{
//         console.log("Avatar URL not found");
//                 img.style.display = "none";
//     }
//    })
//    .catch(error=>{
//     console.log(`error:${error}`);
//     img.style.display = "none";
// })
// });
/* ********************************************jquery*********************************** */
let btn = $('#btn');
let inp = $('#in');
const res = $('.result');
const img = $('<img>');

img.addClass('img');

const fol = $('.follower');
const im=$('.im');
im.append(img);
function fetchurl(apiurl) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: apiurl,
            dataType: 'JSON',
            method: 'GET',
            success: function (response) {
                resolve(response);
                console.log(response);
            },
            error: function (error) {
                reject(error);
                console.log(`Error: ${error}`);
            }
        });
    });
}

btn.on('click', function () {
    const username = inp.val().trim();
    if (username) {
        const apiurl = `https://api.github.com/users/${username}`;
        apilink(apiurl);
        inp.remove();
        btn.remove();
        const newbtn = $('<button></button>').text('reset').attr('id', 'reset');
       

    } else {
        alert("Please enter a GitHub username.");
    }
});

// Detect 'Enter' Key Press in Input Field
inp.on('keypress', function (e) {
    if (e.key === 'Enter') {
        const username = inp.val().trim();
        if (username) {
            const apiurl = `https://api.github.com/users/${username}`;
            apilink(apiurl);
        } else {
            alert("Please enter a GitHub username.");
        }
    }
});

const apilink = function (apiurl) {
    fetchurl(apiurl)
        .then(response => {
            if (response.avatar_url) {
                img.attr('src', response.avatar_url).show(); // Show the image
            } else {
                console.log("Avatar URL not found");
                img.hide();
            }

            let followerCount = response.followers ?? 0;
            let hireableStatus = response.hireable ? 'Yes' : 'No';
            let location = response.location || "Not Available";
            let bio = response.bio || "No bio provided";
            let repos = response.public_repos ?? 0; // If null, set to 0

            $('.info').html(`
                <strong>Hireable</strong>: ${hireableStatus}<br>
                <strong>Location:</strong> ${location}<br>
                <strong>Public Repositories:</strong> ${repos}
            `);
            
            $('.followercount').html(`<strong>Followers</strong>: ${followerCount}<br>`);
            $('.name').html(`<strong>${response.name || "No Name Provided"}</strong><br>`);
            $('.username').html(`<strong>Username</strong>: ${response.login}<br>`);
            $('.bio').html(`<strong>Bio:</strong> ${bio}<br>`);

            // Remove existing GitHub link before appending a new one
            fol.find('a').remove();

            const anchor = $('<a></a>')
                .attr('href', response.html_url)
                .attr('target', '_blank')
                .text('GitHub Profile');
            
            fol.append(anchor);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            img.hide();
        });
};
