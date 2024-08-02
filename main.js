addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://qwen.lhf.us.kg" // 这里填写你获得的 API 地址
  const outputContainer = document.getElementById("ai-output");

  // 测试数据
  const postTitle = document.getElementsByClassName("post-title").textContent;
  const postBeforeContent = document.getElementById("article-container").textContent;
  const postContent = postBeforeContent.replace(/\n/g, '').replace(/[ ]+/g, ' ').replace(/<pre>[\s\S]*?<\/pre>/g, '').substring(0, 1800);

  const evSource = new EventSource(apiUrl + `/?q=${postTitle},文章内容:${postContent}`);
  evSource.onmessage = (event) => {
    if (event.data == "[DONE]") {
      evSource.close();
      return;
    } else {
        const data = JSON.parse(event.data);
        outputContainer.textContent += data.response ;
    }
  }
});