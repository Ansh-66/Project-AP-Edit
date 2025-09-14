import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function TabsSection() {
  const [active, setActive] = useState("twitter");
  const [news, setNews] = useState({ loading: false, items: [], error: null });
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Load Elfsight script once for Twitter widget
  useEffect(() => {
    if (active === "twitter") {
      if (!document.querySelector("script[src='https://elfsightcdn.com/platform.js']")) {
        const script = document.createElement("script");
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [active]);

  // Load News once
  useEffect(() => {
    if (active === "news" && !loaded) {
      loadNews();
    }
  }, [active, loaded]);

  function loadNews() {
    setNews({ loading: true, items: [], error: null });
    const rss = encodeURIComponent(
      "https://news.google.com/rss/search?q=Andhra+Pradesh+Police&hl=en-IN&gl=IN&ceid=IN:en"
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
          setNews({ loading: false, items: [], error: "No recent news found." });
        }
        setLoaded(true);
      })
      .catch(() =>
        setNews({
          loading: false,
          items: [],
          error: "Failed to load news.",
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

      {/* Buttons */}
      <div className="flex justify-center gap-8 mb-4">
        <button
          onClick={() => {
            setActive("twitter");
            setCollapsed(false);
          }}
          className={`px-4 py-2 rounded-md ${
            active === "twitter"
              ? "bg-gradient-to-r from-primary to-accent text-white"
              : "bg-slate-800/40 text-slate-200"
          }`}
        >
          Twitter
        </button>

        <button
          onClick={() => {
            setActive("news");
            setCollapsed(false);
          }}
          className={`px-4 py-2 rounded-md ${
            active === "news"
              ? "bg-gradient-to-r from-primary to-accent text-white"
              : "bg-slate-800/40 text-slate-200"
          }`}
        >
          News
        </button>
      </div>

      {/* Collapsible section */}
      {!collapsed && (
        <div className="relative min-h-[400px] mt-2">
          <button
            onClick={() => setCollapsed(true)}
            className="absolute top-2 right-2 p-2 rounded-md bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/70 transition z-50"
          >
            <X size={18} />
          </button>

          {/* ✅ Twitter Feed via Elfsight */}
          {active === "twitter" && (
            <div className="rounded-xl glass-card p-2 shadow-md border border-white/5 h-full">
              <div
                className="elfsight-app-2c4e5856-69f5-4aab-933b-f3aba6b64a9b"
                data-elfsight-app-lazy
              ></div>
            </div>
          )}

          {/* ✅ News Feed via Google RSS */}
          {active === "news" && (
            <div className="news-feed max-h-96 overflow-y-auto scrollbar-thin">
              {news.loading && (
                <div className="p-4 text-slate-200">Loading...</div>
              )}
              {news.error && (
                <div className="p-4 text-red-400">{news.error}</div>
              )}
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
      )}
    </section>
  );
}
