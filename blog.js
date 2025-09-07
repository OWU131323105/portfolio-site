fetch('blogposts.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('blog-list');
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h2><a href="detail.html?id=${post.id}">${post.title}</a></h2>
        <p>${post.date}</p>
        <p>${post.content}</p>
        <hr>
      `;
      container.appendChild(article);
    });
  });