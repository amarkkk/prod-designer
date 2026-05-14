async page => {
  await page.setViewportSize({ width: 1680, height: 1200 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:8765/the-ledger.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);

  const shots = [
    ['source-sidebar', '.sidebar'],
    ['source-hero', '.hero'],
    ['source-middle', '.middle'],
    ['source-double', '.double'],
    ['source-goals', '.goals'],
    ['source-coach', '.coach'],
    ['source-alerts', '.alerts']
  ];
  for (const [name, selector] of shots) {
    await page.locator(selector).first().screenshot({
      path: `output/playwright/${name}-1680.png`,
      animations: 'disabled'
    });
  }

  const styleProps = [
    'display', 'gridTemplateColumns', 'gridTemplateRows', 'flexDirection',
    'alignItems', 'justifyContent', 'gap', 'columnGap', 'rowGap',
    'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom',
    'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
    'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
    'backgroundColor', 'color', 'fontFamily', 'fontStyle', 'fontWeight',
    'fontSize', 'lineHeight', 'letterSpacing', 'textTransform',
    'fontVariantCaps', 'fontVariantNumeric', 'opacity'
  ];
  const selectors = {
    'sidebar-brand': '.sidebar-brand',
    'sidebar-brand name': '.sidebar-brand .name',
    'sidebar-brand em': '.sidebar-brand .name em',
    'sidebar-brand vol': '.sidebar-brand .vol',
    'sidebar-nav default': '.sidebar-nav li:nth-child(2) a',
    'sidebar-nav active': '.sidebar-nav a[aria-current="page"]',
    'sidebar-nav num': '.sidebar-nav a .num',
    'sidebar-nav hint': '.sidebar-nav li:nth-child(1) .hint',
    'sidebar-nav hint warn': '.sidebar-nav .hint.warn',
    'sidebar-nav hint alert': '.sidebar-nav .hint.alert',
    'sidebar pill': '.sidebar-nav .pill',
    'account item': '.accounts-list li:nth-child(1)',
    'account dot': '.accounts-list li:nth-child(1) .dot',
    'account name': '.accounts-list li:nth-child(1) .name',
    'account num': '.accounts-list li:nth-child(1) .num',
    'account value': '.accounts-list li:nth-child(1) .v',
    'account trend up': '.accounts-list li:nth-child(1) .trend',
    'account trend down': '.accounts-list li:nth-child(3) .trend',
    'sidebar-foot': '.sidebar-foot',
    'sidebar avatar': '.sidebar-foot .avatar',
    'sidebar user name': '.sidebar-foot .user .name',
    'sidebar role': '.sidebar-foot .user .role',
    'settings': '.sidebar-foot .settings',
    'hero-kicker': '.hero-kicker',
    'hero-kicker glyph': '.hero-kicker .glyph',
    'hero-kicker recent': '.hero-kicker .recent',
    'marginalia': '.marginalia',
    'marginalia strong': '.marginalia strong',
    'hero-delta': '.hero-delta',
    'hero-delta arrow': '.hero-delta .arrow',
    'hero-delta val': '.hero-delta .val',
    'hero-delta em': '.hero-delta em',
    'hero-split': '.hero-split',
    'hero-split cell': '.hero-split > div:nth-child(1)',
    'hero-split label': '.hero-split .l',
    'hero-split value': '.hero-split .v',
    'hero-split foot': '.hero-split .foot',
    'kpi': '.kpi',
    'kpi label': '.kpi .l',
    'kpi micro': '.kpi .l .micro',
    'kpi value': '.kpi .v',
    'kpi delta up': '.kpi .d.up',
    'section-head': '.section-head',
    'section h-title': '.section-head .h-title',
    'section num': '.section-head .section-num',
    'section h3': '.section-head h3',
    'section sub': '.section-sub',
    'section controls': '.section-head .h-controls',
    'section meta': '.section-head .h-meta',
    'link-action': '.link-action',
    'tabs': '.tabs',
    'tabs label': '.tabs label',
    'chips': '.chips',
    'chips label': '.chips label',
    'legend': '.legend',
    'legend items': '.legend .items',
    'legend summary': '.legend .summary',
    'distribution row': '.distribution li:nth-child(1)',
    'distribution rank': '.distribution .rank',
    'distribution name': '.distribution .name',
    'distribution note': '.distribution .name .note',
    'distribution amount': '.distribution .amount',
    'distribution pct': '.distribution .pct',
    'distribution bar': '.distribution .bar',
    'distribution total': '.distribution .total',
    'ledger table': '.ledger-table',
    'ledger th': '.ledger-table thead th',
    'ledger td': '.ledger-table tbody td',
    'tx-date': '.tx-date',
    'tx-desc': '.tx-desc',
    'tx-tag': '.tx-tag',
    'row-actions': '.row-actions',
    'row-action link': '.row-actions a',
    'tx debit': '.tx-debit',
    'tx credit': '.tx-credit',
    'tx balance': '.tx-bal',
    'ledger foot': '.ledger-foot',
    'fiscal row': '.fiscal-list li:nth-child(1)',
    'fiscal name': '.fiscal-name',
    'fiscal pct': '.fiscal-name .pct',
    'fiscal pct over': '.fiscal-name .pct.over',
    'fiscal amount': '.fiscal-amount',
    'fiscal bar': '.fiscal-bar',
    'fiscal fill': '.fiscal-bar-fill',
    'fiscal fill over': '.fiscal-bar-fill.over',
    'fiscal fill warn': '.fiscal-bar-fill.warn',
    'fiscal marker': '.fiscal-bar-marker',
    'fiscal edit': '.fiscal-edit',
    'fiscal edit link': '.fiscal-edit a',
    'goal card': '.goals-grid > article',
    'goal eyebrow': '.goal-eyebrow',
    'goal eyebrow roman': '.goal-eyebrow .roman',
    'goal name': '.goal-name',
    'goal prog': '.goal-prog',
    'goal bar': '.goal-bar',
    'goal fill': '.goal-bar-fill',
    'goal eta': '.goal-eta',
    'goal pace': '.goal-pace',
    'goal contribute': '.goal-contribute',
    'coach note': '.coach-note',
    'coach kind': '.coach-kind',
    'coach kind num': '.coach-kind .num',
    'coach headline': '.coach-headline',
    'coach body': '.coach-body',
    'coach stat': '.coach-stat',
    'coach stat big': '.coach-stat .big',
    'coach stat lbl': '.coach-stat .lbl',
    'coach meta': '.coach-meta',
    'coach actions': '.coach-actions',
    'notice row': '.alerts li',
    'alert kind': '.alert-kind',
    'alert body': '.alert-body',
    'alert action': '.alert-action'
  };

  const read = (el) => {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const out = {
      text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 120),
      rect: {
        x: Number(rect.x.toFixed(2)),
        y: Number(rect.y.toFixed(2)),
        w: Number(rect.width.toFixed(2)),
        h: Number(rect.height.toFixed(2))
      }
    };
    for (const prop of styleProps) out[prop] = cs[prop];
    return out;
  };

  const metrics = await page.evaluate(({ selectors }) => {
    const styleProps = [
      'display', 'gridTemplateColumns', 'gridTemplateRows', 'flexDirection',
      'alignItems', 'justifyContent', 'gap', 'columnGap', 'rowGap',
      'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom',
      'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
      'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
      'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
      'backgroundColor', 'color', 'fontFamily', 'fontStyle', 'fontWeight',
      'fontSize', 'lineHeight', 'letterSpacing', 'textTransform',
      'fontVariantCaps', 'fontVariantNumeric', 'opacity'
    ];
    const read = (el) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const out = {
        text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 120),
        rect: {
          x: Number(rect.x.toFixed(2)),
          y: Number(rect.y.toFixed(2)),
          w: Number(rect.width.toFixed(2)),
          h: Number(rect.height.toFixed(2))
        }
      };
      for (const prop of styleProps) out[prop] = cs[prop];
      return out;
    };
    return Object.fromEntries(Object.entries(selectors).map(([name, selector]) => {
      const el = document.querySelector(selector);
      return [name, el ? read(el) : null];
    }));
  }, { selectors });

  const hoverChecks = {};
  for (const [name, selector] of [
    ['sidebar-nav hover', '.sidebar-nav li:nth-child(2) a'],
    ['account hover', '.accounts-list li:nth-child(1)'],
    ['distribution hover', '.distribution li:nth-child(1)'],
    ['ledger row hover actions', '.ledger-table tbody tr:nth-child(1)'],
    ['fiscal hover edit link', '.fiscal-list li:nth-child(1)'],
    ['goal hover', '.goals-grid > article:nth-child(1)'],
    ['link-action hover', '.link-action'],
    ['alert-action hover', '.alert-action']
  ]) {
    await page.hover(selector);
    hoverChecks[name] = await page.evaluate(({ selector, name }) => {
      const target = name.includes('actions')
        ? document.querySelector(`${selector} .row-actions`)
        : name.includes('edit link')
          ? document.querySelector(`${selector} .fiscal-edit a`)
          : document.querySelector(selector);
      if (!target) return null;
      const cs = getComputedStyle(target);
      return {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderBottomColor: cs.borderBottomColor,
        opacity: cs.opacity
      };
    }, { selector, name });
  }

  return { url: page.url(), metrics, hoverChecks };
}
