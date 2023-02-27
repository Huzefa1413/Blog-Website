import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Articles from '../components/Articles';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import Notfound from './Notfound';

const Article = () => {
  const { name } = useParams();

  const [articleInfo, setArticleInfo] = useState({ comments: [] });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();

    const fetchData2 = async () => {
      const result = await fetch('/api/articles');
      const body = await result.json();
      setArticles(body);
    };
    fetchData2();
  }, [name]);

  if (!articleInfo) {
    return <Notfound />;
  }
  const otherArticles = articles.filter((article) => article.name !== name);

  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {articleInfo?.title}
      </h1>
      {articleInfo?.content?.map((paragraph, index) => (
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
          {paragraph}
        </p>
      ))}
      <CommentsList comments={articleInfo?.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
        Other Articles
      </h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles} />
      </div>
    </>
  );
};

export default Article;
