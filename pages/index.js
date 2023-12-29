import React from 'react'
import { useState } from 'react';

export default function BrahmsMusicSearch() {
  const [searchResults, setSearchResults] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = BrahmsMusicSearch(event.target);
    const query = formData.get("query");
    const matches = await search(query);
    setSearchResults(matches);
  }
  const BrahmsMusicSearch = () => {
    fetch("/api/brahms.json")
      .then((res) => res.json())
      .then((json) => console.log(json));

    const matchworks = works.filter(work => {
      return work.title.toLowerCase().includes(query.toLowerCase()) ||
        work.genre.toLowerCase().includes(query.toLowerCase());
    });

    return matchworks;
  }

  return (
    <div className='BrahmsMUsicSearch'>
      <h1>Brahms Works Search</h1>

      <form onSubmit={handleFormSubmit}>
        <input name="query" />
        <button type="submit">Search</button>
        <p>ジャンルで検索できるよ！</p>
        <ul>
          <li>ピアノ</li>
          <li>歌曲</li>
          <li>室内楽</li>
          <li>オーケストラ</li>
        </ul>
        <p>のいずれかを検索ボックスに入力してみてね♪</p>
      </form>

      <div id="search_result">
        {searchResults.map((work, index) => (
          <div key={index}>
            <br />
            <div>曲名 : {work.title}</div>
            <div>おすすめ度 : {work.recommended}</div>
            <div>こんな時にオススメ : {work.emotions}</div>
            <div>ジャンル : {work.genre}</div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}