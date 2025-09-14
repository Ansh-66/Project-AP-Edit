import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; 

export default function TabsSection() {
  const [active, setActive] = useState('twitter');
  const [news, setNews] = useState({ loading: false, items: [], error: null });
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (active === 'news' && !loaded) {
      loadNews();
    }

    if (active === 'twitter' && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [active, loaded]);

  function loadNews() {
    setNews({ loading: true, items: [], error: null });
    const rss = encodeURIComponent(
      'https://news.google.com/rss/search?q=Andhra+Pradesh+Police&hl=en-IN&gl=IN&ceid=IN:en'
    );
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rss}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.items) {
          setNews({
            loading: false,
            items: data.items.slice(0, 8),
            error: null,
          });
        } else {
          setNews({ loading: false, items: [], error: 'No recent news found.' });
        }
        setLoaded(true);
      })
      .catch(() =>
        setNews({
          loading: false,
          items: [],
          error: 'Failed to load news.',
        })
      );
  }

  return (
    <section
      id="news"
      className="section-scroll mt-6 mb-8 rounded-xl p-4 glass-card border border-white/6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-center border-b pb-3 text-slate-100 border-slate-700/40 mb-4">
        📰 Latest Updates
      </h3>

      <div className="flex items-center justify-between mb-4">
        <div className="w-8" />

        <div className="flex gap-8">
          <div className="relative group">
            <button
              onClick={() => {
                setActive('twitter');
                setCollapsed(false);
              }}
              className={`px-4 py-2 rounded-md ${
                active === 'twitter'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'bg-slate-800/40 text-slate-200'
              }`}
            >
              Twitter
            </button>
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs px-2 py-1 rounded bg-slate-900/90 text-white whitespace-nowrap
                         opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                         transition-all duration-200 ease-out z-50"
            >
              Click to see latest AP Police Tweets
            </span>
          </div>
          <div className="relative group">
            <button
              onClick={() => {
                setActive('news');
                setCollapsed(false);
              }}
              className={`px-4 py-2 rounded-md ${
                active === 'news'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'bg-slate-800/40 text-slate-200'
              }`}
            >
              News
            </button>
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs px-2 py-1 rounded bg-slate-900/90 text-white whitespace-nowrap
                         opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                         transition-all duration-200 ease-out z-50"
            >
              Click to see latest AP Police News
            </span>
          </div>
        </div>
        <div className="w-8 flex justify-end">
          <button
            onClick={() => setCollapsed(true)}
            className={`p-2 rounded-md bg-slate-800/40 text-slate-300 hover:text-white hover:bg-slate-700/50 transition ${
              collapsed ? 'invisible' : 'visible'
            }`}
            aria-label="Close feed"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-out overflow-hidden ${
          collapsed ? 'max-h-0' : 'max-h-[28rem]'
        }`}
        aria-hidden={collapsed}
      >
        {active === 'twitter' && (
          <div className="max-h-96 overflow-y-auto scrollbar-thin px-2">
            <div className="rounded-xl glass-card p-2 shadow-md border border-white/5">
              <a
                className="twitter-timeline"
                data-height="400"
                data-theme="dark"
                href="https://twitter.com/appolice100?ref_src=twsrc%5Etfw"
              >
                Tweets by appolice100
              </a>
            </div>
          </div>
        )}

        {active === 'news' && (
          <div className="news-feed max-h-96 overflow-y-auto scrollbar-thin">
            {news.loading && (
              <div className="p-4 text-slate-200">Loading...</div>
            )}
            {news.error && <div className="p-4 text-red-400">{news.error}</div>}
            {!news.loading &&
              news.items.map((it, i) => (
                <div
                  key={i}
                  className="border-b last:border-b-0 border-white/6 p-3"
                >
                  <a
                    href={it.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-slate-100 block"
                  >
                    {it.title}
                  </a>
                  <span className="text-sm text-slate-400">
                    {new Date(it.pubDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            {!news.loading && news.items.length === 0 && !news.error && (
              <div className="p-4 text-slate-200">No recent news found.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
