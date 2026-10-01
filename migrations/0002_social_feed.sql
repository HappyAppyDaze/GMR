CREATE TABLE IF NOT EXISTS social_posts (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  permalink TEXT NOT NULL,
  caption TEXT,
  media_type TEXT,
  media_url TEXT,
  thumbnail_url TEXT,
  posted_at TEXT,
  fetched_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_social_posts_posted_at ON social_posts(posted_at DESC);
CREATE TABLE IF NOT EXISTS social_state (
  source TEXT PRIMARY KEY,
  account_name TEXT,
  last_attempt_at TEXT,
  last_success_at TEXT,
  last_error TEXT,
  post_count INTEGER NOT NULL DEFAULT 0
);
