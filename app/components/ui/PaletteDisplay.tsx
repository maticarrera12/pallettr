import React from "react";
import { ColorPalette } from "../../utils/colorUtils";

/**
 * Component to display the generated color palette
 * Shows color swatches with hex codes and allows copying
 */

interface PaletteDisplayProps {
  palette: ColorPalette | null;
  onColorClick?: (color: string) => void;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({
  palette,
  onColorClick,
}) => {
  if (!palette) return null;

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  const ColorSwatch: React.FC<{
    color: string;
    label: string;
    onClick?: () => void;
  }> = ({ color, label, onClick }) => (
    <div
      className="flex flex-col items-center space-y-2 cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="w-16 h-16 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 
                   transition-transform duration-200 hover:scale-110 hover:shadow-xl"
        style={{ backgroundColor: color }}
        title={`Click to copy ${color}`}
      />
      <span className="text-xs font-mono text-theme opacity-80 group-hover:opacity-100 transition-opacity">
        {color}
      </span>
      <span className="text-xs text-theme opacity-60 text-center">{label}</span>
    </div>
  );

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-lg border border-card-dark dark:border-card-light">
      <h3 className="text-xl font-bold text-theme mb-4 text-center">
        Generated Palette
      </h3>

      <div className="space-y-6">
        {/* Primary Colors */}
        <div>
          <h4 className="text-sm font-semibold text-theme opacity-80 mb-3 uppercase tracking-wide">
            Primary Colors
          </h4>
          <div className="flex justify-center space-x-4">
            <ColorSwatch
              color={palette.primary.base}
              label="Base"
              onClick={() => copyToClipboard(palette.primary.base)}
            />
            <ColorSwatch
              color={palette.primary.hover}
              label="Hover"
              onClick={() => copyToClipboard(palette.primary.hover)}
            />
            <ColorSwatch
              color={palette.primary.active}
              label="Active"
              onClick={() => copyToClipboard(palette.primary.active)}
            />
          </div>
        </div>

        {/* Secondary Colors */}
        <div>
          <h4 className="text-sm font-semibold text-theme opacity-80 mb-3 uppercase tracking-wide">
            Secondary Colors
          </h4>
          <div className="flex justify-center space-x-4">
            <ColorSwatch
              color={palette.secondary.base}
              label="Base"
              onClick={() => copyToClipboard(palette.secondary.base)}
            />
            <ColorSwatch
              color={palette.secondary.hover}
              label="Hover"
              onClick={() => copyToClipboard(palette.secondary.hover)}
            />
            <ColorSwatch
              color={palette.secondary.active}
              label="Active"
              onClick={() => copyToClipboard(palette.secondary.active)}
            />
          </div>
        </div>

        {/* Tertiary Colors */}
        <div>
          <h4 className="text-sm font-semibold text-theme opacity-80 mb-3 uppercase tracking-wide">
            Tertiary Colors
          </h4>
          <div className="flex justify-center space-x-4">
            <ColorSwatch
              color={palette.tertiary.base}
              label="Base"
              onClick={() => copyToClipboard(palette.tertiary.base)}
            />
            <ColorSwatch
              color={palette.tertiary.hover}
              label="Hover"
              onClick={() => copyToClipboard(palette.tertiary.hover)}
            />
            <ColorSwatch
              color={palette.tertiary.active}
              label="Active"
              onClick={() => copyToClipboard(palette.tertiary.active)}
            />
          </div>
        </div>

        {/* Background & Card Colors */}
        <div>
          <h4 className="text-sm font-semibold text-theme opacity-80 mb-3 uppercase tracking-wide">
            Background & Cards
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <ColorSwatch
              color={palette.background.light}
              label="Light BG"
              onClick={() => copyToClipboard(palette.background.light)}
            />
            <ColorSwatch
              color={palette.background.dark}
              label="Dark BG"
              onClick={() => copyToClipboard(palette.background.dark)}
            />
            <ColorSwatch
              color={palette.card.light}
              label="Light Card"
              onClick={() => copyToClipboard(palette.card.light)}
            />
            <ColorSwatch
              color={palette.card.dark}
              label="Dark Card"
              onClick={() => copyToClipboard(palette.card.dark)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteDisplay;
