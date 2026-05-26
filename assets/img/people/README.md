# Headshots — DS4CABS people

Drop mentor / intern / leadership headshots in this folder. The site reads
filenames referenced from `assets/js/projects.js` (the `headshot:` field on
each person entry).

## Filename convention

- Lowercase, kebab-case: `firstname-lastname.jpg`
  - `jane-doe.jpg`
  - `reuben-addison.jpg`
  - For names with diacritics, drop the diacritics: `francois` not `françois`.
- One-name entries: just the given name: `shucheng.jpg`.
- If two people share a first name, disambiguate with last initial:
  `kening-l.jpg`.

## Image specs

- **Aspect ratio:** 1:1 (square). The card crops to a circle so off-center
  faces will look odd.
- **Size:** 400 × 400 px is plenty (cards render at 64 px). Don't ship
  multi-megabyte originals.
- **Format:** JPEG preferred (smaller); WebP also fine. PNG only if you need
  transparency, which you don't for a headshot.
- **Target file size:** 60–120 KB per image.

## Quick resize / crop with ImageMagick

```bash
# square-crop and resize to 400px, JPEG quality 82
magick input.jpg -resize 800x800^ -gravity center -extent 800x800 \
        -resize 400x400 -quality 82 firstname-lastname.jpg
```

## No photo yet?

Leave the `headshot:` field unset in `projects.js`. The card will draw a
gradient initials avatar from the person's name — the site stays presentable.


## Admin and Mentor Team
Doris(张白雪）	doris.zbx@gmail.com
Quinn Leng / 冷宏坤	quinn.leng.666@gmail.com
Yongli Shan/单永立	shan.yongli@gmail.com
Ying Yang/杨莹	yangying2013@gmail.com
Zuolin Cheng/程作霖	zuolincheng166@gmail.com
Yuntao Zhang/张云涛	ustb.zhangyuntao@gmail.com
Alexander Wu	alexander.wu7@gmail.com
Shicheng Guo	shicheng.guo@cabsweb.org
Kay Tong	kay.tong@cabsweb.org 
Lena Li	lena.li@cabsweb.org 
Zhiqing Wang 	zwang9187@gmail.com 
Cai Le	le.cai@cabsweb.org 
Sihong Zhou	sihong.zhou@cabsweb.org 
Liping Meng	liping.meng@cabsweb.org 
Jingyuan Huang	elvahdesign@gmail.com 

Intern/mentee team
Jah Chen	jiabreaker@gmail.com
YU-JUNG LIANG/梁語容	angelliang112@gmail.com
Anagha Gardane	angdata09@gmail.com
Chengxi Zhang	zhangcx318@gmail.com
Hubert Chen	hubertchen2020@gmail.com
Zechuan Shi 石泽川	tristanzeshi@gmail.com
Yichen Dai	yichendai3@gmail.com
Ying Shi/石莹	shiying3646@gmail.com
Reuben N Addison	reuben.addison@gmail.com
Karen Wang	K27wang@gmail.com
xiaoxue li	lxx.glasgow@gmail.com
Wendi Ma (马雯迪）	mawendi2019@gmail.com
Sicheng Chen/陈思成	sc2977786@gmail.com
Beyza Yoruk	yorukbeyza02@gmail.com
Tobias	tobiaslin338@gmail.com
Yifeng Liang/梁议丰	yl11795@nyu.edu
Jingrui Mu (母景睿）	mujingrui.uibe@gmail.com
Ivan Yu	icstivan@gmail.com
Chang Li/ 李昌	lic052463@gmail.com
Shawn Phan	shawnphan23@gmail.com
Lengxi Huang/黄冷曦	lengxi.huang@gmail.com
Jason Zhou	zhoujason371@gmail.com
Chin Hung Lin	chinhunglin0@gmail.com
Matias	tashibama@gmail.com
Shucheng Cao/曹书诚	shucheng.cao@mail.mcgill.ca
Aaron Wu	wu.aaron.0001@gmail.com
Natalie Huang (黄心怡）	nathuang10@gmail.com
Christina Fu	christinawfu@gmail.com
Kening Li	mkeningli@gmail.com