document.addEventListener('DOMContentLoaded', () => {
    const sanket = document.getElementById('mainblogs');
    const rashmi = document.getElementById('side');
    const modal = document.getElementById('modal');
    const papa = document.getElementById('pop');
    const closeContent = document.querySelector('.closeblog');

          const apiURL = 'https://coding-week-2024-api.onrender.com/api/data';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            renderBlogs(data);
        })
        .catch(error => console.error('Error fetching data:', error));

        function renderBlogs(data) {
                data.forEach(blog => {
                        if (blog.type ===   'lifestyle' ) {
                           createFeaturedBlog(blog);
            }
            createSidebarBlog(blog);
                         });
    }

                        function createFeaturedBlog(blog) {
                        const content = document.createElement('div');
        content.classList.add('img-container');

        content.innerHTML = `
                    <img src="${blog.image}" alt="${blog.headline}">
                    <span class="text">
                     <span class="click">Featured</span>
                                &nbsp;&nbsp;
                    <span class="click">${capitalizeFirstLetter(blog.type)}</span>
                                <br>${blog.headline}<br>
                <i class="fa-regular fa-calendar"></i>&nbsp;${blog.date}
            </span>
        `;

                         content.addEventListener('click', () => openModal(blog));

                     sanket.appendChild(content);
    }

                       function createSidebarBlog(blog) {
        const content = document.createElement('div');
                  content.classList.add('side');

                     content.innerHTML = `
            <img src="${blog.image}" alt="${blog.headline}">
              <a href="#">
                <p><b>${blog.headline}</b></p>
                          </a>
                <br>
                      <i class="fa-regular fa-calendar"></i> ${blog.date}
        `;

                  content.addEventListener('click', () => openModal(blog));

                     rashmi.appendChild(content);
    }

                function capitalizeFirstLetter(string11) {
                        return string11.charAt(0).toUpperCase() + string11.slice(1);
                     }

    function openModal(blog) {
                        papa.innerHTML = `
            <h2>${blog.headline}</h2>
                      <p><i>${blog.date}</i> by ${blog.author}</p>
                <img src="${blog.image}" alt="${blog.headline}" style="width: 100%;">
            <p>${blog.content}</p>
        `;
                   modal.style.display = 'block';
    }

                     closeContent.addEventListener('click', () => {
        modal.style.display = 'none';
    });

                window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
