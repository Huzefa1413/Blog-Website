import React, { useState, useEffect } from 'react';
import Articles from '../components/Articles';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/articles');
      const body = await result.json();
      setArticles(body);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        Articles
      </h1>
      <div className="container py-4 max-auto">
        <div className="flex flex-wrap -m-4">
          <Articles articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
