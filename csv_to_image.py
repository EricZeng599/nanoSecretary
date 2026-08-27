import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
from PIL import Image, ImageDraw, ImageFont
import sys
import os

matplotlib.use('Agg')

def csv_to_image(input_csv, output_image=None, dpi=300, font_size=16):
    try:
        df = pd.read_csv(input_csv, encoding='utf-8')
    except:
        try:
            df = pd.read_csv(input_csv, encoding='utf-8-sig')
        except:
            df = pd.read_csv(input_csv, encoding='gbk')

    if output_image is None:
        output_image = os.path.splitext(input_csv)[0] + '.png'

    num_rows, num_cols = df.shape
    cell_padding = 20
    header_height = 60
    row_height = 45

    col_widths = []
    for col in df.columns:
        max_len = len(str(col))
        for val in df[col].astype(str):
            max_len = max(max_len, len(val))
        col_widths.append(max_len * font_size * 0.7 + cell_padding * 2)

    total_width = sum(col_widths) + cell_padding * 2
    total_height = header_height + (num_rows * row_height) + cell_padding * 2

    img = Image.new('RGB', (int(total_width), int(total_height)), color='white')
    draw = ImageDraw.Draw(img)

    font_paths = [
        "simhei.ttf",
        "msyh.ttc",
        "simkai.ttf",
        "simfang.ttf",
        "simsun.ttc",
        "arial.ttf"
    ]
    
    system_font_dirs = [
        "C:\\Windows\\Fonts\\",
        "/Library/Fonts/",
        "/usr/share/fonts/",
        "~/.fonts/"
    ]
    
    font = None
    for font_name in font_paths:
        for font_dir in system_font_dirs:
            font_path = os.path.join(font_dir, font_name)
            font_path = os.path.expanduser(font_path)
            if os.path.exists(font_path):
                try:
                    font = ImageFont.truetype(font_path, font_size)
                    header_font = ImageFont.truetype(font_path, font_size + 2)
                    break
                except:
                    continue
        if font is not None:
            break
    
    if font is None:
        font = ImageFont.load_default()
        header_font = font

    draw.rectangle([0, 0, int(total_width) - 1, int(total_height) - 1], outline='black', width=2)

    x_offset = cell_padding
    y_offset = cell_padding
    for i, col_name in enumerate(df.columns):
        col_end = x_offset + col_widths[i]
        draw.rectangle([x_offset, y_offset, col_end, y_offset + header_height], fill='#4A90E2', outline='black')
        text_bbox = draw.textbbox((0, 0), str(col_name), font=header_font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        text_x = x_offset + (col_widths[i] - text_width) / 2
        text_y = y_offset + (header_height - text_height) / 2
        draw.text((text_x, text_y), str(col_name), fill='white', font=header_font)
        draw.line([x_offset, y_offset, x_offset, y_offset + header_height], fill='black', width=1)
        draw.line([col_end, y_offset, col_end, y_offset + header_height], fill='black', width=1)
        x_offset = col_end

    draw.line([cell_padding, y_offset + header_height, int(total_width) - cell_padding, y_offset + header_height], fill='black', width=2)

    y_offset += header_height
    for row_idx in range(num_rows):
        x_offset = cell_padding
        row_fill = '#F5F5F5' if row_idx % 2 == 0 else 'white'
        draw.rectangle([cell_padding, y_offset, int(total_width) - cell_padding, y_offset + row_height], fill=row_fill)
        for col_idx in range(num_cols):
            col_end = x_offset + col_widths[col_idx]
            cell_value = str(df.iloc[row_idx, col_idx])
            text_bbox = draw.textbbox((0, 0), cell_value, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_x = x_offset + (col_widths[col_idx] - text_width) / 2
            text_y = y_offset + (row_height - (text_bbox[3] - text_bbox[1])) / 2
            draw.text((text_x, text_y), cell_value, fill='black', font=font)
            draw.line([x_offset, y_offset, x_offset, y_offset + row_height], fill='#DDDDDD', width=1)
            x_offset = col_end
        draw.line([cell_padding, y_offset + row_height, int(total_width) - cell_padding, y_offset + row_height], fill='#DDDDDD', width=1)
        y_offset += row_height

    img.save(output_image, dpi=(dpi, dpi), quality=95)
    print(f"图片已保存至: {output_image}")
    print(f"图片尺寸: {int(total_width)} x {int(total_height)} 像素")
    return output_image

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python csv_to_image.py <input.csv> [output.png]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    if not os.path.exists(input_file):
        print(f"错误: 文件 '{input_file}' 不存在")
        sys.exit(1)

    csv_to_image(input_file, output_file)