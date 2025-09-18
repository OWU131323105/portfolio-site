fetch('blogposts.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('blog-list');
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper'; // クラス名を追加
    
    const searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.placeholder = 'キーワード・タグで検索';
    
    const searchButton = document.createElement('button');
    searchButton.textContent = '検索';
    searchButton.className = 'search-button'; // クラス名を追加

    searchWrapper.appendChild(searchBox);
    searchWrapper.appendChild(searchButton);
    container.parentNode.insertBefore(searchWrapper, container);

    function renderList(filteredPosts) {
      container.innerHTML = '';
      if (filteredPosts.length === 0) {
        container.innerHTML = '<p>検索条件に一致する記事はありませんでした。</p>';
        return;
      }
      filteredPosts.forEach(post => {
        const article = document.createElement('article');
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const excerpt = post.content.length > 100
          ? post.content.substring(0, 100) + '...'
          : post.content;
        const tagsHtml = post.tags ? `<div class="post-tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>` : '';
        article.innerHTML = `
          <h2><a href="detail.html?id=${post.id}">${post.title}</a></h2>
          <p>${excerpt}</p>
          <br>
          <div class="post-meta">
            <span class="post-date">${formattedDate}</span>
            ${tagsHtml}
          </div>
        `;
        container.appendChild(article);
      });
    }

    renderList(posts);

    searchButton.addEventListener('click', () => {
      const keyword = searchBox.value.trim().toLowerCase();
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(keyword) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(keyword))) ||
        post.content.toLowerCase().includes(keyword)
      );
      renderList(filtered);
    });
  });
