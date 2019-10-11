import React from 'react'
import One from '../icons/1.png'
import Two from '../icons/2.png'
import Three from '../icons/3.png'
import Four from '../icons/4.png'
import Five from '../icons/5.png'
import Six from '../icons/6.png'
import Seven from '../icons/7.png'
import a from '../icons/a.png'
import b from '../icons/b.png'
import c from '../icons/c.png'
import d from '../icons/d.png'
import e from '../icons/e.png'
import f from '../icons/f.png'
import g from '../icons/g.png'
import h from '../icons/h.png'
import j from '../icons/j.png'
import l from '../icons/l.png'
import m from '../icons/m.png'
import n from '../icons/n.png'
import q from '../icons/q.png'
import r from '../icons/r.png'
import s from '../icons/s.png'
import t from '../icons/t.png'
import w from '../icons/w.png'
import z from '../icons/z.png'
import sixExpress from '../icons/6-express.png'
import sevenExpress from '../icons/7-express.png'
import fExpress from '../icons/f-express.png'

export const AssignIcons = array_of_trains => {
  return array_of_trains.map(train => getIcon(train))
}

export const getIcon = train => {
  switch (train.toLowerCase()) {
    case '1':
      return <img src={One} alt='One' />
    case '2':
      return <img src={Two} alt='Two' />
    case '3':
      return <img src={Three} alt='Three' />
    case '4':
        return <img src={Four} alt='Four' />
    case '5':
      return <img src={Five} alt='Five' />
    case '6':
      return <img src={Six} alt='Six' />
    case '7':
        return <img src={Seven} alt='Seven' />
    case 'a':
      return <img src={a} alt='a' />
    case 'b':
      return <img src={b} alt='b' />
    case 'c':
        return <img src={c} alt='c' />
    case 'd':
      return <img src={d} alt='d' />
    case 'e':
      return <img src={e} alt='e' />
    case 'f':
        return <img src={f} alt='f' />
    case 'g':
      return <img src={g} alt='g' />
    case 'h':
        return <img src={h} alt='h' />
    case 'j':
        return <img src={j} alt='j' />
    case 'l':
      return <img src={l} alt='l' />
    case 'm':
      return <img src={m} alt='m' />
    case 'n':
        return <img src={n} alt='n' />
    case 'q':
        return <img src={q} alt='q' />
    case 'r':
      return <img src={r} alt='r' />
    case 's':
        return <img src={s} alt='s' />
    case 't':
        return <img src={t} alt='t' />
    case 'w':
        return <img src={w} alt='w' />
    case 'z':
      return <img src={z} alt='z' />
    case '6 express':
        return <img src={sixExpress} alt='6X' />
    case '7 express':
        return <img src={sevenExpress} alt='7X' />
    case 'f express':
      return <img src={fExpress} alt='fX' />
  }
}
