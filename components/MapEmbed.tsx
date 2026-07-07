import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

/**
 * Keyless Google Maps embed. loading="lazy" keeps it off the critical
 * path (good LCP/INP); fixed aspect ratio in CSS prevents layout shift.
 */
export function MapEmbed({ dict }: { dict: Dictionary }) {
  return (
    <div className="mapFrameWrap">
      <iframe
        className="mapFrame"
        src={site.mapEmbedSrc}
        title={dict.map.iframeTitle}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a className="mapLink" href={site.mapLinkHref} target="_blank" rel="noopener noreferrer">
        {dict.map.openInMaps} ↗
      </a>
    </div>
  );
}
