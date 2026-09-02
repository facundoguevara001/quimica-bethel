import bpy
from mathutils import Vector
from pathlib import Path

root = Path(r"C:\Users\facun\Desktop\QUIMICA - V3")
image_dir = root / "public" / "products" / "studio"
codes = [
    "CLO001", "DET001", "LVA001", "LVA002", "SUA001", "SUA002",
    "PFA002", "DES001", "DES002", "DES003", "DES004", "DES005",
]

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.filepath = str(image_dir / "studio-contact-sheet.png")
scene.world = bpy.data.worlds.new("Studio World")
scene.world.color = (0.012, 0.018, 0.032)

def material_for(image_path):
    image = bpy.data.images.load(str(image_path), check_existing=False)
    material = bpy.data.materials.new(image_path.stem)
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    nodes.clear()
    output = nodes.new('ShaderNodeOutputMaterial')
    emission = nodes.new('ShaderNodeEmission')
    texture = nodes.new('ShaderNodeTexImage')
    texture.image = image
    links.new(texture.outputs['Color'], emission.inputs['Color'])
    links.new(emission.outputs['Emission'], output.inputs['Surface'])
    return material, image.size[0] / image.size[1]

def image_plane(code, x, z):
    path = image_dir / f"{code}-studio.png"
    material, aspect = material_for(path)
    width = 2.3
    height = width / aspect
    y = 0
    vertices = [
        (x - width/2, y, z - height/2), (x + width/2, y, z - height/2),
        (x + width/2, y, z + height/2), (x - width/2, y, z + height/2),
    ]
    mesh = bpy.data.meshes.new(f"{code}_mesh")
    mesh.from_pydata(vertices, [], [(0, 1, 2, 3)])
    mesh.uv_layers.new(name='UVMap')
    for polygon in mesh.polygons:
        for loop_index, uv in zip(polygon.loop_indices, [(0,0), (1,0), (1,1), (0,1)]):
            mesh.uv_layers.active.data[loop_index].uv = uv
    obj = bpy.data.objects.new(code, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)

    bpy.ops.object.text_add(location=(x, -0.01, z - height/2 - 0.18), rotation=(1.5708, 0, 0))
    label = bpy.context.object
    label.data.body = code
    label.data.align_x = 'CENTER'
    label.data.size = 0.18
    label.data.extrude = 0.002
    label.data.materials.append(bpy.data.materials.new(f"{code}_label"))
    label.data.materials[0].diffuse_color = (0.05, 0.85, 0.55, 1)

for index, code in enumerate(codes):
    col, row = index % 4, index // 4
    image_plane(code, (col - 1.5) * 2.75, 3.2 - row * 3.1)

bpy.ops.object.camera_add(location=(0, -18, 0.2))
camera = bpy.context.object
camera.data.type = 'ORTHO'
camera.data.ortho_scale = 11.2
camera.rotation_euler = (1.5708, 0, 0)
scene.camera = camera

bpy.ops.wm.save_as_mainfile(filepath=str(image_dir / "product-studio-master.blend"))
bpy.ops.render.render(write_still=True)
print("Saved Blender master scene and contact sheet")
