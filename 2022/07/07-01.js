let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`
input = getInput()

let arrNames = []
class Dir {
  name
  dirs = []
  files = []
  constructor(name) {
    this.name = name
    arrNames.push(name)
  }
}

class File {
  name
  size
  constructor(name, size) {
    this.name = name
    this.size = size
  }
}

let arr = input.split('\n')
let dirs = {}

let stack = []
for (let row of arr) {
  let values = row.split(' ')
  const currentDir = stack[stack.length - 1]
  if (values[0] === '$') {
    // commands
    if (values[1] === 'cd') {
      // navigate
      if (values[2] === '..') {
        console.log('cd ..:', row)
        stack.pop()
      } else {
        console.log('cd dir:', row)
        let dirName = values[2]
        const found = currentDir?.dirs.find(d => d.name === dirName)
        stack.push(found ? found : new Dir(values[2]))
      }
    } else if (values[1] === 'ls') {
      // ls
      console.log('ls:', row)
    }
  } else if (values[0] === 'dir') {
    // dir
    console.log('dir:', row)
    let dirName = values[1]
    currentDir.dirs.push(new Dir(dirName))

  } else {
    // file
    console.log('file:', row)
    let fileSize = values[0]
    let fileName = values[1]
    currentDir.files.push(new File(fileName, fileSize))
  }
}


let fileTree = stack[0]
// console.log(JSON.stringify(fileTree, null, 2))


let ss = 0
function traverseDir(dir) {
  let sum = 0
  for (let d of dir.dirs) {
    sum += traverseDir(d)
  }
  for (let f of dir.files) {
    let x = Number(f.size)
    sum += x
  }
  if (sum <= 100000) {
    ss += sum
  }
  return sum
}
console.log('----------')
let s = traverseDir(fileTree)
console.log(ss)

// traverseFileTree(fileTree)

// function traverseFileTree(tree) {
//   let dirStack = [tree]
//   while(dirStack.length) {
//     let last = dirStack[dirStack.length - 1]
//     if (last.dirs.length > 0) {
//       for (let d of last.dirs) {
//         dirStack.push(d)
//       }
//     } else {
//       for (let f of last.files) {
//         debugger
//         console.log(f, dirStack)
//       }
//       dirStack.pop()
//     }
//   }
// }

function getInput() {
  return `$ cd /
$ ls
dir ccjp
328708 hglnvs.bsh
dir hpsnpc
dir pcb
dir pntzm
dir pzg
dir thfgwwsp
$ cd ccjp
$ ls
159990 dlz
dir mbtsvblj
165076 nppbjl.qhg
$ cd mbtsvblj
$ ls
34806 frqsf.nsv
dir ppq
dir ptht
dir rgmvdwt
$ cd ppq
$ ls
266252 dhzp
$ cd ..
$ cd ptht
$ ls
dir jbnj
dir zcbnwhzd
$ cd jbnj
$ ls
dir clscr
145780 zwtwf.zfz
$ cd clscr
$ ls
249531 dhzp
$ cd ..
$ cd ..
$ cd zcbnwhzd
$ ls
dir mbtsvblj
$ cd mbtsvblj
$ ls
258527 pjhvzjt.brz
$ cd ..
$ cd ..
$ cd ..
$ cd rgmvdwt
$ ls
166021 hdb
115350 ljpzpdbf
$ cd ..
$ cd ..
$ cd ..
$ cd hpsnpc
$ ls
6334 bfdfbrh.vff
311949 qphlw.whm
$ cd ..
$ cd pcb
$ ls
dir ccjp
201615 gbpzf.gmg
dir lhth
319302 lrmj.rmm
dir mwl
303062 pvftq
$ cd ccjp
$ ls
10932 ccjp
80040 jjcggmr.ljs
299982 jrqwhsn.ptv
280655 ljpzpdbf
268430 mdvvj.dlf
dir mvhhlg
dir ppfq
dir rdgngdm
dir smftmb
dir tqwchhd
$ cd mvhhlg
$ ls
146902 fwhcbfr.shd
$ cd ..
$ cd ppfq
$ ls
263452 hdb
$ cd ..
$ cd rdgngdm
$ ls
46355 wlgshdgl
$ cd ..
$ cd smftmb
$ ls
56834 mhs
325038 ppmtvcj
dir rzcmwl
194645 ztwqq.jfw
$ cd rzcmwl
$ ls
dir btfhswwf
dir jrd
dir ndzfvl
$ cd btfhswwf
$ ls
62811 ccjp.clj
$ cd ..
$ cd jrd
$ ls
184948 fqqg.pfc
dir mshf
136894 nbvbr
$ cd mshf
$ ls
314602 ppmtvcj
$ cd ..
$ cd ..
$ cd ndzfvl
$ ls
43177 hhcfpnmg.njm
$ cd ..
$ cd ..
$ cd ..
$ cd tqwchhd
$ ls
294014 dlz
122061 ljpzpdbf
54178 ppmtvcj.wlp
dir trm
dir zcbnwhzd
$ cd trm
$ ls
279737 ccjp.mhz
$ cd ..
$ cd zcbnwhzd
$ ls
88477 dhnwjlzj
143989 dhzp
$ cd ..
$ cd ..
$ cd ..
$ cd lhth
$ ls
79532 tlls
$ cd ..
$ cd mwl
$ ls
dir frc
dir lqqqppm
178576 prpjmrw
$ cd frc
$ ls
dir cvm
244013 dhzp
29325 gnh
264555 hdb
$ cd cvm
$ ls
196619 hhcfpnmg.njm
$ cd ..
$ cd ..
$ cd lqqqppm
$ ls
dir jdznl
38505 nqv
$ cd jdznl
$ ls
85492 ctt
228912 dfbgtqj.vsb
136077 nnwgd.vjn
254459 zrrzsfss
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd pntzm
$ ls
dir hnnhdd
dir mbtsvblj
dir vmdlwdj
$ cd hnnhdd
$ ls
35908 fjp
119221 ljpzpdbf
210488 whhpztz.lgt
$ cd ..
$ cd mbtsvblj
$ ls
dir clfpc
dir csqcnmtc
18524 mbtsvblj
dir zcrrtlh
$ cd clfpc
$ ls
dir jffq
dir qpsfrhld
89569 tdzfqpz.wvs
$ cd jffq
$ ls
dir dpngpgr
dir htbf
$ cd dpngpgr
$ ls
128899 ccjp.nbs
$ cd ..
$ cd htbf
$ ls
90381 ljpzpdbf
$ cd ..
$ cd ..
$ cd qpsfrhld
$ ls
dir bgrb
dir ddtlcfz
54115 dlz
154299 hhcfpnmg.njm
59452 jwc.pwg
dir mbtsvblj
$ cd bgrb
$ ls
119046 ccjp.zmf
dir qsnng
$ cd qsnng
$ ls
195412 vjdh.cqv
$ cd ..
$ cd ..
$ cd ddtlcfz
$ ls
dir ftfch
26717 mbtsvblj
157679 mbtsvblj.rfb
299928 qmg
dir trq
dir wjhjlpr
$ cd ftfch
$ ls
50242 dhzp
58846 dlz
dir hhwsrzhv
$ cd hhwsrzhv
$ ls
dir bjnn
67610 dhzp
dir mbtsvblj
205664 tmcfmshb
$ cd bjnn
$ ls
199806 dlz
$ cd ..
$ cd mbtsvblj
$ ls
dir ffzjcshp
$ cd ffzjcshp
$ ls
dir ppmtvcj
$ cd ppmtvcj
$ ls
184744 dlz
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd trq
$ ls
278471 ccjp
$ cd ..
$ cd wjhjlpr
$ ls
dir wzwqrfhv
$ cd wzwqrfhv
$ ls
262877 ccjp
$ cd ..
$ cd ..
$ cd ..
$ cd mbtsvblj
$ ls
243142 ccjp.szb
306673 lmstdpfc.nww
dir nlsprnh
dir nmzwtwwc
dir rbpbl
$ cd nlsprnh
$ ls
200708 stbjphg.hcs
$ cd ..
$ cd nmzwtwwc
$ ls
323366 vzq.pcj
$ cd ..
$ cd rbpbl
$ ls
59872 fmnmsjr.svf
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd csqcnmtc
$ ls
16652 ccjp
dir fsfd
37144 hdb
dir mbtsvblj
dir mwl
66387 nljlpbjq
dir ppmtvcj
120839 rgclgwnq
$ cd fsfd
$ ls
105721 qqvchq.mwh
$ cd ..
$ cd mbtsvblj
$ ls
dir cdzgtll
dir dfgd
dir fbfr
165975 mbtsvblj
174541 ppmtvcj
dir vwgrpswj
$ cd cdzgtll
$ ls
163523 dhzp
124219 dlz
199796 hdb
$ cd ..
$ cd dfgd
$ ls
173064 ccjp.cbt
dir cdqc
dir fzrm
dir grcs
87000 mbtsvblj.zrl
dir njvgs
dir ppmtvcj
210984 rhtslcwt.wgt
dir vws
$ cd cdqc
$ ls
178924 hdb
$ cd ..
$ cd fzrm
$ ls
dir bjwtbc
211229 dhzp
dir dtslj
76461 mbtsvblj.mtw
317618 mmz.mqq
dir mwl
163587 vwgq
$ cd bjwtbc
$ ls
9891 hhcfpnmg.njm
dir mwl
$ cd mwl
$ ls
203337 glwp.dls
112753 mwl.qph
$ cd ..
$ cd ..
$ cd dtslj
$ ls
277817 hhcfpnmg.njm
$ cd ..
$ cd mwl
$ ls
90781 mhnrwpmg.svv
$ cd ..
$ cd ..
$ cd grcs
$ ls
286144 rnfqhs
$ cd ..
$ cd njvgs
$ ls
dir bmhdth
dir ccjp
dir mwl
$ cd bmhdth
$ ls
154455 ppmtvcj.hwq
$ cd ..
$ cd ccjp
$ ls
215864 fcwjtzhs.vqn
$ cd ..
$ cd mwl
$ ls
139000 fnjztz
$ cd ..
$ cd ..
$ cd ppmtvcj
$ ls
45041 jzfnmdw.jms
dir zstzfs
$ cd zstzfs
$ ls
dir qsfsj
$ cd qsfsj
$ ls
34771 rsv
$ cd ..
$ cd ..
$ cd ..
$ cd vws
$ ls
98036 pjs
103603 szszjfv
211083 ztd
$ cd ..
$ cd ..
$ cd fbfr
$ ls
dir dshrpf
216109 hbw.jhj
319355 hdhl
dir ltf
210950 qstlgvb
dir thhncv
316300 zfgh
$ cd dshrpf
$ ls
dir nll
dir qrsg
$ cd nll
$ ls
45935 flmvswv.rll
4161 hhcfpnmg.njm
82301 sww.dwj
dir tqdmtp
46608 tzrn.qrt
101463 zcbnwhzd.mpm
$ cd tqdmtp
$ ls
280430 dhzp
$ cd ..
$ cd ..
$ cd qrsg
$ ls
dir htrvnvz
$ cd htrvnvz
$ ls
dir mbtsvblj
$ cd mbtsvblj
$ ls
235270 dlz
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ltf
$ ls
dir pcbc
dir wwjnwbjj
dir zcbnwhzd
$ cd pcbc
$ ls
140010 mbtsvblj.hqd
$ cd ..
$ cd wwjnwbjj
$ ls
dir mwl
$ cd mwl
$ ls
dir pddbdp
$ cd pddbdp
$ ls
27497 dlz
$ cd ..
$ cd ..
$ cd ..
$ cd zcbnwhzd
$ ls
302364 nrgpwm.cbb
$ cd ..
$ cd ..
$ cd thhncv
$ ls
299769 hdb
$ cd ..
$ cd ..
$ cd vwgrpswj
$ ls
dir jgt
dir mwl
293673 mwl.pwl
$ cd jgt
$ ls
282773 hhcfpnmg.njm
$ cd ..
$ cd mwl
$ ls
288944 jfnjdtr.ssj
186368 wfr
dir zrtvvf
$ cd zrtvvf
$ ls
82162 gtz.gsc
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd mwl
$ ls
98218 htc.qjr
dir mghhqrtn
dir qct
$ cd mghhqrtn
$ ls
220446 dlz
36230 pwwlwv.crn
$ cd ..
$ cd qct
$ ls
33534 hdb
27140 jpwqvbs.mvr
60637 mlqtp
12143 nlvtp.qjn
152733 nqjqzt
$ cd ..
$ cd ..
$ cd ppmtvcj
$ ls
dir ccjp
297245 zcbnwhzd
$ cd ccjp
$ ls
128473 wcw.dng
$ cd ..
$ cd ..
$ cd ..
$ cd zcrrtlh
$ ls
27488 bcbnmhq
dir dhsmmlt
dir fgqbpcn
$ cd dhsmmlt
$ ls
42514 cvfwqnfl
252570 dlz
145814 ppmtvcj.snb
294613 rslsh.slv
186477 vwd.spz
dir wffbp
$ cd wffbp
$ ls
dir mbtsvblj
dir nvq
150447 ppmtvcj.hzc
34904 whzpsbqp.clq
dir zcbnwhzd
$ cd mbtsvblj
$ ls
65132 cmmlw.bmq
310866 cqrtmpdp.pjq
dir mbtsvblj
212527 mbtsvblj.spw
232198 ngmltt.qwl
dir pbqh
dir ppwgsp
dir qqfsb
223322 tzsmvh
$ cd mbtsvblj
$ ls
dir bzpdz
dir mbtsvblj
dir pwnn
dir zcbnwhzd
$ cd bzpdz
$ ls
272769 gtmftv
280597 hhcfpnmg.njm
151008 nmgvrhr.mvp
$ cd ..
$ cd mbtsvblj
$ ls
64862 czn
309781 dhzp
253325 dlz
dir dqnr
dir fgd
139779 ghtzv
255567 rml.rhm
dir srfzjfw
$ cd dqnr
$ ls
302986 cjnwm.lrb
158871 frhjlp.rnn
180385 nrlmq
$ cd ..
$ cd fgd
$ ls
158213 msjrcl.dsh
$ cd ..
$ cd srfzjfw
$ ls
dir jfnd
210830 ljpzpdbf
dir mbtsvblj
dir zcrrvpg
$ cd jfnd
$ ls
300883 zvtdj.srv
$ cd ..
$ cd mbtsvblj
$ ls
287467 cjdm.whc
233084 hpfgtnts
dir zcbnwhzd
$ cd zcbnwhzd
$ ls
79744 dlz
$ cd ..
$ cd ..
$ cd zcrrvpg
$ ls
dir jrbcqlct
dir srpm
$ cd jrbcqlct
$ ls
325945 dlz
$ cd ..
$ cd srpm
$ ls
90698 ngw.fhm
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd pwnn
$ ls
104826 ppmtvcj.jtm
$ cd ..
$ cd zcbnwhzd
$ ls
145508 fnr.dgt
256683 gwdl.vfl
dir mdv
44255 mqdv.cdb
79723 rgvcf
dir sjdh
88945 wdgq.hfm
dir zpm
$ cd mdv
$ ls
231290 dlz
3468 hdb
95091 mcm
67779 mwl.ncb
dir ppf
dir rfwwtjdn
143730 slrv.qdl
dir sqbdvppf
$ cd ppf
$ ls
73809 rgdtlp
$ cd ..
$ cd rfwwtjdn
$ ls
255306 dhzp
306865 zbnmtcgr.ddf
237019 zcbnwhzd.szn
$ cd ..
$ cd sqbdvppf
$ ls
dir ccjp
dir mbtsvblj
142955 str
dir whtrbcqn
93407 zcbnwhzd.ctr
$ cd ccjp
$ ls
29914 cwtvtcnp.tft
295537 rvlb
$ cd ..
$ cd mbtsvblj
$ ls
262652 ccjp.wbn
297839 mbtsvblj.gnz
249019 pqsqjg.vwr
$ cd ..
$ cd whtrbcqn
$ ls
dir ccjp
dir hslmvvb
51040 vzcsfcwf
$ cd ccjp
$ ls
39489 slps
$ cd ..
$ cd hslmvvb
$ ls
148628 gpwnf.qtd
dir jrl
11814 qtjtsvgg.ltz
$ cd jrl
$ ls
dir scwlmjzm
$ cd scwlmjzm
$ ls
119717 vhpsrbzw.jnh
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd sjdh
$ ls
43495 srwzspsl
$ cd ..
$ cd zpm
$ ls
137218 mwl.pzt
$ cd ..
$ cd ..
$ cd ..
$ cd pbqh
$ ls
202610 dlz
dir vdrqc
$ cd vdrqc
$ ls
202958 mzzmjrt
$ cd ..
$ cd ..
$ cd ppwgsp
$ ls
248541 pzvtdl.lcc
$ cd ..
$ cd qqfsb
$ ls
211390 mbtsvblj.fvh
241455 mwl.bzl
$ cd ..
$ cd ..
$ cd nvq
$ ls
74730 hhcfpnmg.njm
257109 ljpzpdbf
8864 zcbnwhzd.ctj
$ cd ..
$ cd zcbnwhzd
$ ls
307501 ccjp
dir dfgbztqr
dir mwl
248526 pmhtz
dir rwmzdt
$ cd dfgbztqr
$ ls
18261 hdb
dir mwl
dir ppmtvcj
$ cd mwl
$ ls
36787 hdv.vfs
283104 zrvbsht.fmm
$ cd ..
$ cd ppmtvcj
$ ls
208809 ljpzpdbf
$ cd ..
$ cd ..
$ cd mwl
$ ls
195369 mgfvgw
146522 mwl
78589 sfthn
$ cd ..
$ cd rwmzdt
$ ls
10176 hdb
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd fgqbpcn
$ ls
169227 dhzp
dir dwsgcrz
140391 pjjln.ngc
162589 ppmtvcj.ngb
199626 rcgbjn.wfv
dir snrl
dir vfnrs
$ cd dwsgcrz
$ ls
300751 fjlw.wtp
$ cd ..
$ cd snrl
$ ls
16142 ccjp.jpw
150389 cmbnljt.ljq
52600 gqggd.dwm
$ cd ..
$ cd vfnrs
$ ls
217267 bwlpdfv.hzh
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd vmdlwdj
$ ls
29199 bcgjdpj.qcj
172894 jjgrcd.cvf
dir ngpnmbqz
296193 ppmtvcj.bfr
dir tfvhhpn
36476 wqzst.wcj
$ cd ngpnmbqz
$ ls
dir gnsm
dir ntsgrm
$ cd gnsm
$ ls
dir rjzngs
dir tvv
$ cd rjzngs
$ ls
dir dpfcw
dir spmhrb
$ cd dpfcw
$ ls
181566 mgdjjd.pqg
$ cd ..
$ cd spmhrb
$ ls
163198 hhcfpnmg.njm
$ cd ..
$ cd ..
$ cd tvv
$ ls
131443 hhcfpnmg.njm
$ cd ..
$ cd ..
$ cd ntsgrm
$ ls
246786 dlz
12841 pzbgrn
$ cd ..
$ cd ..
$ cd tfvhhpn
$ ls
196923 dhzp
$ cd ..
$ cd ..
$ cd ..
$ cd pzg
$ ls
262706 ppbqssj.hjj
$ cd ..
$ cd thfgwwsp
$ ls
dir dsvc
dir fbg
dir flgmdj
516 gwppndsl
dir mwl
dir qfhsr
dir tgj
dir wdmzc
272804 zcbnwhzd
dir zrfmzrl
$ cd dsvc
$ ls
22089 dlz
$ cd ..
$ cd fbg
$ ls
289639 hhcfpnmg.njm
$ cd ..
$ cd flgmdj
$ ls
293793 fqrpf
$ cd ..
$ cd mwl
$ ls
159673 dhzp
dir ftthgr
270973 hhcfpnmg.njm
dir jjrq
279365 ljpzpdbf
dir mglzfcq
101769 pnz
18964 rdl.wqf
$ cd ftthgr
$ ls
dir ccrvnht
170369 ljltl.slv
dir mwl
dir zqts
65217 zvnhmqpz.cqb
$ cd ccrvnht
$ ls
164437 hdb
$ cd ..
$ cd mwl
$ ls
dir cjsc
dir zcbnwhzd
dir zwzb
$ cd cjsc
$ ls
91883 hhcfpnmg.njm
203008 nfmvr
$ cd ..
$ cd zcbnwhzd
$ ls
dir mbtsvblj
$ cd mbtsvblj
$ ls
187513 ljpzpdbf
$ cd ..
$ cd ..
$ cd zwzb
$ ls
138631 ljpzpdbf
dir sjngjp
$ cd sjngjp
$ ls
52116 ccjp.ttc
157900 fptzbpp.sdm
89462 hhcfpnmg.njm
$ cd ..
$ cd ..
$ cd ..
$ cd zqts
$ ls
162402 hdb
$ cd ..
$ cd ..
$ cd jjrq
$ ls
dir bffvw
dir czbwf
13447 dlz
dir gjh
dir hjs
$ cd bffvw
$ ls
139679 dqqtq.lnb
dir mwl
13310 sjln.zgv
243329 srmghrt.ffl
72108 ssm.tph
$ cd mwl
$ ls
dir fdlmfjt
dir jms
122108 nqwrj
$ cd fdlmfjt
$ ls
75969 hdtbcsfc.vmz
$ cd ..
$ cd jms
$ ls
297556 hhcfpnmg.njm
$ cd ..
$ cd ..
$ cd ..
$ cd czbwf
$ ls
320541 ccjp
$ cd ..
$ cd gjh
$ ls
164281 dhzp
286094 vjs
$ cd ..
$ cd hjs
$ ls
dir cbdzvd
41353 ccjp
dir gbs
114686 hdb
dir hmtpm
278709 ljpzpdbf
dir ppmtvcj
292308 zcmlbbbc.mpp
86096 zttwct
$ cd cbdzvd
$ ls
153733 dhzp
$ cd ..
$ cd gbs
$ ls
dir nfnb
$ cd nfnb
$ ls
dir hgm
$ cd hgm
$ ls
233469 ljpzpdbf
$ cd ..
$ cd ..
$ cd ..
$ cd hmtpm
$ ls
14247 mwl
$ cd ..
$ cd ppmtvcj
$ ls
dir jcwhvcf
241390 mwl
$ cd jcwhvcf
$ ls
198254 wddq.rgp
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd mglzfcq
$ ls
dir bsplglmj
21700 fhflt.vgq
56724 lpmcbzrj
222733 qnbr
256952 thvbqb.gtv
$ cd bsplglmj
$ ls
dir zcbnwhzd
$ cd zcbnwhzd
$ ls
dir mqzqz
$ cd mqzqz
$ ls
75000 ppmtvcj
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd qfhsr
$ ls
249770 gfv.cnw
70204 qlvwhff.jhm
$ cd ..
$ cd tgj
$ ls
243926 mwl.bfv
$ cd ..
$ cd wdmzc
$ ls
19843 hdb
264263 jbqf.str
261303 qrvt.lbr
$ cd ..
$ cd zrfmzrl
$ ls
52067 lnfgp.nhl`
}