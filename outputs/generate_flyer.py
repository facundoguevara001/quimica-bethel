from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'outputs' / 'promos-pack-ofertas'
OUT.mkdir(parents=True, exist_ok=True)
ITEMS = [
    ('PROM001.png', 'PROMO 15 LITROS', '$34.520'),
    ('PROM002.png', 'PROMO 12 LITROS + 5 DE REGALO', '$14.280'),
    ('PROM003.png', 'PROMO 10 LITROS', '$16.530'),
    ('PROM004.jpg', 'PROMO 11 LITROS', '$11.280'),
    ('PROM005.jpg', 'PROMO 11 LITROS CON CIF', '$11.060'),
    ('PROM006.jpg', 'COMBO 12 LITROS ECONÓMICO', '$16.900'),
    ('PROM007.jpg', 'COMBO CIF + DETERGENTE', '$11.130'),
    ('PROM008.jpg', 'COMBO 12 LITROS CON GATILLO', '$15.400'),
]
NAVY = '#18283B'; RED = '#B9382B'; CREAM = '#F3EDE2'; PALE = '#E3E8EC'; WHITE = '#FFFFFF'; MUTED = '#536575'
FONT_DIR = Path(r'C:\Windows\Fonts')
REG = FONT_DIR / 'arial.ttf'; BOLD = FONT_DIR / 'arialbd.ttf'
if not REG.exists(): REG = Path(r'C:\Windows\Fonts\segoeui.ttf')
if not BOLD.exists(): BOLD = Path(r'C:\Windows\Fonts\segoeuib.ttf')

def font(size, bold=False): return ImageFont.truetype(str(BOLD if bold else REG), size)
def fit_crop(path, size):
    im = ImageOps.exif_transpose(Image.open(ROOT / 'public' / 'products' / path)).convert('RGB')
    im.thumbnail(size, Image.Resampling.LANCZOS)
    bg = Image.new('RGB', size, '#F6F4EF')
    bg.paste(im, ((size[0]-im.width)//2, (size[1]-im.height)//2))
    return bg
def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius, fill=fill, outline=outline, width=width)

def create_social():
    W,H=1080,1350
    im=Image.new('RGB',(W,H),NAVY); d=ImageDraw.Draw(im)
    # Header
    d.rectangle((0,0,W,14),fill=RED)
    # simple brand lockup
    rounded(d,(58,48,112,102),14,CREAM)
    d.text((85,74),'K',font=font(31,True),fill=NAVY,anchor='mm')
    d.text((130,50),'QUÍMICAS KING',font=font(23,True),fill=CREAM)
    d.text((130,80),'LIMPIEZA PARA TU HOGAR',font=font(12,True),fill='#BCC8D2')
    d.text((58,128),'PROMOS QUE',font=font(54,True),fill=CREAM)
    d.text((58,185),'RINDEN',font=font(66,True),fill=CREAM)
    rounded(d,(788,144,1020,224),16,RED)
    d.text((904,184),'PACKS + OFERTAS',font=font(19,True),fill=WHITE,anchor='mm')
    d.text((60,265),'Elegí tu combo y ahorrá en cada compra',font=font(23),fill='#D5DEE4')
    # 2x4 cards
    left=52; gapx=20; cardw=478; top=320; cardh=210; gapy=17
    for i,(photo,title,price) in enumerate(ITEMS):
        col=i%2; row=i//2; x=left+col*(cardw+gapx); y=top+row*(cardh+gapy)
        rounded(d,(x,y,x+cardw,y+cardh),18,'#F7F7F4')
        prod=fit_crop(photo,(158,170))
        mask=Image.new('L',prod.size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,*prod.size),12,fill=255)
        im.paste(prod,(x+13,y+18),mask)
        d=ImageDraw.Draw(im)
        # item title wraps to two lines
        words=title.split(); lines=[]; line=''
        for word in words:
            test=(line+' '+word).strip()
            if d.textbbox((0,0),test,font=font(18,True))[2] > 276 and line:
                lines.append(line); line=word
            else: line=test
        if line: lines.append(line)
        for n,t in enumerate(lines[:2]): d.text((x+188,y+26+n*25),t,font=font(18,True),fill=NAVY)
        d.text((x+188,y+93),'1 unidad',font=font(14),fill=MUTED)
        rounded(d,(x+184,y+125,x+447,y+184),11,RED)
        d.text((x+315,y+154),price,font=font(31,True),fill=WHITE,anchor='mm')
    # footer band
    fy=top+4*(cardh+gapy)+2
    d.rectangle((0,fy,W,H),fill=CREAM)
    d.text((58,fy+23),'PEDÍ LA TUYA',font=font(24,True),fill=NAVY)
    d.text((58,fy+58),'Encontrá todas las promos en Packs y Ofertas',font=font(19),fill=MUTED)
    d.text((1020,fy+43),'QUÍMICAS KING',font=font(17,True),fill=RED,anchor='ra')
    path=OUT/'promos-redes-1080x1350.png'; im.save(path,optimize=True); return path

def create_print():
    # A4 at 300 DPI, designed from the social artwork and scaled to page width.
    src=Image.open(create_social()).convert('RGB')
    # A4 portrait ratio, trim a little of the extra social height proportionally.
    target=(2480,3508)
    page=Image.new('RGB',target,CREAM)
    # social page is 4:5; fit whole content with navy side margins, keeping the full artwork.
    scale=min(target[0]/src.width,target[1]/src.height)
    resized=src.resize((int(src.width*scale),int(src.height*scale)),Image.Resampling.LANCZOS)
    page.paste(resized,((target[0]-resized.width)//2,(target[1]-resized.height)//2))
    png=OUT/'promos-imprimir-A4-300dpi.png'; page.save(png,dpi=(300,300),optimize=True)
    pdf=OUT/'promos-imprimir-A4.pdf'
    c=canvas.Canvas(str(pdf),pagesize=A4)
    w,h=A4; c.drawImage(ImageReader(page),0,0,width=w,height=h,preserveAspectRatio=False,mask='auto'); c.showPage(); c.save()
    return png,pdf

if __name__=='__main__':
    social=create_social(); png,pdf=create_print()
    print(social); print(png); print(pdf)
