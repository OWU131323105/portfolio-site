const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

fetch("blogposts.json")
  .then(response => response.json())
  .then(posts => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      document.getElementById("post-title").textContent = post.title;
      const date = new Date(post.date);
      const formattedDate = date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      document.getElementById("post-date").textContent = formattedDate;
      document.getElementById("post-content").innerHTML = post.content;
    } else {
      document.getElementById("blog-post").innerHTML = "<p>記事が見つかりませんでした。</p>";
    }
  })
  .catch(error => {
    document.getElementById("blog-post").innerHTML = "<p>読み込みエラーが発生しました。</p>";
    console.error(error);
  });
