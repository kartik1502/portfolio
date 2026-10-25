import contributions from "../../public/contributions.json";

function formatDate(value: string) {
  return value.slice(0, 10).replaceAll("-", ".");
}

export function OpenSourceSection() {
  const { totalMerged, projects, latest, updatedAt } = contributions;

  return (
    <section
      id="open-source"
      aria-label="Open source contributions"
      className="px-4 md:px-8 py-20 md:py-24 border-t border-border"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-6 mb-12">
        <div className="col-span-4 md:col-span-3">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Open_Source.log
          </h2>
          <p className="mt-2 text-[10px] font-display text-muted-foreground/70 uppercase tracking-widest">
            Synced weekly · {formatDate(updatedAt)}
          </p>
        </div>
        <p className="col-span-4 md:col-span-9 max-w-[62ch] text-sm text-muted-foreground">
          Merged pull requests to open-source projects outside my own repositories — developer
          tooling, product code, and the platforms I contribute to.{" "}
          <a
            href="https://github.com/kartik1502"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            GitHub profile ↗
          </a>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 gap-px bg-border border border-border mb-10">
        <div className="md:col-span-6 bg-background p-6 md:p-8">
          <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
            Total merged
          </div>
          <div className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter text-primary">
            {String(totalMerged).padStart(2, "0")}
          </div>
          <div className="mt-2 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
            external pull requests
          </div>
        </div>
        <div className="md:col-span-6 bg-background p-6 md:p-8">
          <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
            Projects
          </div>
          <div className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter text-primary">
            {String(projects).padStart(2, "0")}
          </div>
          <div className="mt-2 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
            repositories contributed to
          </div>
        </div>
      </div>

      <div className="border border-border">
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>latest_contributions.log</span>
          <span className="text-primary">
            Last {String(latest.length).padStart(2, "0")}
          </span>
        </div>
        <ol className="divide-y divide-border">
          {latest.map((contribution, index) => (
            <li key={contribution.url}>
              <a
                href={contribution.url}
                target="_blank"
                rel="noreferrer"
                className="group block px-4 py-5 hover:bg-primary/5 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{formatDate(contribution.mergedAt)}</span>
                  <span className="normal-case tracking-normal text-foreground/80 break-words">
                    {contribution.repo}
                    <span className="text-muted-foreground"> #{contribution.number}</span>
                  </span>
                  <span className="ml-auto text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
                <div className="mt-2 text-sm md:text-base text-foreground/90 leading-relaxed group-hover:text-primary transition-colors">
                  {contribution.title}
                </div>
              </a>
            </li>
          ))}
          {latest.length === 0 && (
            <li className="px-4 py-8 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
              No merged contributions found.
            </li>
          )}
        </ol>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-display text-[9px] uppercase tracking-widest text-muted-foreground/70">
        <span>Scope: merged pull requests to repositories I do not own.</span>
        <span>Source: GitHub Search API · synced weekly</span>
      </div>
    </section>
  );
}
