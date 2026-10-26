import type { Notification } from "@/types";

function roleLabel(role: Notification["role"]) {
  return role === "wali_kelas" ? "Wali Kelas" : "Siswa";
}

export default function Pengumuman({
  notifications,
  className,
}: {
  notifications: Notification[];
  className?: string;
}) {
  if (!notifications.length) return null;

  return (
    <section
      id="pengumuman"
      className={className}
      aria-labelledby="pengumuman-title"
    >
      <div className="section-head">
        <div>
          <h2 id="pengumuman-title">Papan pengumuman</h2>
          <p>Catatan terbaru dari wali kelas.</p>
        </div>
        <span className="section-side">{notifications.length} catatan</span>
      </div>

      <div className="board-panel">
        <div className="note-stack">
          {notifications.slice(0, 3).map((n, index) => {
            const initials = n.author.slice(0, 2).toUpperCase();

            return (
              <div className="note-wrap" key={n.id}>
                <article className="note">
                  <span className="note-tape" aria-hidden="true" />
                  {index === 0 && (
                    <span className="note-seal" aria-hidden="true">
                      11
                    </span>
                  )}
                  <p className="note-date">{n.date}</p>
                  <h3>{n.title}</h3>
                  <p className="note-body">{n.body}</p>
                  <div className="note-foot">
                    <span className="avatar">{initials}</span>
                    <span>
                      {n.author} · {roleLabel(n.role)}
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
