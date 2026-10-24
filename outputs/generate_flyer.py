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

def create_combo_social():
    W,H=1080,1350
    im=Image.new('RGB',(W,H),NAVY); d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,14),fill=RED)
    rounded(d,(58,42,108,92),13,CREAM)
    d.text((83,67),'K',font=font(29,True),fill=NAVY,anchor='mm')
    d.text((126,45),'QUÍMICAS KING',font=font(22,True),fill=CREAM)
    d.text((126,72),'LIMPIEZA PARA TU HOGAR',font=font(12,True),fill='#BCC8D2')
    d.text((58,132),'COMBO',font=font(56,True),fill=CREAM)
    d.text((58,194),'12 LITROS',font=font(59,True),fill=CREAM)
    d.text((61,268),'CON GATILLO',font=font(27,True),fill='#E5998C')
    rounded(d,(60,323,350,407),15,RED)
    d.text((205,365),'$15.400',font=font(43,True),fill=WHITE,anchor='mm')
    # product hero
    hero=fit_crop('PROM008.jpg',(405,440))
    mask=Image.new('L',hero.size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,*hero.size),20,fill=255)
    im.paste(hero,(600,110),mask)
    d=ImageDraw.Draw(im)
    rounded(d,(619,469,985,519),12,CREAM)
    d.text((802,494),'5 + 5 + 1 + 1 LITROS',font=font(19,True),fill=NAVY,anchor='mm')
    # content panel
    top=555
    rounded(d,(48,top,1032,1193),22,'#F7F7F4')
    d.text((82,top+29),'¿QUÉ TRAE?',font=font(27,True),fill=NAVY)
    rows=[
        ('5 L','DESODORANTE 1056','El más elegido por nuestros clientes'),
        ('5 L','LAVANDINA',''),
        ('1 L','LIMPIADOR MULTIUSOS CIF CREMA','Con envase a gatillo'),
        ('1 L','DETERGENTE PARA TODOS LOS USOS','Con envase a gatillo de resorte'),
    ]
    y=top+84
    for idx,(qty,name,desc) in enumerate(rows):
        yy=y+idx*127
        rounded(d,(78,yy,1002,yy+108),14,WHITE,outline='#D8DEE2',width=2)
        rounded(d,(94,yy+20,183,yy+87),12,NAVY)
        d.text((138,yy+53),qty,font=font(24,True),fill=CREAM,anchor='mm')
        d.text((207,yy+21),name,font=font(20,True),fill=NAVY)
        if desc:
            d.text((207,yy+58),desc,font=font(17),fill=MUTED)
            if idx==0:
                # customer favorite seal
                rounded(d,(718,yy+57,976,yy+91),10,'#F8E8E2')
                d.text((847,yy+74),'EL MÁS ELEGIDO',font=font(13,True),fill=RED,anchor='mm')
    d.rectangle((0,1220,W,H),fill=RED)
    d.text((58,1255),'TODO LO QUE NECESITÁS, EN UN SOLO COMBO',font=font(20,True),fill=WHITE)
    d.text((58,1290),'Químicas King  ·  Packs y ofertas',font=font(16),fill=WHITE)
    path=OUT/'combo-12-litros-con-gatillo-redes-1080x1350.png'
    im.save(path,optimize=True); return path

def create_combo_print():
    src=Image.open(create_combo_social()).convert('RGB')
    target=(2480,3508)
    page=Image.new('RGB',target,CREAM)
    scale=min(target[0]/src.width,target[1]/src.height)
    resized=src.resize((int(src.width*scale),int(src.height*scale)),Image.Resampling.LANCZOS)
    page.paste(resized,((target[0]-resized.width)//2,(target[1]-resized.height)//2))
    png=OUT/'combo-12-litros-con-gatillo-imprimir-A4-300dpi.png'; page.save(png,dpi=(300,300),optimize=True)
    pdf=OUT/'combo-12-litros-con-gatillo-imprimir-A4.pdf'
    c=canvas.Canvas(str(pdf),pagesize=A4); w,h=A4
    c.drawImage(ImageReader(page),0,0,width=w,height=h,preserveAspectRatio=False,mask='auto'); c.showPage(); c.save()
    return png,pdf

def create_combo_mobile():
    # Tall 9:16 mobile creative: large type, generous spacing, concise product details.
    W,H=1080,1920
    im=Image.new('RGB',(W,H),CREAM); d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,18),fill=RED)
    # Brand and headline
    rounded(d,(56,48,116,108),16,NAVY)
    d.text((86,78),'K',font=font(35,True),fill=CREAM,anchor='mm')
    d.text((138,51),'QUÍMICAS KING',font=font(25,True),fill=NAVY)
    d.text((139,83),'LIMPIEZA PARA TU HOGAR',font=font(13,True),fill=MUTED)
    rounded(d,(58,145,350,192),13,'#F5D8D1')
    d.text((204,169),'PACK ESPECIAL',font=font(17,True),fill=RED,anchor='mm')
    d.text((56,220),'EL COMBO QUE',font=font(57,True),fill=NAVY)
    d.text((56,281),'TE RESUELVE TODO',font=font(57,True),fill=NAVY)
    d.text((60,351),'12 litros para dejar tu casa impecable',font=font(23),fill=MUTED)
    # Hero panel and authentic product photograph
    rounded(d,(50,410,1030,1000),28,NAVY)
    photo=fit_crop('PROM008.jpg',(540,540))
    mask=Image.new('L',photo.size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,*photo.size),20,fill=255)
    im.paste(photo,(270,430),mask)
    d=ImageDraw.Draw(im)
    # small overlaid volume chip and price block
    rounded(d,(75,447,293,503),16,CREAM)
    d.text((184,475),'5 + 5 + 1 + 1 L',font=font(19,True),fill=NAVY,anchor='mm')
    rounded(d,(611,828,1003,960),23,RED)
    d.text((651,850),'PRECIO PROMO',font=font(15,True),fill='#F8D9D1')
    d.text((651,886),'$15.400',font=font(45,True),fill=WHITE)
    # Content list
    d.text((60,1040),'¿QUÉ INCLUYE?',font=font(30,True),fill=NAVY)
    d.rectangle((60,1085,1020,1089),fill='#D3D9DD')
    entries=[
        ('5 L','DESODORANTE 1056','El más elegido por nuestros clientes'),
        ('5 L','LAVANDINA',''),
        ('1 L','CIF CREMA MULTIUSOS','Limpiador · envase a gatillo'),
        ('1 L','DETERGENTE','Para todos los usos · gatillo de resorte'),
    ]
    y=1110
    for i,(vol,title,sub) in enumerate(entries):
        yy=y+i*139
        rounded(d,(56,yy,1024,yy+121),17,WHITE,outline='#D7DEE3',width=2)
        rounded(d,(75,yy+23,177,yy+98),16,NAVY)
        d.text((126,yy+61),vol,font=font(25,True),fill=CREAM,anchor='mm')
        d.text((204,yy+23),title,font=font(22,True),fill=NAVY)
        if sub:
            d.text((204,yy+62),sub,font=font(17),fill=MUTED)
        if i==0:
            rounded(d,(727,yy+68,987,yy+102),10,'#F5D8D1')
            d.text((857,yy+85),'FAVORITO',font=font(13,True),fill=RED,anchor='mm')
    # Compact brand footer
    d.rectangle((0,1700,W,H),fill=NAVY)
    d.rectangle((0,1700,W,1710),fill=RED)
    d.text((58,1750),'TODO EN UN SOLO COMBO.',font=font(29,True),fill=CREAM)
    d.text((60,1801),'Pedilo hoy en Químicas King',font=font(23),fill='#D5DEE4')
    rounded(d,(60,1850,1020,1901),13,RED)
    d.text((540,1876),'PACKS Y OFERTAS',font=font(18,True),fill=WHITE,anchor='mm')
    path=OUT/'combo-12-litros-gatillo-celular-1080x1920.png'
    im.save(path,optimize=True); return path

def create_screw_mobile():
    W,H=1080,1920
    im=Image.new('RGB',(W,H),CREAM); d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,18),fill=RED)
    rounded(d,(56,48,116,108),16,NAVY)
    d.text((86,78),'K',font=font(35,True),fill=CREAM,anchor='mm')
    d.text((138,51),'QUÍMICAS KING',font=font(25,True),fill=NAVY)
    d.text((139,83),'LIMPIEZA PARA TU HOGAR',font=font(13,True),fill=MUTED)
    rounded(d,(58,145,405,192),13,'#F5D8D1')
    d.text((231,169),'PRESENTACIÓN A ROSCA',font=font(16,True),fill=RED,anchor='mm')
    d.text((56,220),'COMBO 12 LITROS',font=font(58,True),fill=NAVY)
    d.text((60,294),'Los mismos productos, en envases a rosca',font=font(22),fill=MUTED)
    rounded(d,(50,365,1030,955),28,NAVY)
    photo=fit_crop('PROM006.jpg',(540,540))
    mask=Image.new('L',photo.size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,*photo.size),20,fill=255)
    im.paste(photo,(270,385),mask)
    d=ImageDraw.Draw(im)
    rounded(d,(75,402,293,458),16,CREAM)
    d.text((184,430),'5 + 5 + 1 + 1 L',font=font(19,True),fill=NAVY,anchor='mm')
    rounded(d,(611,783,1003,915),23,RED)
    d.text((651,805),'PRECIO PROMO',font=font(15,True),fill='#F8D9D1')
    d.text((651,841),'$16.900',font=font(45,True),fill=WHITE)
    d.text((60,995),'¿QUÉ INCLUYE?',font=font(30,True),fill=NAVY)
    d.rectangle((60,1040,1020,1044),fill='#D3D9DD')
    entries=[
        ('5 L','DESODORANTE 1056','El más elegido por nuestros clientes'),
        ('5 L','LAVANDINA',''),
        ('1 L','CIF CREMA MULTIUSOS','Limpiador · tapa a rosca'),
        ('1 L','DETERGENTE','Para todos los usos · tapa a rosca'),
    ]
    y=1065
    for i,(vol,title,sub) in enumerate(entries):
        yy=y+i*139
        rounded(d,(56,yy,1024,yy+121),17,WHITE,outline='#D7DEE3',width=2)
        rounded(d,(75,yy+23,177,yy+98),16,NAVY)
        d.text((126,yy+61),vol,font=font(25,True),fill=CREAM,anchor='mm')
        d.text((204,yy+23),title,font=font(22,True),fill=NAVY)
        if sub: d.text((204,yy+62),sub,font=font(17),fill=MUTED)
        if i==0:
            rounded(d,(727,yy+68,987,yy+102),10,'#F5D8D1')
            d.text((857,yy+85),'FAVORITO',font=font(13,True),fill=RED,anchor='mm')
    d.rectangle((0,1655,W,H),fill=NAVY)
    d.rectangle((0,1655,W,1665),fill=RED)
    d.text((58,1705),'TODO EN UN SOLO COMBO.',font=font(29,True),fill=CREAM)
    d.text((60,1756),'Pedilo hoy en Químicas King',font=font(23),fill='#D5DEE4')
    rounded(d,(60,1805,1020,1856),13,RED)
    d.text((540,1831),'PACKS Y OFERTAS',font=font(18,True),fill=WHITE,anchor='mm')
    path=OUT/'combo-12-litros-rosca-celular-1080x1920.png'
    im.save(path,optimize=True); return path

if __name__=='__main__':
    print(create_screw_mobile())
