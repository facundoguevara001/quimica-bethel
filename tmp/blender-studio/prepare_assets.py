import bpy
from pathlib import Path

root = Path(r"C:\Users\facun\Desktop\QUIMICA - V3\tmp\blender-studio")
source_dir = root / "sources"
out_dir = root / "blender-converted"
out_dir.mkdir(parents=True, exist_ok=True)

for source in source_dir.iterdir():
    if source.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
        continue
    try:
        image = bpy.data.images.load(str(source), check_existing=False)
        image.filepath_raw = str(out_dir / f"{source.stem}.png")
        image.file_format = "PNG"
        image.save()
        bpy.data.images.remove(image)
    except RuntimeError as exc:
        print(f"Skipped {source.name}: {exc}")

print("Converted source assets with Blender")
