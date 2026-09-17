export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-paper/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-bold tracking-tight text-paper">
            MAR<span className="text-marquee">QUEE</span>
          </p>
          <p className="mt-1 text-xs text-fog">
            &copy; {year} Marquee Movie Explorer. Show data courtesy of TVMaze.
          </p>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-fog transition-colors hover:text-marquee"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
