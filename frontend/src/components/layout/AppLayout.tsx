import { useState, useCallback, useRef, type ReactNode } from "react";

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newWidth = Math.min(Math.max(e.clientX, 180), 600);
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950 text-white">
      <aside
        className="flex shrink-0 flex-col border-r border-gray-800 bg-gray-900"
        style={{ width: sidebarWidth }}
      >
        <div className="flex items-center border-b border-gray-800 px-4 py-3">
          <h1 className="font-mono text-sm font-bold tracking-wider text-green-400">
            cmux
          </h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-3">
          {sidebar}
        </div>
      </aside>

      <div
        onMouseDown={handleMouseDown}
        className="w-1 shrink-0 cursor-col-resize bg-gray-800 hover:bg-green-500 transition-colors"
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="relative flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
