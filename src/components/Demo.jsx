import { useState, useEffect } from "react";
import { linkIcon, copy, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

let copyTimeout;
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState(false);

  const localSavedArticles = localStorage.getItem("articles");
  useEffect(() => {
    if (localSavedArticles) {
      setAllArticles(JSON.parse(localSavedArticles));
    }
  }, []);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const getDomainName = (url) =>
    new URL(url).hostname.replace("www.", "").split(".")[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setArticle({ ...article, summary: "" });
    const alreadySummarized = allArticles
      .map((article) => article.url)
      .includes(article.url.replace("www.", ""));
    if (!alreadySummarized) {
      const { data } = await getSummary({
        articleUrl: article.url,
      });
      const newArticle = {
        url: article.url.replace("www.", ""),
        summary: data.summary,
      };
      const newAllArticles = [...allArticles, newArticle];
      setArticle(newArticle);
      setAllArticles(newAllArticles);
      localStorage.setItem("articles", JSON.stringify(newAllArticles));
    } else if (alreadySummarized) {
      setArticle(allArticles.find((a) => a.url === article.url));
    }
  };
  const handleCopy = (url) => {
    clearTimeout(copyTimeout);
    setCopied(url);
    navigator.clipboard.writeText(url);
    copyTimeout = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className='w-full max-w-xl my-16 '>
      <div className='w-full flex flex-col gap-2'>
        {/*Search*/}
        <form
          className='relative flex flex-row items-center justify-center'
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} alt='icon' className='absolute left-3  w-5' />
          <input
            type='url'
            className='url_input peer'
            placeholder='Paste the link here'
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            value={article.url}
            required
          />
          <button
            type='submit'
            className='submit-btn absolute text-slate-500 peer-focus:text-black peer-valid:text-blue-500 h-full px-5 right-0'
          >
            ↵
          </button>
        </form>
        {/*Browsing history*/}
        <div className=' flex flex-col gap-1 max-h-80 overflow-y-auto mb-8'>
          {allArticles
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={`link-${index}`}
                className='link_card'
                onClick={() => {
                  setArticle(item);
                }}
              >
                <img
                  src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${item.url}&sz=128`}
                  alt='thumbnail'
                  className='w-8 h-8 rounded-full'
                />
                <div className='flex flex-col'>
                  <h2 className=' font-semibold text-blue-800'>
                    {getDomainName(item.url)}
                  </h2>
                  <h3 className=' text-slate-600 text-xs text-ellipsis overflow-hidden max-w-[150px] xs:max-w-[250px] sm:max-w-sm whitespace-nowrap'>
                    {item.url}
                  </h3>
                </div>
                <div
                  className='copy_btn'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(item.url);
                  }}
                >
                  {copied === item.url ? (
                    <img
                      src={tick}
                      alt='tick_icon'
                      className=' animate-popup'
                    />
                  ) : (
                    <img src={copy} alt='copy_icon' />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      {/*Summary Result*/}
      {isFetching ? (
        <img
          src={loader}
          alt='Loading...'
          className='w-full h-28 object-contain'
        />
      ) : article.summary ? (
        <div className=' flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>
            Article <span className='text-blue-500'>Summary</span>
          </h2>
          <p className='summary_box text-sm text-slate-700 font-medium font-inter max-h-96 overflow-y-auto'>
            {article.summary}
          </p>
        </div>
      ) : (
        error && (
          <div className='text-center'>
            <h2 className='font-semibold text-lg'>
              Well, that wasn't supposed to happen...
            </h2>
            <h3 className='text-slate-700'>{error?.data?.error}</h3>
          </div>
        )
      )}
    </section>
  );
};

export default Demo;
