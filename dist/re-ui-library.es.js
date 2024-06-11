import { defineComponent as S, ref as O, provide as ue, h, Transition as Qe, withDirectives as di, inject as ae, watch as E, onBeforeMount as hf, onMounted as _e, onUpdated as zr, toRefs as gf, cloneVNode as Vr, nextTick as mf, computed as j, vShow as Ic, onBeforeUnmount as Fc, Teleport as Rc, onUnmounted as Nc, shallowRef as vf, resolveComponent as X, openBlock as J, createBlock as Re, withCtx as Q, createElementBlock as Ie, Fragment as Rn, renderList as ja, createTextVNode as Kn, toDisplayString as Ue, createVNode as se, createCommentVNode as Nn, createElementVNode as Pe, createStaticVNode as pf, mergeProps as ya, resolveDynamicComponent as bf, reactive as yf, readonly as Cf, normalizeClass as xf } from "vue";
import { useStore as _f } from "vuex";
import { useRoute as wf, RouterLink as Sf } from "vue-router";
const kf = S({
  name: "CAccordion",
  props: {
    /**
     * The active item key.
     */
    activeItemKey: [Number, String],
    /**
     * Make accordion items stay open when another item is opened
     */
    alwaysOpen: Boolean,
    /**
     * Removes the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.
     */
    flush: Boolean
  },
  setup(e, { slots: t }) {
    const n = O(e.activeItemKey), a = (i) => {
      n.value = i;
    };
    return ue("activeItemKey", n), ue("alwaysOpen", e.alwaysOpen), ue("setActiveItemKey", a), () => h("div", { class: ["accordion", { "accordion-flush": e.flush }] }, t.default && t.default());
  }
}), jc = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t && n.beforeEnter(e);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: a }) {
    !t != !n && a && (t ? (a.beforeEnter(e), a.enter(e)) : a.leave(e, () => {
    }));
  }
}, Qo = (e) => {
  typeof e == "function" && e();
}, be = (e, t, n = !0) => {
  if (!n) {
    Qo(e);
    return;
  }
  const i = Of(t) + 5;
  let r = !1;
  const o = ({ target: s }) => {
    s === t && (r = !0, t.removeEventListener("transitionend", o), Qo(e));
  };
  t.addEventListener("transitionend", o), setTimeout(() => {
    r || Df(t);
  }, i);
}, Of = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const a = Number.parseFloat(t), i = Number.parseFloat(n);
  return !a && !i ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * 1e3);
}, Df = (e) => {
  e.dispatchEvent(new Event("transitionend"));
}, zc = S({
  name: "CCollapse",
  props: {
    /**
     * Set horizontal collapsing to transition the width instead of height.
     */
    horizontal: Boolean,
    /**
     * Toggle the visibility of component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = O(!1), i = O(e.visible), r = () => {
      a.value = !0;
    }, o = (d, f) => {
      n("show"), setTimeout(() => {
        if (be(() => f(), d), e.horizontal) {
          d.style.width = `${d.scrollWidth}px`;
          return;
        }
        d.style.height = `${d.scrollHeight}px`;
      }, 1);
    }, s = (d) => {
      i.value = !0, a.value = !1, e.horizontal ? d.style.removeProperty("width") : d.style.removeProperty("height");
    }, l = (d) => {
      if (a.value = !0, i.value = !1, e.horizontal) {
        d.style.width = `${d.scrollWidth}px`;
        return;
      }
      d.style.height = `${d.scrollHeight}px`;
    }, c = (d, f) => {
      n("hide"), setTimeout(() => {
        if (be(() => f(), d), e.horizontal) {
          d.style.width = "0px";
          return;
        }
        d.style.height = "0px";
      }, 1);
    }, u = (d) => {
      a.value = !1, e.horizontal ? d.style.removeProperty("width") : d.style.removeProperty("height");
    };
    return () => h(Qe, {
      css: !1,
      onBeforeEnter: () => r(),
      onEnter: (d, f) => o(d, f),
      onAfterEnter: (d) => s(d),
      onBeforeLeave: (d) => l(d),
      onLeave: (d, f) => c(d, f),
      onAfterLeave: (d) => u(d)
    }, () => di(h("div", {
      class: [
        a.value ? "collapsing" : "collapse",
        { "collapse-horizontal": e.horizontal, show: i.value }
      ]
    }, t.default && t.default()), [[jc, e.visible]]));
  }
}), Pf = S({
  name: "CAccordionBody",
  setup(e, { slots: t }) {
    const n = ae("visible");
    return () => h(zc, { class: "accordion-collapse", visible: n.value }, {
      default: () => h("div", { class: ["accordion-body"] }, t.default && t.default())
    });
  }
}), Mf = S({
  name: "CAccordionButton",
  setup(e, { slots: t }) {
    const n = ae("toggleVisibility"), a = ae("visible");
    return () => h("button", {
      type: "button",
      "aria-expanded": !a.value,
      class: ["accordion-button", { collapsed: !a.value }],
      onClick: () => n()
    }, t.default && t.default());
  }
}), Tf = S({
  name: "CAccordionHeader",
  setup(e, { slots: t }) {
    return () => h("div", { class: ["accordion-header"] }, h(Mf, {}, {
      default: () => t.default && t.default()
    }));
  }
}), Af = S({
  name: "CAccordionItem",
  props: {
    /**
     * The item key.
     */
    itemKey: [Number, String]
  },
  setup(e, { slots: t }) {
    const n = ae("activeItemKey"), a = ae("alwaysOpen"), i = ae("setActiveItemKey"), r = O(e.itemKey ?? Math.random().toString(36).slice(2, 11)), o = O(n.value === r.value);
    E(n, () => o.value = n.value === r.value);
    const s = () => {
      o.value = !o.value, !a && o && i(r.value);
    };
    return ue("visible", o), ue("toggleVisibility", s), () => h("div", { class: ["accordion-item"] }, t.default && t.default());
  }
}), Xn = S({
  name: "CCloseButton",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Change the default color to white.
     */
    white: Boolean
  },
  emits: [
    /**
     * Event called when the user clicks on the component.
     */
    "click"
  ],
  setup(e, { emit: t }) {
    const n = () => {
      e.disabled || t("click");
    };
    return () => h("button", {
      type: "button",
      class: [
        "btn",
        "btn-close",
        {
          "btn-close-white": e.white
        },
        e.disabled
      ],
      "aria-label": "Close",
      disabled: e.disabled,
      onClick: n
    });
  }
}), fi = {
  type: String,
  validator: (e) => [
    "rounded",
    "rounded-top",
    "rounded-end",
    "rounded-bottom",
    "rounded-start",
    "rounded-circle",
    "rounded-pill",
    "rounded-0",
    "rounded-1",
    "rounded-2",
    "rounded-3"
  ].includes(e)
}, q = {
  type: String,
  validator: (e) => [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light",
    "link",
    "transparent",
    "primary-gradient",
    "secondary-gradient",
    "success-gradient",
    "danger-gradient",
    "warning-gradient",
    "info-gradient",
    "dark-gradient",
    "light-gradient"
  ].includes(e)
}, Hr = {
  type: String,
  validator: (e) => [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light",
    "white",
    "muted",
    "high-emphasis",
    "medium-emphasis",
    "disabled",
    "high-emphasis-inverse",
    "medium-emphasis-inverse",
    "disabled-inverse"
  ].includes(e)
}, Lf = S({
  name: "CAlert",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Optionally add a close button to alert and allow it to self dismisss.
     */
    dismissible: Boolean,
    /**
     * Set the alert variant to a solid.
     *
     * @values 'solid'
     */
    variant: {
      type: String,
      validator: (e) => e === "solid"
    },
    /**
     * Toggle the visibility of alert component.
     */
    visible: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = O(e.visible);
    E(() => e.visible, () => {
      a.value = e.visible;
    });
    const i = () => {
      a.value = !1, n("close");
    };
    return () => h(Qe, {
      enterFromClass: "",
      enterActiveClass: "fade",
      enterToClass: "fade show",
      leaveActiveClass: "fade"
    }, {
      default: () => a.value && h("div", {
        class: [
          "alert",
          e.variant === "solid" ? `bg-${e.color} text-white border-0` : `alert-${e.color}`,
          {
            [`alert-${e.color}`]: e.color,
            "alert-dismissible": e.dismissible
          }
        ]
      }, [
        t.default && t.default(),
        e.dismissible && h(Xn, {
          onClick: () => {
            i();
          }
        })
      ])
    });
  }
});
S({
  name: "CAlertHeading",
  props: {
    /**
     * 	Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h4"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: "alert-heading"
    }, t);
  }
});
S({
  name: "CAlertLink",
  setup(e, { slots: t }) {
    return () => h("a", {
      class: "alert-link"
    }, t);
  }
});
const $f = S({
  name: "CAvatar",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: fi,
    /**
     * Size the component small, large, or extra large.
     *
     * @values 'sm', 'md', 'lg', 'xl'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "md", "lg", "xl"].includes(e)
    },
    /**
     * The src attribute for the img element.
     */
    src: String,
    /**
     * Sets the color context of the status indicator to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    status: {
      type: String,
      validator: (e) => [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light"
      ].includes(e)
    },
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: Hr
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        "avatar",
        {
          [`bg-${e.color}`]: e.color,
          [`avatar-${e.size}`]: e.size,
          [`text-${e.textColor}`]: e.textColor
        },
        `${e.shape}`
      ]
    }, [
      e.src ? h("img", { src: e.src, class: "avatar-img" }) : t.default && t.default(),
      e.status && h("span", { class: ["avatar-status", `bg-${e.status}`] })
    ]);
  }
}), Wr = S({
  name: "CBackdrop",
  props: {
    /**
     * Toggle the visibility of modal component.
     */
    visible: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return () => h(Qe, {
      onEnter: (t) => {
        t.classList.add("show");
      },
      onLeave: (t) => {
        t.classList.remove("show");
      }
    }, () => e.visible && h("div", {
      class: "fade"
    }));
  }
}), Vc = S({
  name: "CBadge",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    },
    /**
     * Position badge in one of the corners of a link or button.
     *
     * @values 'top-start', 'top-end', 'bottom-end', 'bottom-start'
     */
    position: {
      type: String,
      validator: (e) => ["top-start", "top-end", "bottom-end", "bottom-start"].includes(e)
    },
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: fi,
    /**
     * Size the component small.
     *
     * @values 'sm'
     */
    size: {
      type: String,
      validator: (e) => e === "sm"
    },
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: Hr
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: [
        "badge",
        {
          [`bg-${e.color}`]: e.color,
          "position-absolute translate-middle": e.position,
          "top-0": e.position && e.position.includes("top"),
          "top-100": e.position && e.position.includes("bottom"),
          "start-100": e.position && e.position.includes("end"),
          "start-0": e.position && e.position.includes("start"),
          [`badge-${e.size}`]: e.size,
          [`text-${e.textColor}`]: e.textColor
        },
        e.shape
      ]
    }, t.default && t.default());
  }
}), Hc = S({
  name: "CBreadcrumbItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * The `href` attribute for the inner link component.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => h("li", {
      class: [
        "breadcrumb-item",
        {
          active: e.active
        }
      ],
      ...e.active && { "aria-current": "page" }
    }, e.href ? h("a", { href: e.href }, t.default && t.default()) : t.default && t.default());
  }
}), Wc = S({
  name: "CBreadcrumb",
  setup(e, { slots: t, attrs: n }) {
    return () => h("nav", {
      "aria-label": "breadcrumb"
    }, h("ol", { class: ["breadcrumb", n.class] }, t.default && t.default()));
  }
}), oe = S({
  name: "CButton",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "button"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String,
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: fi,
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Specifies the type of button. Always specify the type attribute for the `<button>` element.
     * Different browsers may use different default types for the `<button>` element.
     *
     * @values 'button', 'submit', 'reset'
     */
    type: {
      type: String,
      default: "button",
      validator: (e) => ["button", "submit", "reset"].includes(e)
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    variant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    }
  },
  emits: [
    /**
     * Event called when the user clicks on the button.
     */
    "click"
  ],
  setup(e, { emit: t, slots: n }) {
    const a = (i) => {
      e.disabled || t("click", i);
    };
    return () => h(e.component, {
      class: [
        "btn",
        e.variant ? `btn-${e.variant}-${e.color}` : `btn-${e.color}`,
        {
          [`btn-${e.size}`]: e.size,
          active: e.active,
          disabled: e.disabled
        },
        e.shape
      ],
      disabled: e.disabled && e.component !== "a",
      ...e.component === "a" && e.disabled && { "aria-disabled": !0, tabIndex: -1 },
      ...e.component === "a" && e.href && { href: e.href },
      ...e.component === "button" && { type: e.type },
      onClick: a
    }, n.default && n.default());
  }
});
S({
  name: "CButtonToolbar",
  setup(e, { slots: t }) {
    return () => h("div", { class: "btn-toolbar" }, t.default && t.default());
  }
});
const Bf = S({
  name: "CButtonGroup",
  props: {
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Create a set of buttons that appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.
     */
    vertical: Boolean
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        e.vertical ? "btn-group-vertical" : "btn-group",
        { [`btn-group-${e.size}`]: e.size }
      ]
    }, t.default && t.default());
  }
}), Jo = (e, t) => {
  const n = Math.ceil(e.length / t);
  return new Array(t).fill("").map((a, i) => e.slice(i * n, (i + 1) * n));
}, Ef = (e) => {
  const t = [], n = /* @__PURE__ */ new Date();
  n.setDate(1);
  for (let a = 0; a < 12; a++)
    n.setMonth(a), t.push(n.toLocaleString(e, { month: "short" }));
  return t;
}, If = (e) => {
  const t = [];
  for (let n = e - 6; n < e + 6; n++)
    t.push(n);
  return t;
}, Ff = (e, t, n) => {
  const a = [], i = new Date(e, t), r = i.getFullYear(), o = i.getMonth();
  let l = 6 - (6 - new Date(r, o, 1).getDay()) - n;
  n && (l = l < 0 ? 7 + l : l);
  for (let c = l * -1; c < 0; c++)
    a.push({
      date: new Date(r, o, c + 1),
      month: "previous"
    });
  return a;
}, Rf = (e, t) => {
  const n = [], a = new Date(e, t + 1, 0).getDate();
  for (let i = 1; i <= a; i++)
    n.push({
      date: new Date(e, t, i),
      month: "current"
    });
  return n;
}, Nf = (e, t, n, a) => {
  const i = [], r = 42 - (n.length + a.length);
  for (let o = 1; o <= r; o++)
    i.push({
      date: new Date(e, t + 1, o),
      month: "next"
    });
  return i;
}, jf = (e, t, n) => {
  const a = Ff(e, t, n), i = Rf(e, t), r = Nf(e, t, a, i), o = [...a, ...i, ...r], s = [];
  return o.forEach((l, c) => {
    (c % 7 === 0 || s.length === 0) && s.push([]), s[s.length - 1].push(l);
  }), s;
}, es = (e, t, n) => {
  if (e && t) {
    const a = new Date(e);
    let i = !1;
    for (; a < t; )
      if (a.setDate(a.getDate() + 1), Ln(a, null, null, n)) {
        i = !0;
        break;
      }
    return i;
  }
  return !1;
}, Ln = (e, t, n, a) => {
  let i;
  return a && a.forEach((r) => {
    Array.isArray(r) && Ia(e, r[0], r[1]) && (i = !0), r instanceof Date && ot(e, r) && (i = !0);
  }), t && e < t && (i = !0), n && e > n && (i = !0), i;
}, Ia = (e, t, n) => t && n && t <= e && e <= n, zf = (e, t, n) => t && ot(t, e) || n && ot(n, e), Vf = (e, t, n) => t && n && ot(n, e) && t < n, Hf = (e) => {
  const t = new Date(e.getTime()), n = t.getMonth();
  return t.setDate(t.getDate() + 1), t.getMonth() !== n;
}, ot = (e, t) => e instanceof Date && t instanceof Date ? e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear() : e === null && t === null, Wf = (e, t, n) => t && n && ot(t, e) && t < n, Yf = (e) => {
  const t = /* @__PURE__ */ new Date();
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}, Uf = S({
  name: "CCalendar",
  props: {
    /**
     * Default date of the component
     */
    calendarDate: [Date, String],
    /**
     * The number of calendars that render on desktop devices.
     */
    calendars: {
      type: Number,
      default: 1
    },
    /**
     * Set the format of day name.
     *
     * @default 'numeric'
     * @since 4.6.0
     */
    dayFormat: {
      type: [Function, String],
      default: "numeric",
      required: !1,
      validator: (e) => typeof e == "string" ? ["numeric", "2-digit"].includes(e) : typeof e == "function" || typeof e == "function"
    },
    /**
     * Specify the list of dates that cannot be selected.
     */
    disabledDates: {
      type: Array
    },
    /**
     * Initial selected to date (range).
     */
    endDate: [Date, String],
    /**
     * Sets the day of start week.
     * - 0 - Sunday,
     * - 1 - Monday,
     * - 2 - Tuesday,
     * - 3 - Wednesday,
     * - 4 - Thursday,
     * - 5 - Friday,
     * - 6 - Saturday,
     */
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    /**
     * Sets the default locale for components. If not set, it is inherited from the navigator.language.
     */
    locale: {
      type: String,
      default: "default"
    },
    /**
     * Max selectable date.
     */
    maxDate: [Date, String],
    /**
     * Min selectable date.
     */
    minDate: [Date, String],
    /**
     * Show arrows navigation.
     */
    navigation: {
      type: Boolean,
      default: !0
    },
    /**
     * Reorder year-month navigation, and render year first.
     *
     * @since 4.6.0
     */
    navYearFirst: Boolean,
    /**
     * Allow range selection.
     */
    range: Boolean,
    /**
     * Toggle select mode between start and end date.
     */
    selectEndDate: Boolean,
    /**
     * Set whether days in adjacent months shown before or after the current month are selectable. This only applies if the `showAdjacementDays` option is set to true.
     *
     * @since 4.9.0
     */
    selectAdjacementDays: Boolean,
    /**
     * Set whether to display dates in adjacent months (non-selectable) at the start and end of the current month.
     *
     * @since 4.9.0
     */
    showAdjacementDays: {
      type: Boolean,
      default: !0
    },
    /**
     * Initial selected date.
     */
    startDate: [Date, String],
    /**
     * Set length or format of day name.
     *
     * @type  number | 'long' | 'narrow' | 'short'
     */
    weekdayFormat: {
      type: [Function, Number, String],
      default: 2,
      validator: (e) => typeof e == "string" ? ["long", "narrow", "short"].includes(e) : typeof e == "number" || typeof e == "function"
    }
  },
  emits: [
    /**
     * Callback fired when the user hovers over the calendar cell.
     *
     * @property {Date | null} date
     */
    "calendar-cell-hover",
    /**
     * Callback fired when the calendar date changed.
     *
     * @property {Date | null} date
     */
    "calendar-date-change",
    /**
     * Callback fired when the start date changed.
     *
     * @property {Date | null} date
     */
    "start-date-change",
    /**
     * Callback fired when the end date changed.
     *
     * @property {Date | null} date
     */
    "end-date-change"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = O(e.calendarDate ? new Date(e.calendarDate) : e.startDate ? new Date(e.startDate) : /* @__PURE__ */ new Date()), i = O(e.startDate ? new Date(e.startDate) : null), r = O(e.endDate ? new Date(e.endDate) : null), o = O(null), s = O(e.maxDate ? new Date(e.maxDate) : null), l = O(e.minDate ? new Date(e.minDate) : null), c = O(e.selectEndDate), u = O("days");
    E(() => e.calendarDate, () => {
      e.calendarDate && (a.value = new Date(e.calendarDate));
    }), E(() => e.startDate, () => {
      const C = e.startDate ? new Date(e.startDate) : null;
      ot(C, i.value) || (i.value = C);
    }), E(() => e.endDate, () => {
      const C = e.endDate ? new Date(e.endDate) : null;
      ot(C, r.value) || (r.value = C);
    }), E(() => e.maxDate, () => {
      const C = e.maxDate ? new Date(e.maxDate) : null;
      ot(C, s.value) || (s.value = C);
    }), E(() => e.minDate, () => {
      const C = e.minDate ? new Date(e.minDate) : null;
      ot(C, l.value) || (l.value = C);
    }), E(() => e.selectEndDate, () => {
      c.value = e.selectEndDate;
    }), E(i, () => {
      n("start-date-change", i.value);
    }), E(r, () => {
      n("end-date-change", r.value);
    });
    const d = (C, k = 0, M) => {
      const L = a.value.getFullYear(), A = a.value.getMonth(), $ = new Date(L, A, 1);
      C && $.setFullYear($.getFullYear() + C), k && $.setMonth($.getMonth() + k), typeof M == "number" && $.setMonth(M), a.value = $, n("calendar-date-change", $);
    }, f = (C) => {
      if (!Ln(C, l.value, s.value, e.disabledDates)) {
        if (e.range) {
          if (c.value) {
            if (c.value = !1, i.value && i.value > C) {
              i.value = null, r.value = null;
              return;
            }
            if (es(i.value, C, e.disabledDates)) {
              i.value = null, r.value = null;
              return;
            }
            r.value = C;
            return;
          }
          if (r.value && r.value < C) {
            i.value = null, r.value = null;
            return;
          }
          if (es(C, r.value, e.disabledDates)) {
            i.value = null, r.value = null;
            return;
          }
          c.value = !0, i.value = C;
          return;
        }
        i.value = C;
      }
    }, g = (C, k) => {
      if (C.code === "Space" || C.key === "Enter") {
        C.preventDefault(), f && f(k);
        return;
      }
    }, m = (C) => {
      Ln(C, l.value, s.value, e.disabledDates) || (o.value = C, n("calendar-cell-hover", C));
    }, v = () => {
      o.value = null, n("calendar-cell-hover", null);
    }, p = (C, k) => {
      (C.code === "Space" || C.key === "Enter") && (d(0, k), u.value = "days");
    }, b = (C, k) => {
      (C.code === "Space" || C.key === "Enter") && (a.value = k, u.value = "months");
    }, y = (C, k = !1) => {
      if (C === "prev") {
        if (k) {
          d(u.value === "days" ? -1 : -10);
          return;
        }
        if (u.value !== "days") {
          d(-1);
          return;
        }
        d(0, -1);
        return;
      }
      if (C === "next") {
        if (k) {
          d(u.value === "days" ? 1 : 10);
          return;
        }
        if (u.value !== "days") {
          d(1);
          return;
        }
        d(0, 1);
        return;
      }
    }, w = (C) => {
      let k = a.value;
      C !== 0 && (k = new Date(a.value.getFullYear(), a.value.getMonth() + C, 1));
      const M = jf(k.getFullYear(), k.getMonth(), e.firstDayOfWeek), L = Jo(Ef(e.locale), 4), A = Jo(If(k.getFullYear()), 4), $ = M[0];
      return h("table", {}, [
        u.value === "days" && h("thead", {}, h("tr", {}, $.map(({ date: D }) => h("th", { class: "calendar-cell" }, h("div", {
          class: "calendar-header-cell-inner"
        }, typeof e.weekdayFormat == "function" ? e.weekdayFormat(D) : typeof e.weekdayFormat == "string" ? D.toLocaleDateString(e.locale, {
          weekday: e.weekdayFormat
        }) : D.toLocaleDateString(e.locale, { weekday: "long" }).slice(0, e.weekdayFormat)))))),
        h("tbody", {}, [
          u.value === "days" && M.map((D) => h("tr", {}, D.map(({ date: _, month: T }) => T === "current" || e.showAdjacementDays ? h("td", {
            class: [
              "calendar-cell",
              {
                today: Yf(_),
                disabled: Ln(_, l.value, s.value, e.disabledDates),
                [T]: !0,
                clickable: T !== "current" && e.selectAdjacementDays,
                last: Hf(_),
                range: T === "current" && Ia(_, i.value, r.value),
                "range-hover": T === "current" && (o.value && c.value ? Ia(_, i.value, o.value) : Ia(_, o.value, r.value)),
                selected: zf(_, i.value, r.value),
                start: Wf(_, i.value, r.value),
                end: Vf(_, i.value, r.value)
              }
            ],
            tabindex: (T === "current" || e.selectAdjacementDays) && !Ln(_, l.value, s.value, e.disabledDates) ? 0 : -1,
            title: _.toLocaleDateString(e.locale),
            ...(T === "current" || e.selectAdjacementDays) && {
              onBlur: () => v(),
              onClick: () => f(_),
              onFocus: () => m(_),
              onKeydown: (P) => g(P, _),
              onmouseenter: () => m(_),
              onmouseleave: () => v()
            },
            ...T !== "current" && !e.selectAdjacementDays && {
              onMouseEnter: () => v()
            }
          }, h("div", {
            class: "calendar-cell-inner"
          }, typeof e.dayFormat == "function" ? e.dayFormat(_) : _.toLocaleDateString(e.locale, {
            day: e.dayFormat
          }))) : h("td")))),
          u.value === "months" && L.map((D, _) => h("tr", {}, D.map((T, P) => h("td", {
            class: "calendar-cell month",
            onClick: () => {
              d(0, 0, _ * 3 + P - C), u.value = "days";
            },
            onKeydown: (B) => p(B, _ * 3 + P - C),
            tabindex: 0
          }, h("div", { class: "calendar-cell-inner" }, T))))),
          u.value === "years" && A.map((D) => h("tr", {}, D.map((_) => h("td", {
            class: "calendar-cell year",
            onClick: () => {
              a.value = new Date(_, k.getMonth() - C, k.getDate()), u.value = "months";
            },
            onKeydown: (T) => b(T, new Date(_, k.getMonth() - C, k.getDate())),
            tabindex: 0
          }, h("div", { class: "calendar-cell-inner" }, _)))))
        ])
      ]);
    }, x = (C) => {
      let k = a.value;
      return C !== 0 && (k = new Date(a.value.getFullYear(), a.value.getMonth() + C, 1)), h("div", { class: "calendar-nav" }, [
        e.navigation && h("div", {
          class: "calendar-nav-prev"
        }, [
          h(oe, {
            color: "transparent",
            size: "sm",
            onClick: () => y("prev", !0)
          }, {
            /**
             * @slot Location for double previous icon.
             */
            default: () => t.navPrevDoubleIcon ? t.navPrevDoubleIcon() : h("span", { class: "calendar-nav-icon calendar-nav-icon-double-prev" })
          }),
          u.value === "days" && h(oe, {
            color: "transparent",
            size: "sm",
            onClick: () => y("prev")
          }, {
            /**
             * @slot Location for previous icon.
             */
            default: () => t.navPrevIcon ? t.navPrevIcon() : h("span", { class: "calendar-nav-icon calendar-nav-icon-prev" })
          })
        ]),
        h("div", {
          class: "calendar-nav-date",
          ...e.navYearFirst && { style: { display: "flex", justifyContent: "center" } }
        }, [
          u.value === "days" && h(oe, {
            color: "transparent",
            size: "sm",
            onClick: () => {
              e.navigation && (u.value = "months");
            }
          }, () => k.toLocaleDateString(e.locale, { month: "long" })),
          h(oe, {
            color: "transparent",
            size: "sm",
            onClick: () => {
              e.navigation && (u.value = "years");
            },
            ...e.navYearFirst && { style: { order: "-1" } }
          }, () => k.toLocaleDateString(e.locale, { year: "numeric" }))
        ]),
        e.navigation && h("div", {
          class: "calendar-nav-next"
        }, [
          u.value === "days" && h(oe, {
            color: "transparent",
            size: "sm",
            onClick: () => y("next")
          }, {
            /**
             * @slot Location for next icon.
             */
            default: () => t.navNextIcon ? t.navNextIcon() : h("span", { class: "calendar-nav-icon calendar-nav-icon-next" })
          }),
          h(oe, {
            color: "transparent",
            size: "sm",
            onClick: () => y("next", !0)
          }, {
            /**
             * @slot Location for double next icon.
             */
            default: () => t.navNextDoubleIcon ? t.navNextDoubleIcon() : h("span", { class: "calendar-nav-icon calendar-nav-icon-double-next" })
          })
        ])
      ]);
    };
    return () => h("div", { class: "calendars" }, [
      Array.from({ length: e.calendars }, (C, k) => h("div", { class: ["calendar", u.value] }, [x(k), w(k)]))
    ]);
  }
}), qf = S({
  name: "CCallout",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        "callout",
        {
          [`callout-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), Wt = S({
  name: "CCard",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Sets the text color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: Hr
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        "card",
        {
          [`bg-${e.color}`]: e.color,
          [`text-${e.textColor}`]: e.textColor
        }
      ]
    }, t.default && t.default());
  }
}), Yt = S({
  name: "CCardBody",
  setup(e, { slots: t }) {
    return () => h("div", { class: "card-body" }, t.default && t.default());
  }
}), Yc = S({
  name: "CCardFooter",
  setup(e, { slots: t }) {
    return () => h("div", { class: "card-footer" }, t.default && t.default());
  }
});
S({
  name: "CCardGroup",
  setup(e, { slots: t }) {
    return () => h("div", { class: "card-group" }, t.default && t.default());
  }
});
const Yr = S({
  name: "CCardHeader",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "card-header" }, t.default && t.default());
  }
}), Gf = S({
  name: "CCardImage",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "img"
    },
    /**
     * Optionally orientate the image to the top, bottom.
     *
     * @values 'top', 'bottom'
     */
    orientation: {
      type: String,
      validator: (e) => ["top", "bottom"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: `card-img${e.orientation ? `-${e.orientation}` : ""}`
    }, t.default && t.default());
  }
}), Kf = S({
  name: "CCardImageOverlay",
  setup(e, { slots: t }) {
    return () => h("div", { class: "card-img-overlay" }, t.default && t.default());
  }
}), la = S({
  name: "CLink",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  emits: [
    /**
     * Event called when the user clicks on the component.
     */
    "click"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = () => {
      n("click", e.href);
    };
    return () => h(e.component, {
      class: [{ active: e.active, disabled: e.disabled }],
      ...e.active && { "aria-current": "page" },
      ...e.component === "a" && e.disabled && { "aria-disabled": !0, tabIndex: -1 },
      ...(e.component === "a" || e.component === "button") && {
        onClick: a
      },
      href: e.href
    }, t.default && t.default());
  }
}), Xf = S({
  name: "CCardLink",
  props: {
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: {
      type: String,
      default: "#"
    }
  },
  setup(e, { slots: t }) {
    return () => h(la, { class: "card-link", href: e.href }, { default: () => t.default && t.default() });
  }
}), Uc = S({
  name: "CCardSubtitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h6"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "card-subtitle" }, t.default && t.default());
  }
}), Zf = S({
  name: "CCardText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "p"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "card-text" }, t.default && t.default());
  }
}), Ur = S({
  name: "CCardTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "card-title" }, t.default && t.default());
  }
}), Zn = (e) => typeof document < "u" && document.documentElement.dir === "rtl" ? !0 : e ? e.closest('[dir="rtl"]') !== null : !1, qc = (e, t) => {
  switch (e) {
    case "right":
      return Zn(t) ? "left" : "right";
    case "left":
      return Zn(t) ? "right" : "left";
    default:
      return e;
  }
}, Jt = (e) => {
  const t = e.getBoundingClientRect();
  return Math.floor(t.top) >= 0 && Math.floor(t.left) >= 0 && Math.floor(t.bottom) <= (window.innerHeight || document.documentElement.clientHeight) && Math.floor(t.right) <= (window.innerWidth || document.documentElement.clientWidth);
}, cr = (e, t, n = []) => e.some((a) => {
  let i = !0;
  for (const r in t)
    if (!n.includes(r) && t[r] !== a[r]) {
      i = !1;
      break;
    }
  return i;
}), Qf = S({
  name: "CCarousel",
  props: {
    /**
     * Adding in the previous and next controls.
     */
    controls: Boolean,
    /**
     * Add darker controls, indicators, and captions.
     */
    dark: Boolean,
    /**
     * index of the active item.
     */
    index: {
      type: Number,
      default: 0
    },
    /**
     * Adding indicators at the bottom of the carousel for each item.
     */
    indicators: Boolean,
    /**
     * The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.
     */
    interval: {
      type: [Boolean, Number],
      default: 5e3
    },
    /**
     * If set to 'hover', pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave. If set to false, hovering over the carousel won't pause it.
     */
    pause: {
      type: [Boolean, String],
      default: "hover",
      validator: (e) => typeof e == "boolean" || e === "hover"
    },
    /**
     * Set type of the transition.
     *
     * @values 'crossfade', 'slide'
     */
    transition: {
      type: String,
      default: "slide",
      validator: (e) => ["crossfade", "slide"].includes(e)
    },
    /**
     * Set whether the carousel should cycle continuously or have hard stops.
     */
    wrap: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, { slots: t }) {
    const n = O(), a = O(e.index), i = O(!1), r = O(e.interval), o = O("next"), s = O([]), l = O(), c = O(), u = (y) => {
      i.value = y;
    }, d = (y) => {
      r.value = y;
    };
    ue("setAnimating", u), ue("setCustomInterval", d);
    const f = () => l.value && clearInterval(l.value), g = () => {
      f(), typeof e.interval == "number" && (l.value = setTimeout(() => v(), typeof r.value == "number" ? r.value : e.interval));
    }, m = (y) => {
      i.value || (o.value = y, y === "next" ? a.value === s.value.length - 1 ? a.value = 0 : a.value++ : a.value === 0 ? a.value = s.value.length - 1 : a.value--);
    }, v = () => {
      !document.hidden && n.value && Jt(n.value) && m("next");
    }, p = (y) => {
      if (a.value !== y) {
        if (a.value < y) {
          o.value = "next", a.value = y;
          return;
        }
        a.value > y && (o.value = "prev", a.value = y);
      }
    }, b = () => {
      c.value = !!(!document.hidden && n.value && Jt(n.value));
    };
    return hf(() => {
      if (t.default) {
        const y = typeof t.default()[0].type == "symbol" ? t.default()[0].children : t.default();
        y && Array.isArray(y) && (s.value = y.filter((w) => w.type.name === "CCarouselItem"));
      }
    }), _e(() => {
      window.addEventListener("scroll", b);
    }), zr(() => {
      E(i, () => {
        if (e.wrap) {
          !i.value && g();
          return;
        }
        !e.wrap && a.value < s.value.length - 1 && !i.value && g();
      });
    }), E(c, () => {
      c.value && g();
    }), () => h("div", {
      class: [
        "carousel slide",
        e.transition === "crossfade" && "carousel-fade",
        e.dark && "carousel-dark"
      ],
      onmouseover: () => e.pause && f(),
      onmouseleave: () => g(),
      ref: n
    }, [
      e.indicators && h("div", {
        class: "carousel-indicators"
      }, s.value.map((y, w) => h("button", {
        type: "button",
        id: w,
        "data-coreui-target": "",
        ...a.value === w && { class: "active" },
        onClick: () => p(w)
      }))),
      h("div", { class: "carousel-inner" }, s.value.map((y, w) => h(y, {
        active: a.value === w,
        direction: o.value
      }))),
      e.controls && [
        h("button", {
          type: "button",
          class: "carousel-control-prev",
          "data-coreui-target": "",
          onClick: () => m("prev")
        }, [
          h("span", { class: "carousel-control-prev-icon", ariaHidden: "true" }),
          h("span", { class: "visually-hidden" }, "Previous")
        ]),
        h("button", {
          type: "button",
          class: "carousel-control-next",
          "data-coreui-target": "",
          onClick: () => m("next")
        }, [
          h("span", { class: "carousel-control-next-icon", ariaHidden: "true" }),
          h("span", { class: "visually-hidden" }, "Next")
        ])
      ]
    ]);
  }
});
S({
  name: "CCarouselCaption",
  setup(e, { slots: t }) {
    return () => h("div", {
      class: "carousel-caption"
    }, t.default && t.default());
  }
});
const Jf = S({
  name: "CCarouselItem",
  props: {
    /**
     * @ignore
     */
    active: {
      type: Boolean,
      default: !1
    },
    /**
     * @ignore
     */
    direction: {
      type: String,
      default: "next"
    },
    /**
     * The amount of time to delay between automatically cycling an item.
     */
    interval: {
      type: [Boolean, Number],
      default: !1
    }
  },
  setup(e, { slots: t }) {
    const n = O(), { active: a } = gf(e), i = O(), r = O(), o = O(a.value && "active"), s = ae("setAnimating"), l = ae("setCustomInterval");
    return E(a, (c, u) => {
      c && l(e.interval), !u && c && (r.value = `carousel-item-${e.direction}`, l(e.interval)), setTimeout(() => {
        u && !c && (o.value = "active"), i.value = `carousel-item-${e.direction === "next" ? "start" : "end"}`;
      }, 0), n.value.addEventListener("transitionstart", () => {
        s(!0);
      }), n.value.addEventListener("transitionend", () => {
        s(!1), c && (i.value = "", r.value = "", o.value = "active"), c || (i.value = "", r.value = "", o.value = "");
      });
    }), () => h("div", {
      class: [
        "carousel-item",
        o.value,
        i.value,
        r.value
      ],
      ref: n
    }, t.default && t.default());
  }
});
function za(e) {
  "@babel/helpers - typeof";
  return za = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, za(e);
}
function Nt(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function ge(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function Je(e) {
  ge(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || za(e) === "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
}
function eh(e, t) {
  ge(2, arguments);
  var n = Je(e).getTime(), a = Nt(t);
  return new Date(n + a);
}
var th = {};
function hi() {
  return th;
}
function nh(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
function ah(e) {
  return ge(1, arguments), e instanceof Date || za(e) === "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ih(e) {
  if (ge(1, arguments), !ah(e) && typeof e != "number")
    return !1;
  var t = Je(e);
  return !isNaN(Number(t));
}
function rh(e, t) {
  ge(2, arguments);
  var n = Nt(t);
  return eh(e, -n);
}
var oh = 864e5;
function sh(e) {
  ge(1, arguments);
  var t = Je(e), n = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var a = t.getTime(), i = n - a;
  return Math.floor(i / oh) + 1;
}
function Va(e) {
  ge(1, arguments);
  var t = 1, n = Je(e), a = n.getUTCDay(), i = (a < t ? 7 : 0) + a - t;
  return n.setUTCDate(n.getUTCDate() - i), n.setUTCHours(0, 0, 0, 0), n;
}
function Gc(e) {
  ge(1, arguments);
  var t = Je(e), n = t.getUTCFullYear(), a = /* @__PURE__ */ new Date(0);
  a.setUTCFullYear(n + 1, 0, 4), a.setUTCHours(0, 0, 0, 0);
  var i = Va(a), r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(n, 0, 4), r.setUTCHours(0, 0, 0, 0);
  var o = Va(r);
  return t.getTime() >= i.getTime() ? n + 1 : t.getTime() >= o.getTime() ? n : n - 1;
}
function lh(e) {
  ge(1, arguments);
  var t = Gc(e), n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0);
  var a = Va(n);
  return a;
}
var ch = 6048e5;
function uh(e) {
  ge(1, arguments);
  var t = Je(e), n = Va(t).getTime() - lh(t).getTime();
  return Math.round(n / ch) + 1;
}
function Ha(e, t) {
  var n, a, i, r, o, s, l, c;
  ge(1, arguments);
  var u = hi(), d = Nt((n = (a = (i = (r = t == null ? void 0 : t.weekStartsOn) !== null && r !== void 0 ? r : t == null || (o = t.locale) === null || o === void 0 || (s = o.options) === null || s === void 0 ? void 0 : s.weekStartsOn) !== null && i !== void 0 ? i : u.weekStartsOn) !== null && a !== void 0 ? a : (l = u.locale) === null || l === void 0 || (c = l.options) === null || c === void 0 ? void 0 : c.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var f = Je(e), g = f.getUTCDay(), m = (g < d ? 7 : 0) + g - d;
  return f.setUTCDate(f.getUTCDate() - m), f.setUTCHours(0, 0, 0, 0), f;
}
function Kc(e, t) {
  var n, a, i, r, o, s, l, c;
  ge(1, arguments);
  var u = Je(e), d = u.getUTCFullYear(), f = hi(), g = Nt((n = (a = (i = (r = t == null ? void 0 : t.firstWeekContainsDate) !== null && r !== void 0 ? r : t == null || (o = t.locale) === null || o === void 0 || (s = o.options) === null || s === void 0 ? void 0 : s.firstWeekContainsDate) !== null && i !== void 0 ? i : f.firstWeekContainsDate) !== null && a !== void 0 ? a : (l = f.locale) === null || l === void 0 || (c = l.options) === null || c === void 0 ? void 0 : c.firstWeekContainsDate) !== null && n !== void 0 ? n : 1);
  if (!(g >= 1 && g <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var m = /* @__PURE__ */ new Date(0);
  m.setUTCFullYear(d + 1, 0, g), m.setUTCHours(0, 0, 0, 0);
  var v = Ha(m, t), p = /* @__PURE__ */ new Date(0);
  p.setUTCFullYear(d, 0, g), p.setUTCHours(0, 0, 0, 0);
  var b = Ha(p, t);
  return u.getTime() >= v.getTime() ? d + 1 : u.getTime() >= b.getTime() ? d : d - 1;
}
function dh(e, t) {
  var n, a, i, r, o, s, l, c;
  ge(1, arguments);
  var u = hi(), d = Nt((n = (a = (i = (r = t == null ? void 0 : t.firstWeekContainsDate) !== null && r !== void 0 ? r : t == null || (o = t.locale) === null || o === void 0 || (s = o.options) === null || s === void 0 ? void 0 : s.firstWeekContainsDate) !== null && i !== void 0 ? i : u.firstWeekContainsDate) !== null && a !== void 0 ? a : (l = u.locale) === null || l === void 0 || (c = l.options) === null || c === void 0 ? void 0 : c.firstWeekContainsDate) !== null && n !== void 0 ? n : 1), f = Kc(e, t), g = /* @__PURE__ */ new Date(0);
  g.setUTCFullYear(f, 0, d), g.setUTCHours(0, 0, 0, 0);
  var m = Ha(g, t);
  return m;
}
var fh = 6048e5;
function hh(e, t) {
  ge(1, arguments);
  var n = Je(e), a = Ha(n, t).getTime() - dh(n, t).getTime();
  return Math.round(a / fh) + 1;
}
function H(e, t) {
  for (var n = e < 0 ? "-" : "", a = Math.abs(e).toString(); a.length < t; )
    a = "0" + a;
  return n + a;
}
var gh = {
  // Year
  y: function(t, n) {
    var a = t.getUTCFullYear(), i = a > 0 ? a : 1 - a;
    return H(n === "yy" ? i % 100 : i, n.length);
  },
  // Month
  M: function(t, n) {
    var a = t.getUTCMonth();
    return n === "M" ? String(a + 1) : H(a + 1, 2);
  },
  // Day of the month
  d: function(t, n) {
    return H(t.getUTCDate(), n.length);
  },
  // AM or PM
  a: function(t, n) {
    var a = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (n) {
      case "a":
      case "aa":
        return a.toUpperCase();
      case "aaa":
        return a;
      case "aaaaa":
        return a[0];
      case "aaaa":
      default:
        return a === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function(t, n) {
    return H(t.getUTCHours() % 12 || 12, n.length);
  },
  // Hour [0-23]
  H: function(t, n) {
    return H(t.getUTCHours(), n.length);
  },
  // Minute
  m: function(t, n) {
    return H(t.getUTCMinutes(), n.length);
  },
  // Second
  s: function(t, n) {
    return H(t.getUTCSeconds(), n.length);
  },
  // Fraction of second
  S: function(t, n) {
    var a = n.length, i = t.getUTCMilliseconds(), r = Math.floor(i * Math.pow(10, a - 3));
    return H(r, n.length);
  }
}, ht = gh, Xt = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, mh = {
  // Era
  G: function(t, n, a) {
    var i = t.getUTCFullYear() > 0 ? 1 : 0;
    switch (n) {
      case "G":
      case "GG":
      case "GGG":
        return a.era(i, {
          width: "abbreviated"
        });
      case "GGGGG":
        return a.era(i, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return a.era(i, {
          width: "wide"
        });
    }
  },
  // Year
  y: function(t, n, a) {
    if (n === "yo") {
      var i = t.getUTCFullYear(), r = i > 0 ? i : 1 - i;
      return a.ordinalNumber(r, {
        unit: "year"
      });
    }
    return ht.y(t, n);
  },
  // Local week-numbering year
  Y: function(t, n, a, i) {
    var r = Kc(t, i), o = r > 0 ? r : 1 - r;
    if (n === "YY") {
      var s = o % 100;
      return H(s, 2);
    }
    return n === "Yo" ? a.ordinalNumber(o, {
      unit: "year"
    }) : H(o, n.length);
  },
  // ISO week-numbering year
  R: function(t, n) {
    var a = Gc(t);
    return H(a, n.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(t, n) {
    var a = t.getUTCFullYear();
    return H(a, n.length);
  },
  // Quarter
  Q: function(t, n, a) {
    var i = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (n) {
      case "Q":
        return String(i);
      case "QQ":
        return H(i, 2);
      case "Qo":
        return a.ordinalNumber(i, {
          unit: "quarter"
        });
      case "QQQ":
        return a.quarter(i, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return a.quarter(i, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return a.quarter(i, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(t, n, a) {
    var i = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (n) {
      case "q":
        return String(i);
      case "qq":
        return H(i, 2);
      case "qo":
        return a.ordinalNumber(i, {
          unit: "quarter"
        });
      case "qqq":
        return a.quarter(i, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return a.quarter(i, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return a.quarter(i, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(t, n, a) {
    var i = t.getUTCMonth();
    switch (n) {
      case "M":
      case "MM":
        return ht.M(t, n);
      case "Mo":
        return a.ordinalNumber(i + 1, {
          unit: "month"
        });
      case "MMM":
        return a.month(i, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return a.month(i, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return a.month(i, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function(t, n, a) {
    var i = t.getUTCMonth();
    switch (n) {
      case "L":
        return String(i + 1);
      case "LL":
        return H(i + 1, 2);
      case "Lo":
        return a.ordinalNumber(i + 1, {
          unit: "month"
        });
      case "LLL":
        return a.month(i, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return a.month(i, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return a.month(i, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function(t, n, a, i) {
    var r = hh(t, i);
    return n === "wo" ? a.ordinalNumber(r, {
      unit: "week"
    }) : H(r, n.length);
  },
  // ISO week of year
  I: function(t, n, a) {
    var i = uh(t);
    return n === "Io" ? a.ordinalNumber(i, {
      unit: "week"
    }) : H(i, n.length);
  },
  // Day of the month
  d: function(t, n, a) {
    return n === "do" ? a.ordinalNumber(t.getUTCDate(), {
      unit: "date"
    }) : ht.d(t, n);
  },
  // Day of year
  D: function(t, n, a) {
    var i = sh(t);
    return n === "Do" ? a.ordinalNumber(i, {
      unit: "dayOfYear"
    }) : H(i, n.length);
  },
  // Day of week
  E: function(t, n, a) {
    var i = t.getUTCDay();
    switch (n) {
      case "E":
      case "EE":
      case "EEE":
        return a.day(i, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return a.day(i, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return a.day(i, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return a.day(i, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(t, n, a, i) {
    var r = t.getUTCDay(), o = (r - i.weekStartsOn + 8) % 7 || 7;
    switch (n) {
      case "e":
        return String(o);
      case "ee":
        return H(o, 2);
      case "eo":
        return a.ordinalNumber(o, {
          unit: "day"
        });
      case "eee":
        return a.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return a.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return a.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return a.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(t, n, a, i) {
    var r = t.getUTCDay(), o = (r - i.weekStartsOn + 8) % 7 || 7;
    switch (n) {
      case "c":
        return String(o);
      case "cc":
        return H(o, n.length);
      case "co":
        return a.ordinalNumber(o, {
          unit: "day"
        });
      case "ccc":
        return a.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return a.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return a.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return a.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(t, n, a) {
    var i = t.getUTCDay(), r = i === 0 ? 7 : i;
    switch (n) {
      case "i":
        return String(r);
      case "ii":
        return H(r, n.length);
      case "io":
        return a.ordinalNumber(r, {
          unit: "day"
        });
      case "iii":
        return a.day(i, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return a.day(i, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return a.day(i, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return a.day(i, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(t, n, a) {
    var i = t.getUTCHours(), r = i / 12 >= 1 ? "pm" : "am";
    switch (n) {
      case "a":
      case "aa":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return a.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return a.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(t, n, a) {
    var i = t.getUTCHours(), r;
    switch (i === 12 ? r = Xt.noon : i === 0 ? r = Xt.midnight : r = i / 12 >= 1 ? "pm" : "am", n) {
      case "b":
      case "bb":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return a.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return a.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(t, n, a) {
    var i = t.getUTCHours(), r;
    switch (i >= 17 ? r = Xt.evening : i >= 12 ? r = Xt.afternoon : i >= 4 ? r = Xt.morning : r = Xt.night, n) {
      case "B":
      case "BB":
      case "BBB":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return a.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return a.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(t, n, a) {
    if (n === "ho") {
      var i = t.getUTCHours() % 12;
      return i === 0 && (i = 12), a.ordinalNumber(i, {
        unit: "hour"
      });
    }
    return ht.h(t, n);
  },
  // Hour [0-23]
  H: function(t, n, a) {
    return n === "Ho" ? a.ordinalNumber(t.getUTCHours(), {
      unit: "hour"
    }) : ht.H(t, n);
  },
  // Hour [0-11]
  K: function(t, n, a) {
    var i = t.getUTCHours() % 12;
    return n === "Ko" ? a.ordinalNumber(i, {
      unit: "hour"
    }) : H(i, n.length);
  },
  // Hour [1-24]
  k: function(t, n, a) {
    var i = t.getUTCHours();
    return i === 0 && (i = 24), n === "ko" ? a.ordinalNumber(i, {
      unit: "hour"
    }) : H(i, n.length);
  },
  // Minute
  m: function(t, n, a) {
    return n === "mo" ? a.ordinalNumber(t.getUTCMinutes(), {
      unit: "minute"
    }) : ht.m(t, n);
  },
  // Second
  s: function(t, n, a) {
    return n === "so" ? a.ordinalNumber(t.getUTCSeconds(), {
      unit: "second"
    }) : ht.s(t, n);
  },
  // Fraction of second
  S: function(t, n) {
    return ht.S(t, n);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(t, n, a, i) {
    var r = i._originalDate || t, o = r.getTimezoneOffset();
    if (o === 0)
      return "Z";
    switch (n) {
      case "X":
        return ns(o);
      case "XXXX":
      case "XX":
        return At(o);
      case "XXXXX":
      case "XXX":
      default:
        return At(o, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(t, n, a, i) {
    var r = i._originalDate || t, o = r.getTimezoneOffset();
    switch (n) {
      case "x":
        return ns(o);
      case "xxxx":
      case "xx":
        return At(o);
      case "xxxxx":
      case "xxx":
      default:
        return At(o, ":");
    }
  },
  // Timezone (GMT)
  O: function(t, n, a, i) {
    var r = i._originalDate || t, o = r.getTimezoneOffset();
    switch (n) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + ts(o, ":");
      case "OOOO":
      default:
        return "GMT" + At(o, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(t, n, a, i) {
    var r = i._originalDate || t, o = r.getTimezoneOffset();
    switch (n) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + ts(o, ":");
      case "zzzz":
      default:
        return "GMT" + At(o, ":");
    }
  },
  // Seconds timestamp
  t: function(t, n, a, i) {
    var r = i._originalDate || t, o = Math.floor(r.getTime() / 1e3);
    return H(o, n.length);
  },
  // Milliseconds timestamp
  T: function(t, n, a, i) {
    var r = i._originalDate || t, o = r.getTime();
    return H(o, n.length);
  }
};
function ts(e, t) {
  var n = e > 0 ? "-" : "+", a = Math.abs(e), i = Math.floor(a / 60), r = a % 60;
  if (r === 0)
    return n + String(i);
  var o = t;
  return n + String(i) + o + H(r, 2);
}
function ns(e, t) {
  if (e % 60 === 0) {
    var n = e > 0 ? "-" : "+";
    return n + H(Math.abs(e) / 60, 2);
  }
  return At(e, t);
}
function At(e, t) {
  var n = t || "", a = e > 0 ? "-" : "+", i = Math.abs(e), r = H(Math.floor(i / 60), 2), o = H(i % 60, 2);
  return a + r + n + o;
}
var vh = mh, as = function(t, n) {
  switch (t) {
    case "P":
      return n.date({
        width: "short"
      });
    case "PP":
      return n.date({
        width: "medium"
      });
    case "PPP":
      return n.date({
        width: "long"
      });
    case "PPPP":
    default:
      return n.date({
        width: "full"
      });
  }
}, Xc = function(t, n) {
  switch (t) {
    case "p":
      return n.time({
        width: "short"
      });
    case "pp":
      return n.time({
        width: "medium"
      });
    case "ppp":
      return n.time({
        width: "long"
      });
    case "pppp":
    default:
      return n.time({
        width: "full"
      });
  }
}, ph = function(t, n) {
  var a = t.match(/(P+)(p+)?/) || [], i = a[1], r = a[2];
  if (!r)
    return as(t, n);
  var o;
  switch (i) {
    case "P":
      o = n.dateTime({
        width: "short"
      });
      break;
    case "PP":
      o = n.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      o = n.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      o = n.dateTime({
        width: "full"
      });
      break;
  }
  return o.replace("{{date}}", as(i, n)).replace("{{time}}", Xc(r, n));
}, bh = {
  p: Xc,
  P: ph
}, yh = bh, Ch = ["D", "DD"], xh = ["YY", "YYYY"];
function _h(e) {
  return Ch.indexOf(e) !== -1;
}
function wh(e) {
  return xh.indexOf(e) !== -1;
}
function is(e, t, n) {
  if (e === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t, "`) for formatting years to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(t, "`) for formatting years to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(t, "`) for formatting days of the month to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(t, "`) for formatting days of the month to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var Sh = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, kh = function(t, n, a) {
  var i, r = Sh[t];
  return typeof r == "string" ? i = r : n === 1 ? i = r.one : i = r.other.replace("{{count}}", n.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "in " + i : i + " ago" : i;
}, Oh = kh;
function Hi(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.width ? String(t.width) : e.defaultWidth, a = e.formats[n] || e.formats[e.defaultWidth];
    return a;
  };
}
var Dh = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Ph = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Mh = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Th = {
  date: Hi({
    formats: Dh,
    defaultWidth: "full"
  }),
  time: Hi({
    formats: Ph,
    defaultWidth: "full"
  }),
  dateTime: Hi({
    formats: Mh,
    defaultWidth: "full"
  })
}, Ah = Th, Lh = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, $h = function(t, n, a, i) {
  return Lh[t];
}, Bh = $h;
function _n(e) {
  return function(t, n) {
    var a = n != null && n.context ? String(n.context) : "standalone", i;
    if (a === "formatting" && e.formattingValues) {
      var r = e.defaultFormattingWidth || e.defaultWidth, o = n != null && n.width ? String(n.width) : r;
      i = e.formattingValues[o] || e.formattingValues[r];
    } else {
      var s = e.defaultWidth, l = n != null && n.width ? String(n.width) : e.defaultWidth;
      i = e.values[l] || e.values[s];
    }
    var c = e.argumentCallback ? e.argumentCallback(t) : t;
    return i[c];
  };
}
var Eh = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Ih = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Fh = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, Rh = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, Nh = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, jh = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, zh = function(t, n) {
  var a = Number(t), i = a % 100;
  if (i > 20 || i < 10)
    switch (i % 10) {
      case 1:
        return a + "st";
      case 2:
        return a + "nd";
      case 3:
        return a + "rd";
    }
  return a + "th";
}, Vh = {
  ordinalNumber: zh,
  era: _n({
    values: Eh,
    defaultWidth: "wide"
  }),
  quarter: _n({
    values: Ih,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: _n({
    values: Fh,
    defaultWidth: "wide"
  }),
  day: _n({
    values: Rh,
    defaultWidth: "wide"
  }),
  dayPeriod: _n({
    values: Nh,
    defaultWidth: "wide",
    formattingValues: jh,
    defaultFormattingWidth: "wide"
  })
}, Hh = Vh;
function wn(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.width, i = a && e.matchPatterns[a] || e.matchPatterns[e.defaultMatchWidth], r = t.match(i);
    if (!r)
      return null;
    var o = r[0], s = a && e.parsePatterns[a] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(s) ? Yh(s, function(d) {
      return d.test(o);
    }) : Wh(s, function(d) {
      return d.test(o);
    }), c;
    c = e.valueCallback ? e.valueCallback(l) : l, c = n.valueCallback ? n.valueCallback(c) : c;
    var u = t.slice(o.length);
    return {
      value: c,
      rest: u
    };
  };
}
function Wh(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n) && t(e[n]))
      return n;
}
function Yh(e, t) {
  for (var n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Uh(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = t.match(e.matchPattern);
    if (!a)
      return null;
    var i = a[0], r = t.match(e.parsePattern);
    if (!r)
      return null;
    var o = e.valueCallback ? e.valueCallback(r[0]) : r[0];
    o = n.valueCallback ? n.valueCallback(o) : o;
    var s = t.slice(i.length);
    return {
      value: o,
      rest: s
    };
  };
}
var qh = /^(\d+)(th|st|nd|rd)?/i, Gh = /\d+/i, Kh = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Xh = {
  any: [/^b/i, /^(a|c)/i]
}, Zh = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Qh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Jh = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, e1 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, t1 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, n1 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, a1 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, i1 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, r1 = {
  ordinalNumber: Uh({
    matchPattern: qh,
    parsePattern: Gh,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: wn({
    matchPatterns: Kh,
    defaultMatchWidth: "wide",
    parsePatterns: Xh,
    defaultParseWidth: "any"
  }),
  quarter: wn({
    matchPatterns: Zh,
    defaultMatchWidth: "wide",
    parsePatterns: Qh,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: wn({
    matchPatterns: Jh,
    defaultMatchWidth: "wide",
    parsePatterns: e1,
    defaultParseWidth: "any"
  }),
  day: wn({
    matchPatterns: t1,
    defaultMatchWidth: "wide",
    parsePatterns: n1,
    defaultParseWidth: "any"
  }),
  dayPeriod: wn({
    matchPatterns: a1,
    defaultMatchWidth: "any",
    parsePatterns: i1,
    defaultParseWidth: "any"
  })
}, o1 = r1, s1 = {
  code: "en-US",
  formatDistance: Oh,
  formatLong: Ah,
  formatRelative: Bh,
  localize: Hh,
  match: o1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, l1 = s1, c1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, u1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, d1 = /^'([^]*?)'?$/, f1 = /''/g, h1 = /[a-zA-Z]/;
function g1(e, t, n) {
  var a, i, r, o, s, l, c, u, d, f, g, m, v, p;
  ge(2, arguments);
  var b = String(t), y = hi(), w = (a = (i = void 0) !== null && i !== void 0 ? i : y.locale) !== null && a !== void 0 ? a : l1, x = Nt((r = (o = (s = (l = void 0) !== null && l !== void 0 ? l : void 0) !== null && s !== void 0 ? s : y.firstWeekContainsDate) !== null && o !== void 0 ? o : (c = y.locale) === null || c === void 0 || (u = c.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && r !== void 0 ? r : 1);
  if (!(x >= 1 && x <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var C = Nt((d = (f = (g = (m = void 0) !== null && m !== void 0 ? m : void 0) !== null && g !== void 0 ? g : y.weekStartsOn) !== null && f !== void 0 ? f : (v = y.locale) === null || v === void 0 || (p = v.options) === null || p === void 0 ? void 0 : p.weekStartsOn) !== null && d !== void 0 ? d : 0);
  if (!(C >= 0 && C <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!w.localize)
    throw new RangeError("locale must contain localize property");
  if (!w.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var k = Je(e);
  if (!ih(k))
    throw new RangeError("Invalid time value");
  var M = nh(k), L = rh(k, M), A = {
    firstWeekContainsDate: x,
    weekStartsOn: C,
    locale: w,
    _originalDate: k
  }, $ = b.match(u1).map(function(D) {
    var _ = D[0];
    if (_ === "p" || _ === "P") {
      var T = yh[_];
      return T(D, w.formatLong);
    }
    return D;
  }).join("").match(c1).map(function(D) {
    if (D === "''")
      return "'";
    var _ = D[0];
    if (_ === "'")
      return m1(D);
    var T = vh[_];
    if (T)
      return wh(D) && is(D, t, String(e)), _h(D) && is(D, t, String(e)), T(L, D, w.localize, A);
    if (_.match(h1))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + _ + "`");
    return D;
  }).join("");
  return $;
}
function m1(e) {
  var t = e.match(d1);
  return t ? t[1].replace(f1, "'") : e;
}
const en = S({
  name: "CFormFeedback",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    },
    /**
     * Method called immediately after the `value` prop changes.
     */
    invalid: Boolean,
    /**
     * If your form layout allows it, you can display validation feedback in a styled tooltip.
     */
    tooltip: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: [
        {
          [`invalid-${e.tooltip ? "tooltip" : "feedback"}`]: e.invalid,
          [`valid-${e.tooltip ? "tooltip" : "feedback"}`]: e.valid
        }
      ]
    }, t.default && t.default());
  }
}), ur = S({
  name: "CFormControlValidation",
  inheritAttrs: !1,
  props: {
    /**
     * @ignore
     */
    describedby: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  setup(e, { slots: t }) {
    return () => [
      e.feedback && (e.valid || e.invalid) && h(en, {
        ...e.invalid && { id: e.describedby },
        invalid: e.invalid,
        tooltip: e.tooltipFeedback,
        valid: e.valid
      }, {
        default: () => t.feedback && t.feedback() || e.feedback
      }),
      (e.feedbackInvalid || t.feedbackInvalid) && h(en, {
        id: e.describedby,
        invalid: !0,
        tooltip: e.tooltipFeedback
      }, {
        default: () => t.feedbackInvalid && t.feedbackInvalid() || e.feedbackInvalid
      }),
      (e.feedbackValid || t.feedbackValid) && h(en, {
        tooltip: e.tooltipFeedback,
        valid: !0
      }, {
        default: () => t.feedbackValid && t.feedbackValid() || e.feedbackValid
      })
    ];
  }
}), Wa = S({
  name: "CFormFloating",
  setup(e, { slots: t }) {
    return () => h("div", {
      class: "form-floating"
    }, t.default && t.default());
  }
}), Ne = S({
  name: "CFormLabel",
  props: {
    /**
     * A string of all className you want to be applied to the component, and override standard className value.
     */
    customClassName: [Array, String]
  },
  setup(e, { slots: t }) {
    return () => h("label", {
      class: e.customClassName ?? "form-label"
    }, t.default && t.default());
  }
}), Qn = S({
  name: "CFormText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "form-text" }, t.default && t.default());
  }
}), hn = S({
  name: "CFormControlWrapper",
  inheritAttrs: !1,
  props: {
    ...ur.props,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * @ignore
     */
    id: String,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String
  },
  setup(e, { slots: t }) {
    const n = () => h(ur, {
      describedby: e.describedby,
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      invalid: e.invalid,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      ...t.feedback && { feedback: () => t.feedback && t.feedback() },
      ...t.feedbackInvalid && {
        feedbackInvalid: () => t.feedbackInvalid && t.feedbackInvalid()
      },
      ...t.feedbackValid && {
        feedbackValid: () => t.feedbackInvalid && t.feedbackInvalid()
      }
    });
    return () => e.floatingLabel ? h(Wa, () => [
      t.default && t.default(),
      h(Ne, {
        for: e.id
      }, {
        default: () => t.label && t.label() || e.label || e.floatingLabel
      }),
      (e.text || t.text) && h(Qn, {
        id: e.describedby
      }, {
        default: () => t.text && t.text() || e.text
      }),
      n()
    ]) : [
      (e.label || t.label) && h(Ne, {
        for: e.id
      }, {
        default: () => t.label && t.label() || e.label
      }),
      t.default && t.default(),
      (e.text || t.text) && h(Qn, {
        id: e.describedby
      }, {
        default: () => t.text && t.text() || e.text
      }),
      n()
    ];
  }
});
var ve = "top", Ae = "bottom", Le = "right", pe = "left", qr = "auto", ca = [ve, Ae, Le, pe], nn = "start", Jn = "end", v1 = "clippingParents", Zc = "viewport", Sn = "popper", p1 = "reference", rs = /* @__PURE__ */ ca.reduce(function(e, t) {
  return e.concat([t + "-" + nn, t + "-" + Jn]);
}, []), Qc = /* @__PURE__ */ [].concat(ca, [qr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + nn, t + "-" + Jn]);
}, []), b1 = "beforeRead", y1 = "read", C1 = "afterRead", x1 = "beforeMain", _1 = "main", w1 = "afterMain", S1 = "beforeWrite", k1 = "write", O1 = "afterWrite", D1 = [b1, y1, C1, x1, _1, w1, S1, k1, O1];
function Ze(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function xe(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function jt(e) {
  var t = xe(e).Element;
  return e instanceof t || e instanceof Element;
}
function Te(e) {
  var t = xe(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Gr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = xe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function P1(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var a = t.styles[n] || {}, i = t.attributes[n] || {}, r = t.elements[n];
    !Te(r) || !Ze(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(o) {
      var s = i[o];
      s === !1 ? r.removeAttribute(o) : r.setAttribute(o, s === !0 ? "" : s);
    }));
  });
}
function M1(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(a) {
      var i = t.elements[a], r = t.attributes[a] || {}, o = Object.keys(t.styles.hasOwnProperty(a) ? t.styles[a] : n[a]), s = o.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !Te(i) || !Ze(i) || (Object.assign(i.style, s), Object.keys(r).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
var T1 = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: P1,
  effect: M1,
  requires: ["computeStyles"]
};
function Ge(e) {
  return e.split("-")[0];
}
var Et = Math.max, Ya = Math.min, an = Math.round;
function dr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Jc() {
  return !/^((?!chrome|android).)*safari/i.test(dr());
}
function rn(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var a = e.getBoundingClientRect(), i = 1, r = 1;
  t && Te(e) && (i = e.offsetWidth > 0 && an(a.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && an(a.height) / e.offsetHeight || 1);
  var o = jt(e) ? xe(e) : window, s = o.visualViewport, l = !Jc() && n, c = (a.left + (l && s ? s.offsetLeft : 0)) / i, u = (a.top + (l && s ? s.offsetTop : 0)) / r, d = a.width / i, f = a.height / r;
  return {
    width: d,
    height: f,
    top: u,
    right: c + d,
    bottom: u + f,
    left: c,
    x: c,
    y: u
  };
}
function Kr(e) {
  var t = rn(e), n = e.offsetWidth, a = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - a) <= 1 && (a = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: a
  };
}
function eu(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Gr(n)) {
    var a = t;
    do {
      if (a && e.isSameNode(a))
        return !0;
      a = a.parentNode || a.host;
    } while (a);
  }
  return !1;
}
function ct(e) {
  return xe(e).getComputedStyle(e);
}
function A1(e) {
  return ["table", "td", "th"].indexOf(Ze(e)) >= 0;
}
function wt(e) {
  return ((jt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function gi(e) {
  return Ze(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Gr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    wt(e)
  );
}
function os(e) {
  return !Te(e) || // https://github.com/popperjs/popper-core/issues/837
  ct(e).position === "fixed" ? null : e.offsetParent;
}
function L1(e) {
  var t = /firefox/i.test(dr()), n = /Trident/i.test(dr());
  if (n && Te(e)) {
    var a = ct(e);
    if (a.position === "fixed")
      return null;
  }
  var i = gi(e);
  for (Gr(i) && (i = i.host); Te(i) && ["html", "body"].indexOf(Ze(i)) < 0; ) {
    var r = ct(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function ua(e) {
  for (var t = xe(e), n = os(e); n && A1(n) && ct(n).position === "static"; )
    n = os(n);
  return n && (Ze(n) === "html" || Ze(n) === "body" && ct(n).position === "static") ? t : n || L1(e) || t;
}
function Xr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function jn(e, t, n) {
  return Et(e, Ya(t, n));
}
function $1(e, t, n) {
  var a = jn(e, t, n);
  return a > n ? n : a;
}
function tu() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function nu(e) {
  return Object.assign({}, tu(), e);
}
function au(e, t) {
  return t.reduce(function(n, a) {
    return n[a] = e, n;
  }, {});
}
var B1 = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, nu(typeof t != "number" ? t : au(t, ca));
};
function E1(e) {
  var t, n = e.state, a = e.name, i = e.options, r = n.elements.arrow, o = n.modifiersData.popperOffsets, s = Ge(n.placement), l = Xr(s), c = [pe, Le].indexOf(s) >= 0, u = c ? "height" : "width";
  if (!(!r || !o)) {
    var d = B1(i.padding, n), f = Kr(r), g = l === "y" ? ve : pe, m = l === "y" ? Ae : Le, v = n.rects.reference[u] + n.rects.reference[l] - o[l] - n.rects.popper[u], p = o[l] - n.rects.reference[l], b = ua(r), y = b ? l === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, w = v / 2 - p / 2, x = d[g], C = y - f[u] - d[m], k = y / 2 - f[u] / 2 + w, M = jn(x, k, C), L = l;
    n.modifiersData[a] = (t = {}, t[L] = M, t.centerOffset = M - k, t);
  }
}
function I1(e) {
  var t = e.state, n = e.options, a = n.element, i = a === void 0 ? "[data-popper-arrow]" : a;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || eu(t.elements.popper, i) && (t.elements.arrow = i));
}
var F1 = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: E1,
  effect: I1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function on(e) {
  return e.split("-")[1];
}
var R1 = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function N1(e, t) {
  var n = e.x, a = e.y, i = t.devicePixelRatio || 1;
  return {
    x: an(n * i) / i || 0,
    y: an(a * i) / i || 0
  };
}
function ss(e) {
  var t, n = e.popper, a = e.popperRect, i = e.placement, r = e.variation, o = e.offsets, s = e.position, l = e.gpuAcceleration, c = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, g = f === void 0 ? 0 : f, m = o.y, v = m === void 0 ? 0 : m, p = typeof u == "function" ? u({
    x: g,
    y: v
  }) : {
    x: g,
    y: v
  };
  g = p.x, v = p.y;
  var b = o.hasOwnProperty("x"), y = o.hasOwnProperty("y"), w = pe, x = ve, C = window;
  if (c) {
    var k = ua(n), M = "clientHeight", L = "clientWidth";
    if (k === xe(n) && (k = wt(n), ct(k).position !== "static" && s === "absolute" && (M = "scrollHeight", L = "scrollWidth")), k = k, i === ve || (i === pe || i === Le) && r === Jn) {
      x = Ae;
      var A = d && k === C && C.visualViewport ? C.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        k[M]
      );
      v -= A - a.height, v *= l ? 1 : -1;
    }
    if (i === pe || (i === ve || i === Ae) && r === Jn) {
      w = Le;
      var $ = d && k === C && C.visualViewport ? C.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        k[L]
      );
      g -= $ - a.width, g *= l ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: s
  }, c && R1), _ = u === !0 ? N1({
    x: g,
    y: v
  }, xe(n)) : {
    x: g,
    y: v
  };
  if (g = _.x, v = _.y, l) {
    var T;
    return Object.assign({}, D, (T = {}, T[x] = y ? "0" : "", T[w] = b ? "0" : "", T.transform = (C.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + v + "px)" : "translate3d(" + g + "px, " + v + "px, 0)", T));
  }
  return Object.assign({}, D, (t = {}, t[x] = y ? v + "px" : "", t[w] = b ? g + "px" : "", t.transform = "", t));
}
function j1(e) {
  var t = e.state, n = e.options, a = n.gpuAcceleration, i = a === void 0 ? !0 : a, r = n.adaptive, o = r === void 0 ? !0 : r, s = n.roundOffsets, l = s === void 0 ? !0 : s, c = {
    placement: Ge(t.placement),
    variation: on(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ss(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ss(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
var z1 = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: j1,
  data: {}
}, Ca = {
  passive: !0
};
function V1(e) {
  var t = e.state, n = e.instance, a = e.options, i = a.scroll, r = i === void 0 ? !0 : i, o = a.resize, s = o === void 0 ? !0 : o, l = xe(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && c.forEach(function(u) {
    u.addEventListener("scroll", n.update, Ca);
  }), s && l.addEventListener("resize", n.update, Ca), function() {
    r && c.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Ca);
    }), s && l.removeEventListener("resize", n.update, Ca);
  };
}
var H1 = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: V1,
  data: {}
}, W1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Fa(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return W1[t];
  });
}
var Y1 = {
  start: "end",
  end: "start"
};
function ls(e) {
  return e.replace(/start|end/g, function(t) {
    return Y1[t];
  });
}
function Zr(e) {
  var t = xe(e), n = t.pageXOffset, a = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: a
  };
}
function Qr(e) {
  return rn(wt(e)).left + Zr(e).scrollLeft;
}
function U1(e, t) {
  var n = xe(e), a = wt(e), i = n.visualViewport, r = a.clientWidth, o = a.clientHeight, s = 0, l = 0;
  if (i) {
    r = i.width, o = i.height;
    var c = Jc();
    (c || !c && t === "fixed") && (s = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: s + Qr(e),
    y: l
  };
}
function q1(e) {
  var t, n = wt(e), a = Zr(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, r = Et(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Et(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), s = -a.scrollLeft + Qr(e), l = -a.scrollTop;
  return ct(i || n).direction === "rtl" && (s += Et(n.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: s,
    y: l
  };
}
function Jr(e) {
  var t = ct(e), n = t.overflow, a = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + a);
}
function iu(e) {
  return ["html", "body", "#document"].indexOf(Ze(e)) >= 0 ? e.ownerDocument.body : Te(e) && Jr(e) ? e : iu(gi(e));
}
function zn(e, t) {
  var n;
  t === void 0 && (t = []);
  var a = iu(e), i = a === ((n = e.ownerDocument) == null ? void 0 : n.body), r = xe(a), o = i ? [r].concat(r.visualViewport || [], Jr(a) ? a : []) : a, s = t.concat(o);
  return i ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(zn(gi(o)))
  );
}
function fr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function G1(e, t) {
  var n = rn(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function cs(e, t, n) {
  return t === Zc ? fr(U1(e, n)) : jt(t) ? G1(t, n) : fr(q1(wt(e)));
}
function K1(e) {
  var t = zn(gi(e)), n = ["absolute", "fixed"].indexOf(ct(e).position) >= 0, a = n && Te(e) ? ua(e) : e;
  return jt(a) ? t.filter(function(i) {
    return jt(i) && eu(i, a) && Ze(i) !== "body";
  }) : [];
}
function X1(e, t, n, a) {
  var i = t === "clippingParents" ? K1(e) : [].concat(t), r = [].concat(i, [n]), o = r[0], s = r.reduce(function(l, c) {
    var u = cs(e, c, a);
    return l.top = Et(u.top, l.top), l.right = Ya(u.right, l.right), l.bottom = Ya(u.bottom, l.bottom), l.left = Et(u.left, l.left), l;
  }, cs(e, o, a));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ru(e) {
  var t = e.reference, n = e.element, a = e.placement, i = a ? Ge(a) : null, r = a ? on(a) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, l;
  switch (i) {
    case ve:
      l = {
        x: o,
        y: t.y - n.height
      };
      break;
    case Ae:
      l = {
        x: o,
        y: t.y + t.height
      };
      break;
    case Le:
      l = {
        x: t.x + t.width,
        y: s
      };
      break;
    case pe:
      l = {
        x: t.x - n.width,
        y: s
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var c = i ? Xr(i) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (r) {
      case nn:
        l[c] = l[c] - (t[u] / 2 - n[u] / 2);
        break;
      case Jn:
        l[c] = l[c] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return l;
}
function ea(e, t) {
  t === void 0 && (t = {});
  var n = t, a = n.placement, i = a === void 0 ? e.placement : a, r = n.strategy, o = r === void 0 ? e.strategy : r, s = n.boundary, l = s === void 0 ? v1 : s, c = n.rootBoundary, u = c === void 0 ? Zc : c, d = n.elementContext, f = d === void 0 ? Sn : d, g = n.altBoundary, m = g === void 0 ? !1 : g, v = n.padding, p = v === void 0 ? 0 : v, b = nu(typeof p != "number" ? p : au(p, ca)), y = f === Sn ? p1 : Sn, w = e.rects.popper, x = e.elements[m ? y : f], C = X1(jt(x) ? x : x.contextElement || wt(e.elements.popper), l, u, o), k = rn(e.elements.reference), M = ru({
    reference: k,
    element: w,
    strategy: "absolute",
    placement: i
  }), L = fr(Object.assign({}, w, M)), A = f === Sn ? L : k, $ = {
    top: C.top - A.top + b.top,
    bottom: A.bottom - C.bottom + b.bottom,
    left: C.left - A.left + b.left,
    right: A.right - C.right + b.right
  }, D = e.modifiersData.offset;
  if (f === Sn && D) {
    var _ = D[i];
    Object.keys($).forEach(function(T) {
      var P = [Le, Ae].indexOf(T) >= 0 ? 1 : -1, B = [ve, Ae].indexOf(T) >= 0 ? "y" : "x";
      $[T] += _[B] * P;
    });
  }
  return $;
}
function Z1(e, t) {
  t === void 0 && (t = {});
  var n = t, a = n.placement, i = n.boundary, r = n.rootBoundary, o = n.padding, s = n.flipVariations, l = n.allowedAutoPlacements, c = l === void 0 ? Qc : l, u = on(a), d = u ? s ? rs : rs.filter(function(m) {
    return on(m) === u;
  }) : ca, f = d.filter(function(m) {
    return c.indexOf(m) >= 0;
  });
  f.length === 0 && (f = d);
  var g = f.reduce(function(m, v) {
    return m[v] = ea(e, {
      placement: v,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[Ge(v)], m;
  }, {});
  return Object.keys(g).sort(function(m, v) {
    return g[m] - g[v];
  });
}
function Q1(e) {
  if (Ge(e) === qr)
    return [];
  var t = Fa(e);
  return [ls(e), t, ls(t)];
}
function J1(e) {
  var t = e.state, n = e.options, a = e.name;
  if (!t.modifiersData[a]._skip) {
    for (var i = n.mainAxis, r = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !0 : o, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, g = n.flipVariations, m = g === void 0 ? !0 : g, v = n.allowedAutoPlacements, p = t.options.placement, b = Ge(p), y = b === p, w = l || (y || !m ? [Fa(p)] : Q1(p)), x = [p].concat(w).reduce(function(He, Se) {
      return He.concat(Ge(Se) === qr ? Z1(t, {
        placement: Se,
        boundary: u,
        rootBoundary: d,
        padding: c,
        flipVariations: m,
        allowedAutoPlacements: v
      }) : Se);
    }, []), C = t.rects.reference, k = t.rects.popper, M = /* @__PURE__ */ new Map(), L = !0, A = x[0], $ = 0; $ < x.length; $++) {
      var D = x[$], _ = Ge(D), T = on(D) === nn, P = [ve, Ae].indexOf(_) >= 0, B = P ? "width" : "height", I = ea(t, {
        placement: D,
        boundary: u,
        rootBoundary: d,
        altBoundary: f,
        padding: c
      }), z = P ? T ? Le : pe : T ? Ae : ve;
      C[B] > k[B] && (z = Fa(z));
      var he = Fa(z), Be = [];
      if (r && Be.push(I[_] <= 0), s && Be.push(I[z] <= 0, I[he] <= 0), Be.every(function(He) {
        return He;
      })) {
        A = D, L = !1;
        break;
      }
      M.set(D, Be);
    }
    if (L)
      for (var Ee = m ? 3 : 1, ft = function(Se) {
        var tt = x.find(function(pa) {
          var Dt = M.get(pa);
          if (Dt)
            return Dt.slice(0, Se).every(function(ji) {
              return ji;
            });
        });
        if (tt)
          return A = tt, "break";
      }, we = Ee; we > 0; we--) {
        var Ve = ft(we);
        if (Ve === "break")
          break;
      }
    t.placement !== A && (t.modifiersData[a]._skip = !0, t.placement = A, t.reset = !0);
  }
}
var eg = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: J1,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function us(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function ds(e) {
  return [ve, Le, Ae, pe].some(function(t) {
    return e[t] >= 0;
  });
}
function tg(e) {
  var t = e.state, n = e.name, a = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = ea(t, {
    elementContext: "reference"
  }), s = ea(t, {
    altBoundary: !0
  }), l = us(o, a), c = us(s, i, r), u = ds(l), d = ds(c);
  t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: d
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": d
  });
}
var ng = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: tg
};
function ag(e, t, n) {
  var a = Ge(e), i = [pe, ve].indexOf(a) >= 0 ? -1 : 1, r = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, o = r[0], s = r[1];
  return o = o || 0, s = (s || 0) * i, [pe, Le].indexOf(a) >= 0 ? {
    x: s,
    y: o
  } : {
    x: o,
    y: s
  };
}
function ig(e) {
  var t = e.state, n = e.options, a = e.name, i = n.offset, r = i === void 0 ? [0, 0] : i, o = Qc.reduce(function(u, d) {
    return u[d] = ag(d, t.rects, r), u;
  }, {}), s = o[t.placement], l = s.x, c = s.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[a] = o;
}
var rg = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ig
};
function og(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = ru({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
var sg = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: og,
  data: {}
};
function lg(e) {
  return e === "x" ? "y" : "x";
}
function cg(e) {
  var t = e.state, n = e.options, a = e.name, i = n.mainAxis, r = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !1 : o, l = n.boundary, c = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, g = f === void 0 ? !0 : f, m = n.tetherOffset, v = m === void 0 ? 0 : m, p = ea(t, {
    boundary: l,
    rootBoundary: c,
    padding: d,
    altBoundary: u
  }), b = Ge(t.placement), y = on(t.placement), w = !y, x = Xr(b), C = lg(x), k = t.modifiersData.popperOffsets, M = t.rects.reference, L = t.rects.popper, A = typeof v == "function" ? v(Object.assign({}, t.rects, {
    placement: t.placement
  })) : v, $ = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, _ = {
    x: 0,
    y: 0
  };
  if (k) {
    if (r) {
      var T, P = x === "y" ? ve : pe, B = x === "y" ? Ae : Le, I = x === "y" ? "height" : "width", z = k[x], he = z + p[P], Be = z - p[B], Ee = g ? -L[I] / 2 : 0, ft = y === nn ? M[I] : L[I], we = y === nn ? -L[I] : -M[I], Ve = t.elements.arrow, He = g && Ve ? Kr(Ve) : {
        width: 0,
        height: 0
      }, Se = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : tu(), tt = Se[P], pa = Se[B], Dt = jn(0, M[I], He[I]), ji = w ? M[I] / 2 - Ee - Dt - tt - $.mainAxis : ft - Dt - tt - $.mainAxis, sf = w ? -M[I] / 2 + Ee + Dt + pa + $.mainAxis : we + Dt + pa + $.mainAxis, zi = t.elements.arrow && ua(t.elements.arrow), lf = zi ? x === "y" ? zi.clientTop || 0 : zi.clientLeft || 0 : 0, Ho = (T = D == null ? void 0 : D[x]) != null ? T : 0, cf = z + ji - Ho - lf, uf = z + sf - Ho, Wo = jn(g ? Ya(he, cf) : he, z, g ? Et(Be, uf) : Be);
      k[x] = Wo, _[x] = Wo - z;
    }
    if (s) {
      var Yo, df = x === "x" ? ve : pe, ff = x === "x" ? Ae : Le, Pt = k[C], ba = C === "y" ? "height" : "width", Uo = Pt + p[df], qo = Pt - p[ff], Vi = [ve, pe].indexOf(b) !== -1, Go = (Yo = D == null ? void 0 : D[C]) != null ? Yo : 0, Ko = Vi ? Uo : Pt - M[ba] - L[ba] - Go + $.altAxis, Xo = Vi ? Pt + M[ba] + L[ba] - Go - $.altAxis : qo, Zo = g && Vi ? $1(Ko, Pt, Xo) : jn(g ? Ko : Uo, Pt, g ? Xo : qo);
      k[C] = Zo, _[C] = Zo - Pt;
    }
    t.modifiersData[a] = _;
  }
}
var ug = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: cg,
  requiresIfExists: ["offset"]
};
function dg(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function fg(e) {
  return e === xe(e) || !Te(e) ? Zr(e) : dg(e);
}
function hg(e) {
  var t = e.getBoundingClientRect(), n = an(t.width) / e.offsetWidth || 1, a = an(t.height) / e.offsetHeight || 1;
  return n !== 1 || a !== 1;
}
function gg(e, t, n) {
  n === void 0 && (n = !1);
  var a = Te(t), i = Te(t) && hg(t), r = wt(t), o = rn(e, i, n), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (a || !a && !n) && ((Ze(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Jr(r)) && (s = fg(t)), Te(t) ? (l = rn(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : r && (l.x = Qr(r))), {
    x: o.left + s.scrollLeft - l.x,
    y: o.top + s.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function mg(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), a = [];
  e.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    n.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(s) {
      if (!n.has(s)) {
        var l = t.get(s);
        l && i(l);
      }
    }), a.push(r);
  }
  return e.forEach(function(r) {
    n.has(r.name) || i(r);
  }), a;
}
function vg(e) {
  var t = mg(e);
  return D1.reduce(function(n, a) {
    return n.concat(t.filter(function(i) {
      return i.phase === a;
    }));
  }, []);
}
function pg(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function bg(e) {
  var t = e.reduce(function(n, a) {
    var i = n[a.name];
    return n[a.name] = i ? Object.assign({}, i, a, {
      options: Object.assign({}, i.options, a.options),
      data: Object.assign({}, i.data, a.data)
    }) : a, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var fs = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function hs() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(a) {
    return !(a && typeof a.getBoundingClientRect == "function");
  });
}
function yg(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, a = n === void 0 ? [] : n, i = t.defaultOptions, r = i === void 0 ? fs : i;
  return function(s, l, c) {
    c === void 0 && (c = r);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, fs, r),
      modifiersData: {},
      elements: {
        reference: s,
        popper: l
      },
      attributes: {},
      styles: {}
    }, d = [], f = !1, g = {
      state: u,
      setOptions: function(b) {
        var y = typeof b == "function" ? b(u.options) : b;
        v(), u.options = Object.assign({}, r, u.options, y), u.scrollParents = {
          reference: jt(s) ? zn(s) : s.contextElement ? zn(s.contextElement) : [],
          popper: zn(l)
        };
        var w = vg(bg([].concat(a, u.options.modifiers)));
        return u.orderedModifiers = w.filter(function(x) {
          return x.enabled;
        }), m(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var b = u.elements, y = b.reference, w = b.popper;
          if (hs(y, w)) {
            u.rects = {
              reference: gg(y, ua(w), u.options.strategy === "fixed"),
              popper: Kr(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function($) {
              return u.modifiersData[$.name] = Object.assign({}, $.data);
            });
            for (var x = 0; x < u.orderedModifiers.length; x++) {
              if (u.reset === !0) {
                u.reset = !1, x = -1;
                continue;
              }
              var C = u.orderedModifiers[x], k = C.fn, M = C.options, L = M === void 0 ? {} : M, A = C.name;
              typeof k == "function" && (u = k({
                state: u,
                options: L,
                name: A,
                instance: g
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: pg(function() {
        return new Promise(function(p) {
          g.forceUpdate(), p(u);
        });
      }),
      destroy: function() {
        v(), f = !0;
      }
    };
    if (!hs(s, l))
      return g;
    g.setOptions(c).then(function(p) {
      !f && c.onFirstUpdate && c.onFirstUpdate(p);
    });
    function m() {
      u.orderedModifiers.forEach(function(p) {
        var b = p.name, y = p.options, w = y === void 0 ? {} : y, x = p.effect;
        if (typeof x == "function") {
          var C = x({
            state: u,
            name: b,
            instance: g,
            options: w
          }), k = function() {
          };
          d.push(C || k);
        }
      });
    }
    function v() {
      d.forEach(function(p) {
        return p();
      }), d = [];
    }
    return g;
  };
}
var Cg = [H1, sg, z1, T1, rg, eg, ug, F1, ng], eo = /* @__PURE__ */ yg({
  defaultModifiers: Cg
});
const hr = S({
  name: "CPicker",
  props: {
    /**
     * Set container type for the component.
     */
    container: {
      type: String,
      default: "dropdown"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * A string of all className you want applied to the dropdown menu.
     */
    dropdownClassNames: String,
    /**
     * Toggle visibility of footer element or set the content of footer.
     */
    footer: Boolean,
    /**
     * Toggle the visibility of the component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = O(), r = O(), o = O(), s = O(), l = O(e.visible);
    E(() => e.visible, () => {
      l.value = e.visible;
    }), E(l, () => {
      if (e.container !== "inline") {
        if (l.value) {
          n("show"), window.addEventListener("mouseup", f), window.addEventListener("keyup", d), c();
          return;
        }
        n("hide"), window.removeEventListener("mouseup", f), window.removeEventListener("keyup", d), u();
      }
    });
    const c = () => {
      o.value && r.value && (s.value = eo(o.value, r.value, {
        placement: Zn(i.value) ? "bottom-end" : "bottom-start",
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: "clippingParents"
            }
          },
          {
            name: "offset",
            options: {
              offset: [0, 2]
            }
          }
        ]
      }));
    }, u = () => {
      s.value && s.value.destroy(), s.value = void 0;
    }, d = (g) => {
      g.key === "Escape" && (l.value = !1);
    }, f = (g) => {
      i.value && i.value.contains(g.target) || (l.value = !1);
    };
    switch (e.container) {
      case "inline":
        return () => h("div", { class: "picker", ref: i }, a.default && a.default());
      default:
        return () => h("div", {
          class: [
            "dropdown",
            "picker",
            t.class,
            {
              show: l.value
            }
          ],
          ref: i
        }, [
          /**
           * @slot Location for the toggler element.
           */
          a.toggler && a.toggler().map((g) => Vr(g, {
            onClick: () => {
              !e.disabled && !l.value && (l.value = !0);
            },
            ref: (m) => {
              o.value = m;
            }
          })),
          h("div", {
            class: [
              "dropdown-menu",
              {
                show: l.value
              },
              e.dropdownClassNames
            ],
            ref: r
          }, [
            a.default && a.default(),
            /**
             * @slot Location for the footer element.
             */
            a.footer && a.footer()
          ])
        ]);
    }
  }
}), gs = (e, t) => {
  const n = O();
  return ((...i) => {
    const r = () => {
      clearTimeout(n.value), e(...i);
    };
    clearTimeout(n.value), n.value = setTimeout(r, t);
  })();
}, xg = (e) => {
  const t = O(!1), n = O();
  return _e(() => {
    n.value = new IntersectionObserver(([a]) => {
      t.value = a.isIntersecting;
    }), e.value && n.value.observe(e.value);
  }), Nc(() => {
    n.value.disconnect();
  }), t;
}, to = () => {
  const e = O(), t = (a, i, r) => {
    e.value = eo(a, i, r);
  }, n = () => {
    e.value && e.value.destroy(), e.value = void 0;
  };
  return {
    popper: e.value,
    initPopper: t,
    destroyPopper: n
  };
}, xa = S({
  name: "CTimePickerRollCol",
  props: {
    elements: {
      type: Array,
      required: !0
    },
    selected: {
      type: [Number, String]
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = O(!0), a = O(), i = xg(a), r = () => {
      var l, c;
      const s = (l = a.value) == null ? void 0 : l.querySelector(".selected");
      i.value && s && s instanceof HTMLElement && ((c = a.value) == null || c.scrollTo({
        top: s.offsetTop,
        behavior: n.value ? "auto" : "smooth"
      }));
    };
    E(i, () => {
      r(), i.value && (n.value = !1);
    }), zr(() => {
      r();
    });
    const o = (s, l) => {
      (s.code === "Space" || s.key === "Enter") && (s.preventDefault(), t("click", l));
    };
    return () => h("div", { class: "time-picker-roll-col", ref: a }, e.elements.map((s) => h("div", {
      class: [
        "time-picker-roll-cell",
        {
          selected: s.value === e.selected
        }
      ],
      onClick: () => t("click", s.value),
      onKeydown: (l) => o(l, s.value),
      role: "button",
      tabindex: 0
    }, s.label)));
  }
}), _g = (e, t) => e === "am" && t === 12 ? 0 : e === "am" ? t : e === "pm" && t === 12 ? 12 : t + 12, wg = (e) => e % 12 || 12, Wi = (e) => e ? e instanceof Date ? new Date(e) : /* @__PURE__ */ new Date(`1970-01-01 ${e}`) : null, ms = (e, t) => e.toLocaleTimeString(t).includes("AM") ? "am" : e.toLocaleTimeString(t).includes("PM") || e.getHours() >= 12 ? "pm" : "am", Sg = (e, t = "auto") => {
  const n = /* @__PURE__ */ new Date(), a = ["am", "AM", "pm", "PM"].some((o) => n.toLocaleString(e).includes(o)), i = Array.from({ length: t === "auto" && a || t === !0 ? 12 : 24 }, (o, s) => ({
    value: t === "auto" && a || t === !0 ? s + 1 : s,
    label: (t === "auto" && a || t === !0 ? s + 1 : s).toLocaleString(e)
  })), r = Array.from({ length: 60 }, (o, s) => (n.setMinutes(s), {
    value: s,
    label: n.toLocaleTimeString(e, {
      minute: "2-digit",
      second: "2-digit"
    }).split(/[^A-Za-z0-9\u06F0-\u06F90-9]/)[0]
  }));
  return {
    listOfHours: i,
    listOfMinutes: r,
    listOfSeconds: r,
    hour12: a
  };
}, vs = (e, t, n = "auto") => e ? n === "auto" && kg(t) || n === !0 ? wg(e.getHours()) : e.getHours() : "", ps = (e) => e ? e.getMinutes() : "", bs = (e) => e ? e.getSeconds() : "", kg = (e) => ["am", "AM", "pm", "PM"].some((t) => (/* @__PURE__ */ new Date()).toLocaleString(e).includes(t)), Og = (e) => {
  const t = /* @__PURE__ */ new Date(`1970-01-01 ${e}`);
  return t instanceof Date && t.getTime();
}, It = {
  type: String,
  validator: (e) => [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light",
    "link",
    "transparent",
    "primary-gradient",
    "secondary-gradient",
    "success-gradient",
    "danger-gradient",
    "warning-gradient",
    "info-gradient",
    "dark-gradient",
    "light-gradient"
  ].includes(e)
}, Ra = S({
  name: "CTimePicker",
  props: {
    ...hr.props,
    /**
     * Set if the component should use the 12/24 hour format. If `true` forces the interface to a 12-hour format. If `false` forces the interface into a 24-hour format. If `auto` the current locale will determine the 12 or 24-hour interface by default locales.
     *
     * @since 4.7.0
     */
    ampm: {
      type: [Boolean, String],
      default: "auto",
      validator: (e) => typeof e == "string" ? ["auto"].includes(e) : typeof e == "boolean"
    },
    /**
     * Toggle visibility or set the content of cancel button.
     */
    cancelButton: {
      type: [Boolean, String],
      default: "Cancel"
    },
    /**
     * Sets the color context of the cancel button to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    cancelButtonColor: {
      ...It,
      default: "primary"
    },
    /**
     * Size the cancel button small or large.
     *
     * @values 'sm', 'lg'
     */
    cancelButtonSize: {
      type: String,
      default: "sm",
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Set the cancel button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    cancelButtonVariant: {
      type: String,
      default: "ghost",
      validator: (e) => ["ghost", "outline"].includes(e)
    },
    /**
     * Toggle visibility of the cleaner button.
     */
    cleaner: {
      type: Boolean,
      default: !0
    },
    /**
     * Toggle visibility or set the content of confirm button.
     */
    confirmButton: {
      type: [Boolean, String],
      default: "OK"
    },
    /**
     * Sets the color context of the confirm button to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    confirmButtonColor: {
      ...It,
      default: "primary"
    },
    /**
     * Size the confirm button small or large.
     *
     * @values 'sm', 'lg'
     */
    confirmButtonSize: {
      type: String,
      default: "sm",
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Set the confirm button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    confirmButtonVariant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    },
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.6.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.6.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.6.0
     */
    feedbackValid: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Toggle visibility or set the content of the input indicator.
     */
    indicator: {
      type: Boolean,
      default: !0
    },
    /**
     * Toggle the readonly state for the component.
     */
    inputReadOnly: Boolean,
    /**
     * Set component validation state to invalid.
     *
     * @since 4.6.0
     */
    invalid: {
      type: Boolean,
      default: void 0
    },
    /**
     * Add a caption for a component.
     *
     * @since 4.6.0
     */
    label: String,
    /**
     * Sets the default locale for components. If not set, it is inherited from the navigator.language.
     */
    locale: {
      type: String,
      defalut: "default"
    },
    /**
     * Specifies a short hint that is visible in the input.
     */
    placeholder: {
      type: String,
      default: "Select time"
    },
    /**
     * When present, it specifies that must be filled out before submitting the form.
     *
     * @since 4.9.0
     */
    required: Boolean,
    /**
     * Show seconds.
     *
     * @since 4.7.0
     */
    seconds: {
      type: Boolean,
      default: !0
    },
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      default: void 0,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.6.0
     */
    text: String,
    /**
     * Initial selected time.
     */
    time: [Date, String],
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.6.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     *
     * @since 4.6.0
     */
    valid: {
      type: Boolean,
      default: void 0
    },
    /**
     * Set the time picker variant to a roll or select.
     *
     * @values 'roll', 'select'
     */
    variant: {
      type: String,
      default: "roll",
      validator: (e) => ["roll", "select"].includes(e)
    },
    /**
     * Toggle the visibility of the component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the time changed.
     */
    "change",
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show",
    /**
     * Callback fired when the time changed.
     *
     * @since 4.7.0
     */
    "update:time"
  ],
  setup(e, { emit: t, attrs: n, slots: a }) {
    const i = O(), r = O(), o = O(Wi(e.time)), s = O(o.value ? ms(new Date(o.value), e.locale) : "am"), l = O(null), c = O(e.visible), u = O({
      listOfHours: [],
      listOfMinutes: [],
      listOfSeconds: [],
      hour12: !1
    }), d = O(e.valid ?? (e.invalid === !0 ? !1 : void 0));
    E(() => e.time, () => {
      o.value = Wi(e.time);
    }), E(() => [e.valid, e.invalid], () => {
      d.value = e.valid ?? (e.invalid === !0 ? !1 : void 0);
    }), E(o, () => {
      u.value = Sg(e.locale, e.ampm), o.value && (s.value = ms(new Date(o.value), e.locale));
    }, { immediate: !0 }), E(r, () => {
      r.value && r.value.form && (i.value = r.value.form);
    }), E([i, o], () => {
      i.value && (i.value.addEventListener("submit", (y) => {
        setTimeout(() => g(y.target));
      }), g(i.value));
    });
    const f = (y) => {
      y.stopPropagation(), o.value = null, t("change", null), t("update:time", null);
    }, g = (y) => {
      if (y.classList.contains("was-validated")) {
        if (o.value) {
          d.value = !0;
          return;
        }
        d.value = !1;
      }
    }, m = (y, w) => {
      const x = o.value || /* @__PURE__ */ new Date("1970-01-01");
      y === "toggle" && (w === "am" && x.setHours(x.getHours() - 12), w === "pm" && x.setHours(x.getHours() + 12)), y === "hours" && (u.value && u.value.hour12 ? x.setHours(_g(s.value, Number.parseInt(w))) : x.setHours(Number.parseInt(w))), y === "minutes" && x.setMinutes(Number.parseInt(w)), y === "seconds" && x.setSeconds(Number.parseInt(w)), o.value = new Date(x), t("change", x.toTimeString(), x.toLocaleTimeString(e.locale), x), t("update:time", x.toLocaleTimeString(e.locale));
    }, v = () => h("div", {
      class: [
        "input-group",
        "picker-input-group",
        {
          [`input-group-${e.size}`]: e.size
        }
      ]
    }, [
      h("input", {
        autocomplete: "off",
        class: "form-control",
        disabled: e.disabled,
        onInput: (y) => {
          Og(y.target.value) && (o.value = Wi(y.target.value));
        },
        placeholder: e.placeholder,
        readonly: e.inputReadOnly,
        ref: r,
        required: e.required,
        value: o.value ? o.value.toLocaleTimeString(e.locale, {
          hour12: u.value && u.value.hour12,
          ...!e.seconds && { timeStyle: "short" }
        }) : ""
      }),
      (e.indicator || e.cleaner) && h("div", { class: "input-group-text" }, [
        e.indicator && h("span", {
          class: "picker-input-group-indicator"
        }, a.indicator ? a.indicator() : h("span", { class: "picker-input-group-icon time-picker-input-icon" })),
        e.cleaner && h("span", {
          class: "picker-input-group-cleaner",
          onClick: (y) => f(y),
          role: "button"
        }, a.cleaner ? a.cleaner() : h("span", { class: "picker-input-group-icon time-picker-cleaner-icon" }))
      ])
    ]), p = () => {
      var y, w;
      return [
        h("span", { class: "time-picker-inline-icon" }),
        h("select", {
          class: "form-select",
          disabled: e.disabled,
          onChange: (x) => m("hours", x.target.value),
          ...o.value && { value: vs(o.value, e.locale) }
        }, u.value && u.value.listOfHours.map((x) => h("option", {
          value: x.value.toString()
        }, x.label))),
        ":",
        h("select", {
          class: "form-select",
          disabled: e.disabled,
          onChange: (x) => m("minutes", x.target.value),
          ...o.value && { value: ps(o.value) }
        }, u.value && ((y = u.value.listOfMinutes) == null ? void 0 : y.map((x) => h("option", {
          value: x.value.toString()
        }, x.label)))),
        e.seconds && ":",
        e.seconds && h("select", {
          class: "form-select",
          disabled: e.disabled,
          onChange: (x) => m("seconds", x.target.value),
          ...o.value && { value: bs(o.value) }
        }, u.value && ((w = u.value.listOfSeconds) == null ? void 0 : w.map((x) => h("option", {
          value: x.value.toString()
        }, x.label)))),
        u.value && u.value.hour12 && h("select", {
          class: "form-select",
          disabled: e.disabled,
          onChange: (x) => m("toggle", x.target.value),
          value: s.value
        }, [
          h("option", {
            value: "am"
          }, "AM"),
          h("option", {
            value: "pm"
          }, "PM")
        ])
      ];
    }, b = () => [
      h(xa, {
        elements: u.value && u.value.listOfHours,
        onClick: (y) => m("hours", y.toString()),
        selected: vs(o.value, e.locale, e.ampm)
      }),
      h(xa, {
        elements: u.value && u.value.listOfMinutes,
        onClick: (y) => m("minutes", y.toString()),
        selected: ps(o.value)
      }),
      e.seconds && h(xa, {
        elements: u.value && u.value.listOfSeconds,
        onClick: (y) => m("seconds", y.toString()),
        selected: bs(o.value)
      }),
      u.value && u.value.hour12 && h(xa, {
        elements: [
          { value: "am", label: "AM" },
          { value: "pm", label: "PM" }
        ],
        onClick: (y) => m("toggle", y),
        selected: s.value
      })
    ];
    return () => h(hn, {
      describedby: n["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      id: e.id,
      invalid: d.value === !1,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: d.value
    }, {
      default: () => h(hr, {
        class: [
          "time-picker",
          {
            disabled: e.disabled,
            "is-invalid": d.value === !1,
            "is-valid": d.value
          }
        ],
        container: e.container,
        disabled: e.disabled,
        dropdownClassNames: "time-picker-dropdown",
        footer: !0,
        onHide: () => {
          c.value = !1, t("hide");
        },
        onShow: () => {
          o.value && (l.value = new Date(o.value)), c.value = !0, t("show");
        },
        visible: c.value
      }, {
        ...a.cancelButton && {
          cancelButton: () => a.cancelButton && a.cancelButton()
        },
        ...a.confirmButton && {
          confirmButton: () => a.confirmButton && a.confirmButton()
        },
        toggler: () => v(),
        default: () => h("div", {
          class: [
            "time-picker-body",
            {
              "time-picker-roll": e.variant === "roll"
            }
          ]
        }, e.variant === "select" ? p() : b()),
        footer: () => h("div", { class: "picker-footer" }, [
          e.cancelButton && h(oe, {
            color: e.cancelButtonColor,
            onClick: () => {
              l.value && (o.value = new Date(l.value)), c.value = !1;
            },
            size: e.cancelButtonSize,
            variant: e.cancelButtonVariant
          }, () => e.cancelButton),
          e.confirmButton && h(oe, {
            color: e.confirmButtonColor,
            onClick: () => {
              c.value = !1;
            },
            size: e.confirmButtonSize,
            variant: e.confirmButtonVariant
          }, () => e.confirmButton)
        ])
      })
    });
  }
}), Dg = (e, t, n) => {
  if (!Number.isNaN(Date.parse(e)))
    return new Date(Date.parse(e));
  const a = new Date(2013, 11, 31, 17, 19, 22);
  let i = n ? a.toLocaleString(t) : a.toLocaleDateString(t);
  i = i.replace("2013", "(?<year>[0-9]{2,4})").replace("12", "(?<month>[0-9]{1,2})").replace("31", "(?<day>[0-9]{1,2})"), n && (i = i.replace("5", "(?<hour>[0-9]{1,2})").replace("17", "(?<hour>[0-9]{1,2})").replace("19", "(?<minute>[0-9]{1,2})").replace("22", "(?<second>[0-9]{1,2})").replace("PM", "(?<ampm>[A-Z]{2})"));
  const r = new RegExp(`${i}`), o = e.match(r);
  return o === null ? void 0 : o.groups && (n ? new Date(Number(o.groups.year), Number(o.groups.month) - 1, Number(o.groups.day), o.groups.ampm && o.groups.ampm === "PM" ? Number(o.groups.hour) + 12 : Number(o.groups.hour), Number(o.groups.minute), Number(o.groups.second)) : new Date(Number(o.groups.year), Number(o.groups.month) - 1, Number(o.groups.day)));
}, ou = S({
  name: "CDateRangePicker",
  props: {
    /**
     * The number of calendars that render on desktop devices.
     */
    calendars: {
      type: Number,
      default: 2
    },
    /**
     * Default date of the component
     */
    calendarDate: [Date, String],
    /**
     * Toggle visibility or set the content of cancel button.
     */
    cancelButton: {
      type: [Boolean, String],
      default: "Cancel"
    },
    /**
     * Sets the color context of the cancel button to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    cancelButtonColor: {
      ...It,
      default: "primary"
    },
    /**
     * Size the cancel button small or large.
     *
     * @values 'sm', 'lg'
     */
    cancelButtonSize: {
      type: String,
      default: "sm",
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Set the cancel button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    cancelButtonVariant: {
      type: String,
      default: "ghost",
      validator: (e) => ["ghost", "outline"].includes(e)
    },
    /**
     * Toggle visibility of the cleaner button.
     */
    cleaner: {
      type: Boolean,
      default: !0
    },
    /**
     * If true the dropdown will be immediately closed after submitting the full date.
     *
     * @since 4.7.0
     */
    closeOnSelect: {
      type: Boolean,
      default: !0
    },
    /**
     * Toggle visibility or set the content of confirm button.
     */
    confirmButton: {
      type: [Boolean, String],
      default: "OK"
    },
    /**
     * Sets the color context of the confirm button to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    confirmButtonColor: {
      ...It,
      default: "primary"
    },
    /**
     * Size the confirm button small or large.
     *
     * @values 'sm', 'lg'
     */
    confirmButtonSize: {
      type: String,
      default: "sm",
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Set the confirm button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    confirmButtonVariant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    },
    /**
     * Set the format of day name.
     *
     * @default 'numeric'
     * @since 4.6.0
     */
    dayFormat: {
      type: [Function, String],
      default: "numeric",
      required: !1,
      validator: (e) => typeof e == "string" ? ["numeric", "2-digit"].includes(e) : typeof e == "function" || typeof e == "function"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Specify the list of dates that cannot be selected.
     */
    disabledDates: Array,
    /**
     * Initial selected to date (range).
     */
    endDate: [Date, String],
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.6.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.6.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.6.0
     */
    feedbackValid: String,
    /**
     * Sets the day of start week.
     * - 0 - Sunday,
     * - 1 - Monday,
     * - 2 - Tuesday,
     * - 3 - Wednesday,
     * - 4 - Thursday,
     * - 5 - Friday,
     * - 6 - Saturday,
     */
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    /**
     * Set date format.
     * We use date-fns to format dates. Visit https://date-fns.org/v2.28.0/docs/format to check accepted patterns.
     */
    format: String,
    /**
     * Toggle visibility of footer element or set the content of footer.
     */
    footer: Boolean,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     *
     * The name attributes for input elements are generated based on the `id` property:
     * - {id}-start-date
     * - {id}-end-date
     */
    id: String,
    /**
     * Toggle visibility or set the content of the input indicator.
     */
    indicator: {
      type: Boolean,
      default: !0
    },
    /**
     * Custom function to format the selected date into a string according to a custom format.
     *
     * @since v4.11.0
     */
    inputDateFormat: Function,
    /**
     * Custom function to parse the input value into a valid Date object.
     *
     * @since v4.11.0
     */
    inputDateParse: Function,
    /**
     * Defines the delay (in milliseconds) for the input field's onChange event.
     *
     * @since v4.11.0
     */
    inputOnChangeDelay: {
      type: Number,
      default: 750
    },
    /**
     * Toggle the readonly state for the component.
     */
    inputReadOnly: Boolean,
    /**
     * Set component validation state to invalid.
     *
     * @since 4.6.0
     */
    invalid: {
      type: Boolean,
      default: void 0
    },
    /**
     * Add a caption for a component.
     *
     * @since 4.6.0
     */
    label: String,
    /**
     * Sets the default locale for components. If not set, it is inherited from the navigator.language.
     */
    locale: {
      type: String,
      default: "default"
    },
    /**
     * Max selectable date.
     */
    maxDate: [Date, String],
    /**
     * Min selectable date.
     */
    minDate: [Date, String],
    /**
     * Show arrows navigation.
     */
    navigation: {
      type: Boolean,
      default: !0
    },
    /**
     * Reorder year-month navigation, and render year first.
     *
     * @since 4.6.0
     */
    navYearFirst: Boolean,
    /**
     * Specifies a short hint that is visible in the input.
     */
    placeholder: {
      type: [String, Array],
      default: () => ["Start date", "End date"]
    },
    /**
     * @ignore
     */
    range: {
      type: Boolean,
      default: !0
    },
    /**
     * Predefined date ranges the user can select from.
     */
    ranges: Object,
    /**
     * When present, it specifies that must be filled out before submitting the form.
     *
     * @since 4.9.0
     */
    required: Boolean,
    /**
     * Toggle select mode between start and end date.
     */
    selectEndDate: Boolean,
    /**
     * Set whether days in adjacent months shown before or after the current month are selectable. This only applies if the `showAdjacementDays` option is set to true.
     *
     * @since 4.9.0
     */
    selectAdjacementDays: Boolean,
    /**
     * Set whether to display dates in adjacent months (non-selectable) at the start and end of the current month.
     *
     * @since 4.9.0
     */
    showAdjacementDays: {
      type: Boolean,
      default: !0
    },
    /**
     * Default icon or character character that separates two dates.
     */
    separator: {
      type: Boolean,
      default: !0
    },
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      required: !1,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Initial selected date.
     */
    startDate: [Date, String],
    /**
     * Add helper text to the component.
     *
     * @since 4.6.0
     */
    text: String,
    /**
     * Provide an additional time selection by adding select boxes to choose times.
     */
    timepicker: Boolean,
    /**
     * Toggle visibility or set the content of today button.
     */
    todayButton: {
      type: [Boolean, String],
      default: "Today"
    },
    /**
     * Sets the color context of the today button to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    todayButtonColor: {
      ...It,
      default: "primary"
    },
    /**
     * Size the today button small or large.
     *
     * @values 'sm', 'lg'
     */
    todayButtonSize: {
      type: String,
      default: "sm",
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Set the today button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    todayButtonVariant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    },
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.6.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     *
     * @since 4.6.0
     */
    valid: {
      type: Boolean,
      default: void 0
    },
    /**
     * Toggle the visibility of the component.
     */
    visible: Boolean,
    /**
     * Set length or format of day name.
     *
     * @type  number | 'long' | 'narrow' | 'short'
     */
    weekdayFormat: {
      type: [Function, Number, String],
      default: 2,
      validator: (e) => typeof e == "string" ? ["long", "narrow", "short"].includes(e) : typeof e == "number" || typeof e == "function"
    }
  },
  emits: [
    /**
     * Callback fired when the end date changed.
     *
     * @property {Date} date - date object
     * @property {string} formatedDate - formated date
     */
    "end-date-change",
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show",
    /**
     * Callback fired when the start date changed.
     *
     * @property {Date} date - date object
     * @property {string} formatedDate - formated date
     */
    "start-date-change",
    /**
     * Callback fired when the start date changed.
     *
     * @property {Date | null} date - date object
     * @since 4.7.0
     */
    "update:start-date",
    /**
     * Callback fired when the end date changed.
     *
     * @property {Date | null} date - date object
     * @since 4.7.0
     */
    "update:end-date"
  ],
  setup(e, { slots: t, attrs: n, emit: a }) {
    const i = O(), r = O(), o = O(), s = O(e.visible), l = O(e.calendarDate ? new Date(e.calendarDate) : e.startDate ? new Date(e.startDate) : e.endDate ? new Date(e.endDate) : /* @__PURE__ */ new Date()), c = O(null), u = O(null), d = O(e.startDate ? new Date(e.startDate) : null), f = O(e.endDate ? new Date(e.endDate) : null), g = O(d.value ? new Date(d.value) : null), m = O(f.value ? new Date(f.value) : null), v = O(e.maxDate ? new Date(e.maxDate) : null), p = O(e.minDate ? new Date(e.minDate) : null), b = O(!1), y = O(e.valid ?? (e.invalid === !0 ? !1 : void 0)), w = O(!1);
    _e(() => {
      w.value = window.innerWidth < 768;
    }), E(() => [e.valid, e.invalid], () => {
      y.value = e.valid ?? (e.invalid === !0 ? !1 : void 0);
    }), E(() => e.startDate, () => {
      l.value = e.startDate ? new Date(e.startDate) : /* @__PURE__ */ new Date(), d.value = e.startDate ? new Date(e.startDate) : null;
    }), E(() => e.endDate, () => {
      l.value = e.endDate ? new Date(e.endDate) : /* @__PURE__ */ new Date(), f.value = e.endDate ? new Date(e.endDate) : null;
    }), E(() => e.maxDate, () => {
      v.value = e.maxDate ? new Date(e.maxDate) : null;
    }), E(() => e.minDate, () => {
      p.value = e.minDate ? new Date(e.minDate) : null;
    }), E(r, () => {
      r.value && r.value.form && (o.value = r.value.form);
    }), E([o, d, f], () => {
      o.value && (o.value.addEventListener("submit", (P) => {
        setTimeout(() => L(P.target));
      }), L(o.value));
    });
    const x = (P) => e.inputDateFormat ? e.inputDateFormat(P) : e.format ? g1(P, e.format) : e.timepicker ? P.toLocaleString(e.locale) : P.toLocaleDateString(e.locale), C = (P) => P ? x(P) : "", k = (P) => {
      if (b.value) {
        u.value = P;
        return;
      }
      c.value = P;
    }, M = (P, B) => {
      l.value = P;
    }, L = (P) => {
      if (P.classList.contains("was-validated")) {
        if (e.range && d.value && f.value || !e.range && d.value) {
          y.value = !0;
          return;
        }
        y.value = !1;
      }
    }, A = (P) => {
      d.value = P, c.value = null, e.range && (b.value = !0), a("start-date-change", P, P ? x(P) : void 0), a("update:start-date", P), !(e.timepicker || e.footer) && e.closeOnSelect && !e.range && (s.value = !1);
    }, $ = (P) => {
      f.value = P, u.value = null, e.range && (b.value = !1), a("end-date-change", P, P ? x(P) : void 0), a("update:end-date", P), !(e.timepicker || e.footer) && e.closeOnSelect && d.value !== null && (s.value = !1);
    }, D = (P) => {
      P.stopPropagation(), d.value = null, f.value = null, c.value = null, u.value = null, a("start-date-change", null), a("end-date-change", null), a("update:start-date", null), a("update:end-date", null);
    }, _ = (P, B) => {
      const I = e.inputDateParse ? e.inputDateParse(P) : Dg(P, e.locale, e.timepicker);
      I instanceof Date && I.getTime() && (l.value = I, B === "start" ? d.value = I : f.value = I);
    }, T = () => h("div", {
      class: [
        "input-group",
        "picker-input-group",
        {
          [`input-group-${e.size}`]: e.size
        }
      ]
    }, [
      h("input", {
        autocomplete: "off",
        class: [
          "form-control date-picker-input",
          {
            hover: c.value
          }
        ],
        disabled: e.disabled,
        ...e.id && { name: e.range ? `${e.id}-start-date` : `${e.id}-date` },
        onClick: () => {
          b.value = !1;
        },
        onChange: (P) => _(P.target.value, "start"),
        onInput: (P) => gs(() => _(P.target.value, "start"), e.inputOnChangeDelay),
        placeholder: Array.isArray(e.placeholder) ? e.placeholder[0] : e.placeholder,
        readonly: e.inputReadOnly || typeof e.format == "string",
        required: e.required,
        ref: r,
        value: c.value ? C(c.value) : C(d.value)
      }),
      e.range && e.separator !== !1 && h("span", { class: "input-group-text" }, t.separator ? t.separator() : h("span", { class: "picker-input-group-icon date-picker-arrow-icon" })),
      e.range && h("input", {
        autocomplete: "off",
        class: [
          "form-control date-picker-input",
          {
            hover: u.value
          }
        ],
        disabled: e.disabled,
        ...e.id && { name: `${e.id}-end-date` },
        onClick: () => {
          b.value = !0;
        },
        onChange: (P) => _(P.target.value, "end"),
        onInput: (P) => gs(() => _(P.target.value, "end"), e.inputOnChangeDelay),
        placeholder: e.placeholder[1],
        readonly: e.inputReadOnly || typeof e.format == "string",
        required: e.required,
        ref: i,
        value: u.value ? C(u.value) : C(f.value)
      }),
      (e.indicator || e.cleaner) && h("span", { class: "input-group-text" }, [
        e.indicator && h("span", {
          class: "picker-input-group-indicator"
        }, t.indicator ? t.indicator() : h("span", { class: "picker-input-group-icon date-picker-input-icon" })),
        e.cleaner && h("span", {
          class: "picker-input-group-cleaner",
          onClick: (P) => D(P),
          role: "button"
        }, t.cleaner ? t.cleaner() : h("span", { class: "picker-input-group-icon date-picker-cleaner-icon" }))
      ])
    ]);
    return () => h(hn, {
      describedby: n["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      id: e.id,
      invalid: y.value === !1,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: y.value
    }, {
      default: () => h(hr, {
        class: [
          "date-picker",
          {
            disabled: e.disabled,
            "is-invalid": y.value === !1,
            "is-valid": y.value
          }
        ],
        disabled: e.disabled,
        dropdownClassNames: "date-picker-dropdown",
        footer: e.footer || e.timepicker,
        id: e.id,
        onHide: () => {
          s.value = !1, a("hide");
        },
        onShow: () => {
          d.value && (g.value = new Date(d.value)), f.value && (m.value = new Date(f.value)), s.value = !0, a("show");
        },
        visible: s.value
      }, {
        toggler: () => T(),
        footer: () => h("div", { class: "picker-footer" }, [
          e.todayButton && h(oe, {
            class: "me-auto",
            color: e.todayButtonColor,
            size: e.todayButtonSize,
            variant: e.todayButtonVariant,
            onClick: () => {
              const P = /* @__PURE__ */ new Date();
              d.value = P, e.range && (f.value = P), l.value = P;
            }
          }, () => e.todayButton),
          e.cancelButton && h(oe, {
            color: e.cancelButtonColor,
            onClick: () => {
              d.value = g.value, e.range && (f.value = m.value), s.value = !1;
            },
            size: e.cancelButtonSize,
            variant: e.cancelButtonVariant
          }, () => e.cancelButton),
          e.confirmButton && h(oe, {
            color: e.confirmButtonColor,
            onClick: () => {
              s.value = !1;
            },
            size: e.confirmButtonSize,
            variant: e.confirmButtonVariant
          }, () => e.confirmButton)
        ]),
        default: () => h("div", {
          class: "date-picker-body"
        }, [
          e.ranges && h("div", { class: "date-picker-ranges" }, Object.keys(e.ranges).map((P) => h(oe, {
            color: "secondary",
            onClick: () => {
              e.ranges && (d.value = e.ranges[P][0], f.value = e.ranges[P][1]);
            },
            variant: "ghost"
          }, () => P))),
          h("div", { class: "date-picker-calendars" }, h(Uf, {
            calendarDate: new Date(l.value.getFullYear(), l.value.getMonth(), 1),
            calendars: e.calendars,
            dayFormat: e.dayFormat,
            disabledDates: e.disabledDates,
            ...f.value && { endDate: f.value },
            firstDayOfWeek: e.firstDayOfWeek,
            locale: e.locale,
            ...v.value && { maxDate: v.value },
            ...p.value && { minDate: p.value },
            navYearFirst: e.navYearFirst,
            navigation: e.navigation,
            range: e.range,
            selectEndDate: b.value,
            selectAdjacementDays: e.selectAdjacementDays,
            showAdjacementDays: e.showAdjacementDays,
            ...d.value && { startDate: d.value },
            onCalendarCellHover: (P) => k(P),
            onCalendarDateChange: (P) => M(P),
            onStartDateChange: (P) => A(P),
            onEndDateChange: (P) => $(P)
          }, {
            /**
             * @slot Location for next icon.
             */
            ...t.navNextIcon && {
              navNextIcon: () => t.navNextIcon && t.navNextIcon()
            },
            /**
             * @slot Location for next double icon.
             */
            ...t.navNextDoubleIcon && {
              navNextDoubleIcon: () => t.navNextDoubleIcon && t.navNextDoubleIcon()
            },
            /**
             * @slot Location for previous icon.
             */
            ...t.navPrevIcon && {
              navPrevIcon: () => t.navPrevIcon && t.navPrevIcon()
            },
            /**
             * @slot Location for double previous icon.
             */
            ...t.navPrevDoubleIcon && {
              navPrevDoubleIcon: () => t.navPrevDoubleIcon && t.navPrevDoubleIcon()
            }
          })),
          e.timepicker && h("div", { class: "date-picker-timepickers" }, w.value || e.range && e.calendars === 1 ? [
            h(Ra, {
              container: "inline",
              disabled: d.value === null,
              locale: e.locale,
              onChange: (P, B, I) => A(I),
              time: d.value,
              variant: "select"
            }),
            h(Ra, {
              container: "inline",
              disabled: f.value === null,
              locale: e.locale,
              onChange: (P, B, I) => $(I),
              time: f.value,
              variant: "select"
            })
          ] : [...Array(e.calendars)].map((P, B) => h(Ra, {
            container: "inline",
            disabled: B === 0 ? d.value === null : f.value === null,
            locale: e.locale,
            onChange: (I, z, he) => B === 0 ? A(he) : $(he),
            time: B === 0 ? d.value : f.value,
            variant: "select"
          })))
        ])
      })
    });
  }
}), Pg = S({
  name: "CDatePicker",
  props: {
    /**
     * Default date of the component
     */
    calendarDate: {
      type: [Date, String]
    },
    /**
     * Toggle visibility or set the content of cancel button.
     */
    cancelButton: {
      type: [Boolean, String],
      default: "Cancel"
    },
    /**
     * Sets the color context of the cancel button to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    cancelButtonColor: {
      ...It,
      default: "primary"
    },
    /**
     * Size the cancel button small or large.
     *
     * @values 'sm', 'lg'
     */
    cancelButtonSize: {
      type: String,
      default: "sm",
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Set the cancel button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    cancelButtonVariant: {
      type: String,
      default: "ghost",
      validator: (e) => ["ghost", "outline"].includes(e)
    },
    /**
     * Toggle visibility of the cleaner button.
     */
    cleaner: {
      type: Boolean,
      default: !0
    },
    /**
     * Toggle visibility or set the content of confirm button.
     */
    confirmButton: {
      type: [Boolean, String],
      default: "OK"
    },
    /**
     * Sets the color context of the confirm button to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    confirmButtonColor: {
      ...It,
      default: "primary"
    },
    /**
     * Size the confirm button small or large.
     *
     * @values 'sm', 'lg'
     */
    confirmButtonSize: {
      type: String,
      default: "sm",
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Set the confirm button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    confirmButtonVariant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    },
    /**
     * Set the format of day name.
     *
     * @default 'numeric'
     * @since 4.6.0
     */
    dayFormat: {
      type: [Function, String],
      default: "numeric",
      required: !1,
      validator: (e) => typeof e == "string" ? ["numeric", "2-digit"].includes(e) : typeof e == "function" || typeof e == "function"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Specify the list of dates that cannot be selected.
     */
    disabledDates: {
      type: Array
    },
    /**
     * Initial selected date.
     */
    date: {
      type: [Date, String],
      required: !1
    },
    /**
     * Sets the day of start week.
     * - 0 - Sunday,
     * - 1 - Monday,
     * - 2 - Tuesday,
     * - 3 - Wednesday,
     * - 4 - Thursday,
     * - 5 - Friday,
     * - 6 - Saturday,
     */
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    /**
     * Set date format.
     * We use date-fns to format dates. Visit https://date-fns.org/v2.28.0/docs/format to check accepted patterns.
     */
    format: String,
    /**
     * Toggle visibility of footer element or set the content of footer.
     */
    footer: Boolean,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     *
     * The name attribute for the input element is generated based on the `id` property:
     * - {id}-date
     */
    id: String,
    /**
     * Toggle visibility or set the content of the input indicator.
     */
    indicator: {
      type: Boolean,
      default: !0
    },
    /**
     * Toggle the readonly state for the component.
     */
    inputReadOnly: Boolean,
    /**
     * Sets the default locale for components. If not set, it is inherited from the navigator.language.
     */
    locale: {
      type: String,
      default: "default"
    },
    /**
     * Max selectable date.
     */
    maxDate: {
      type: [Date, String]
    },
    /**
     * Min selectable date.
     */
    minDate: {
      type: [Date, String]
    },
    /**
     * Show arrows navigation.
     */
    navigation: {
      type: Boolean,
      default: !0
    },
    /**
     * Reorder year-month navigation, and render year first.
     *
     * @since 4.6.0
     */
    navYearFirst: Boolean,
    /**
     * Specifies a short hint that is visible in the input.
     */
    placeholder: {
      type: String,
      default: "Select date"
    },
    /**
     * Set whether days in adjacent months shown before or after the current month are selectable. This only applies if the `showAdjacementDays` option is set to true.
     *
     * @since 4.9.0
     */
    selectAdjacementDays: Boolean,
    /**
     * Set whether to display dates in adjacent months (non-selectable) at the start and end of the current month.
     *
     * @since 4.9.0
     */
    showAdjacementDays: {
      type: Boolean,
      default: !0
    },
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      required: !1,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Provide an additional time selection by adding select boxes to choose times.
     */
    timepicker: Boolean,
    /**
     * Set length or format of day name.
     *
     * @type  number | 'long' | 'narrow' | 'short'
     */
    weekdayFormat: {
      type: [Function, Number, String],
      default: 2,
      validator: (e) => typeof e == "string" ? ["long", "narrow", "short"].includes(e) : typeof e == "number" || typeof e == "function"
    }
  },
  emits: [
    /**
     * Callback fired when the date changed.
     *
     * @property {Date} date - date object
     * @property {string} formatedDate - formated date
     */
    "date-change",
    /**
     * Callback fired when the date changed.
     *
     * @property {Date | null} date - date object
     * @since 4.7.0
     */
    "update:date"
  ],
  setup(e, { emit: t }) {
    return () => h(ou, {
      calendars: 1,
      onStartDateChange: (n, a) => {
        t("date-change", n, a), t("update:date", n);
      },
      range: !1,
      startDate: e.date,
      ...e
    });
  }
}), Mg = (e, t, n, a) => {
  let i = e;
  return t === "dropup" && (i = a ? "top-end" : "top-start"), t === "dropup-center" && (i = "top"), t === "dropend" && (i = a ? "left-start" : "right-start"), t === "dropstart" && (i = a ? "right-start" : "left-start"), n === "end" && (i = a ? "bottom-start" : "bottom-end"), i;
}, Tg = S({
  name: "CDropdown",
  props: {
    /**
     * Set aligment of dropdown menu.
     *
     * @values { 'start' | 'end' | { xs: 'start' | 'end' } | { sm: 'start' | 'end' } | { md: 'start' | 'end' } | { lg: 'start' | 'end' } | { xl: 'start' | 'end'} | { xxl: 'start' | 'end'} }
     */
    alignment: {
      type: [String, Object],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => e === "start" || e === "end" ? !0 : e.xs !== void 0 && (e.xs === "start" || e.xs === "end") || e.sm !== void 0 && (e.sm === "start" || e.sm === "end") || e.md !== void 0 && (e.md === "start" || e.md === "end") || e.lg !== void 0 && (e.lg === "start" || e.lg === "end") || e.xl !== void 0 && (e.xl === "start" || e.xl === "end") || e.xxl !== void 0 && (e.xxl === "start" || e.xxl === "end")
    },
    /**
     * Configure the auto close behavior of the dropdown:
     * - `true` - the dropdown will be closed by clicking outside or inside the dropdown menu.
     * - `false` - the dropdown will be closed by clicking the toggle button and manually calling hide or toggle method. (Also will not be closed by pressing esc key)
     * - `'inside'` - the dropdown will be closed (only) by clicking inside the dropdown menu.
     * - `'outside'` - the dropdown will be closed (only) by clicking outside the dropdown menu.
     */
    autoClose: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "boolean" || ["inside", "outside"].includes(e)
    },
    /**
     * Sets a darker color scheme to match a dark navbar.
     */
    dark: Boolean,
    /**
     * Sets a specified  direction and location of the dropdown menu.
     *
     * @values 'center', 'dropup', 'dropup-center', 'dropend', 'dropstart'
     */
    direction: {
      type: String,
      validator: (e) => ["center", "dropup", "dropup-center", "dropend", "dropstart"].includes(e)
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Offset of the dropdown menu relative to its target.
     *
     * @since 4.9.0
     */
    offset: {
      type: Array,
      default: () => [0, 2]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     *
     * @values 'auto', 'top-end', 'top', 'top-start', 'bottom-end', 'bottom', 'bottom-start', 'right-start', 'right', 'right-end', 'left-start', 'left', 'left-end'
     */
    placement: {
      type: String,
      default: "bottom-start"
    },
    /**
     * If you want to disable dynamic positioning set this property to `true`.
     */
    popper: {
      type: Boolean,
      default: !0
    },
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     */
    trigger: {
      type: String,
      default: "click"
    },
    /**
     * Set the dropdown variant to an btn-group, dropdown, input-group, and nav-item.
     *
     * @values 'btn-group', 'dropdown', 'input-group', 'nav-item'
     */
    variant: {
      type: String,
      default: "btn-group",
      validator: (e) => ["btn-group", "dropdown", "input-group", "nav-item"].includes(e)
    },
    /**
     * Toggle the visibility of dropdown menu component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = O(), i = O(), r = O(typeof e.alignment == "object" ? !1 : e.popper), o = O(e.visible), { initPopper: s, destroyPopper: l } = to(), c = {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: e.offset
          }
        }
      ],
      placement: Mg(e.placement, e.direction, e.alignment, Zn(i.value))
    };
    E(() => e.visible, () => {
      o.value = e.visible;
    }), E(o, () => {
      if (o.value && a.value && i.value) {
        r.value && s(a.value, i.value, c), window.addEventListener("mouseup", d), window.addEventListener("keyup", u), n("show");
        return;
      }
      r.value && l(), window.removeEventListener("mouseup", d), window.removeEventListener("keyup", u), n("hide");
    }), ue("config", {
      alignment: e.alignment,
      dark: e.dark,
      popper: e.popper
    }), ue("variant", e.variant), ue("visible", o), ue("dropdownToggleRef", a), ue("dropdownMenuRef", i);
    const u = (g) => {
      e.autoClose !== !1 && g.key === "Escape" && f(!1);
    }, d = (g) => {
      if (!(!a.value || !i.value) && !a.value.contains(g.target) && (e.autoClose === !0 || e.autoClose === "inside" && i.value.contains(g.target) || e.autoClose === "outside" && !i.value.contains(g.target))) {
        f(!1);
        return;
      }
    }, f = (g) => {
      if (!e.disabled) {
        if (typeof g == "boolean") {
          o.value = g;
          return;
        }
        if (o.value === !0) {
          o.value = !1;
          return;
        }
        o.value = !0;
      }
    };
    return ue("setVisible", f), () => e.variant === "input-group" ? [t.default && t.default()] : h("div", {
      class: [
        e.variant === "nav-item" ? "nav-item dropdown" : e.variant,
        e.direction === "center" ? "dropdown-center" : e.direction === "dropup-center" ? "dropup dropup-center" : e.direction
      ]
    }, t.default && t.default());
  }
}), Ag = S({
  name: "CDropdownItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => h(la, {
      class: "dropdown-item",
      active: e.active,
      component: e.component,
      disabled: e.disabled,
      href: e.href
    }, {
      default: () => t.default && t.default()
    });
  }
}), Lg = S({
  name: "CDropdownHeader",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h6"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: "dropdown-header"
    }, t.default && t.default());
  }
}), $g = S({
  name: "CDropdownDivider",
  setup() {
    return () => h("hr", {
      class: "dropdown-divider"
    });
  }
}), Bg = S({
  name: "CDropdownMenu",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     *
     * @values 'div', 'ul'
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    const n = ae("dropdownMenuRef"), a = ae("config"), i = ae("visible"), { alignment: r, dark: o, popper: s } = a, l = (c) => {
      const u = [];
      return typeof c == "object" && Object.keys(c).map((d) => {
        u.push(`dropdown-menu${d === "xs" ? "" : `-${d}`}-${c[d]}`);
      }), typeof c == "string" && u.push(`dropdown-menu-${c}`), u;
    };
    return () => h(e.component, {
      class: [
        "dropdown-menu",
        { "dropdown-menu-dark": o, show: i.value },
        l(r)
      ],
      ...(typeof r == "object" || !s) && {
        "data-coreui-popper": "static"
      },
      ref: n
    }, e.component === "ul" ? t.default && t.default().map((c) => h("li", {}, c)) : t.default && t.default());
  }
}), Eg = S({
  name: "CDropdownToggle",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Enables pseudo element caret on toggler.
     */
    caret: {
      type: Boolean,
      default: !0
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "button"
    },
    /**
     * Create a custom toggler which accepts any content.
     */
    custom: Boolean,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: fi,
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of `.dropdown-toggle-split` className for proper spacing around the dropdown caret.
     */
    split: Boolean,
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @type 'hover' | 'focus' | 'click'
     */
    trigger: {
      type: String,
      default: "click"
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    variant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    const n = O(), a = ae("dropdownToggleRef"), i = ae("variant"), r = ae("visible"), o = ae("setVisible"), s = [
      {
        "dropdown-toggle": e.caret,
        "dropdown-toggle-split": e.split,
        active: e.active,
        disabled: e.disabled
      }
    ], l = {
      ...(e.trigger === "click" || e.trigger.includes("click")) && {
        onClick: () => {
          e.disabled || o();
        }
      },
      ...(e.trigger === "focus" || e.trigger.includes("focus")) && {
        onfocus: () => {
          e.disabled || o(!0);
        },
        onblur: () => {
          e.disabled || o(!1);
        }
      }
    };
    return _e(() => {
      n.value && (a.value = n.value.$el);
    }), () => e.custom ? t.default && t.default().map((c) => Vr(c, {
      ref: (u) => {
        n.value = u;
      },
      ...l
    })) : i === "nav-item" ? h("a", {
      active: e.active,
      class: [
        "nav-link",
        s,
        {
          show: r.value
        }
      ],
      disabled: e.disabled,
      href: "#",
      ref: a,
      ...l
    }, { default: () => t.default && t.default() }) : h(oe, {
      class: [
        s,
        {
          show: r.value
        }
      ],
      active: e.active,
      color: e.color,
      disabled: e.disabled,
      ref: (c) => {
        n.value = c;
      },
      shape: e.shape,
      size: e.size,
      ...l,
      ...e.component === "button" && { type: "button" },
      variant: e.variant
    }, () => e.split ? h("span", { class: "visually-hidden" }, "Toggle Dropdown") : t.default && t.default());
  }
}), no = S({
  name: "CSpinner",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: {
      type: String,
      validator: (e) => [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light"
      ].includes(e)
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    },
    /**
     * Size the component small.
     *
     * @values 'sm'
     */
    size: {
      type: String,
      validator: (e) => e === "sm"
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'border', 'grow'
     */
    variant: {
      type: String,
      default: "border",
      validator: (e) => ["border", "grow"].includes(e)
    },
    /**
     * Set visually hidden label for accessibility purposes.
     */
    visuallyHiddenLabel: {
      type: String,
      default: "Loading..."
    }
  },
  setup(e) {
    return () => h(e.component, {
      class: [
        `spinner-${e.variant}`,
        {
          [`spinner-${e.variant}-${e.size}`]: e.size,
          [`text-${e.color}`]: e.color
        }
      ],
      role: "status"
    }, h("span", { class: ["visually-hidden"] }, e.visuallyHiddenLabel));
  }
}), su = S({
  name: "CElementCover",
  props: {
    /**
     * Array of custom boundaries. Use to create custom cover area (instead of parent element area). Area is defined by four sides: 'top', 'bottom', 'right', 'left'. If side is not defined by any custom boundary it is equal to parent element boundary. Each custom boundary is object with keys:
     * - sides (array) - select boundaries of element to define boundaries. Sides names: 'top', 'bottom', 'right', 'left'.
     * - query (string) - query used to get element which define boundaries. Search will be done only inside parent element, by parent.querySelector(query) function. [docs]
     *
     * @type {sides: string[], query: string}[]
     */
    boundaries: Array,
    /**
     * Opacity of the cover. [docs]
     *
     * @type number
     */
    opacity: {
      type: Number,
      default: 0.4
    }
  },
  /**
   * Location for custom content.
   *
   * @slot default
   */
  setup(e, { slots: t }) {
    const n = O(), a = O({}), i = () => {
      if (!e.boundaries || n === null)
        return {};
      const s = n.value.parentElement;
      if (!s)
        return {};
      const l = s.getBoundingClientRect(), c = {};
      return e.boundaries.forEach(({ sides: u, query: d }) => {
        const f = s.querySelector(d);
        if (!f || !u)
          return;
        const g = f.getBoundingClientRect();
        u.forEach((m) => {
          const v = Math.abs(g[m] - l[m]);
          c[m] = `${v}px`;
        });
      }), c;
    }, o = {
      ...{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      position: "absolute",
      "z-index": 2,
      "background-color": `rgba(255,255,255,${e.opacity})`
    };
    return _e(() => {
      mf(() => {
        a.value = i();
      });
    }), () => h("div", {
      style: { ...o, ...a.value },
      ref: n
    }, h("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)"
      }
    }, t.default ? t.default() : h(no, {
      variant: "grow",
      color: "primary"
    })));
  }
}), lu = S({
  name: "CFooter",
  props: {
    /**
     * Place footer in non-static positions.
     *
     * @values 'fixed', 'sticky'
     */
    position: {
      type: String,
      validator: (e) => ["fixed", "sticky"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h("div", { class: ["footer", { [`footer-${e.position}`]: e.position }] }, t.default && t.default());
  }
}), gr = S({
  name: "CForm",
  props: {
    /**
     * Mark a form as validated. If you set it `true`, all validation styles will be applied to the forms component.
     */
    validated: Boolean
  },
  setup(e, { slots: t }) {
    return () => h("form", { class: [{ "was-validated": e.validated }] }, t.default && t.default());
  }
}), ta = S({
  name: "CFormCheck",
  inheritAttrs: !1,
  props: {
    /**
     * Create button-like checkboxes and radio buttons.
     *
     * @see http://coreui.io/vue/docs/components/button.html
     */
    button: Object,
    /**
     * Use in conjunction with the v-model directive to specify the value that should be assigned to the bound variable when the checkbox is in the `false` state.
     *
     * @since 4.10.0
     */
    falseValue: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Sets hit area to the full area of the component.
     */
    hitArea: {
      type: String,
      validator: (e) => ["full"].includes(e)
    },
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Input Checkbox indeterminate Property
     */
    indeterminate: Boolean,
    /**
     * Group checkboxes or radios on the same horizontal row by adding.
     */
    inline: Boolean,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * The element represents a caption for a component.
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: {
      type: [Array, Boolean, String],
      value: void 0
    },
    /**
     * Put checkboxes or radios on the opposite side.
     *
     * @since 4.8.0
     */
    reverse: Boolean,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Use in conjunction with the v-model directive to specify the value that should be assigned to the bound variable when the checkbox is in the `true` state.
     *
     * @since 4.10.0
     */
    trueValue: String,
    /**
     * Specifies the type of component.
     *
     * @values 'checkbox', 'radio'
     */
    type: {
      type: String,
      default: "checkbox"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean,
    /**
     * The value attribute of component.
     */
    value: String
  },
  emits: [
    /**
     * Event occurs when the checked value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = (d) => {
      const f = d.target;
      if (n("change", d), e.falseValue && e.trueValue) {
        n("update:modelValue", f.checked ? e.trueValue : e.falseValue);
        return;
      }
      if (e.value && Array.isArray(e.modelValue)) {
        e.modelValue.includes(e.value) ? n("update:modelValue", e.modelValue.filter((g) => g !== e.value)) : n("update:modelValue", [...e.modelValue, e.value]);
        return;
      }
      if (e.value === void 0) {
        n("update:modelValue", f.checked);
        return;
      }
      e.value && (e.modelValue === void 0 || typeof e.modelValue == "string") && n("update:modelValue", f.checked ? e.value : void 0);
    }, r = [
      "form-check",
      {
        "form-check-inline": e.inline,
        "form-check-reverse": e.reverse,
        "is-invalid": e.invalid,
        "is-valid": e.valid
      },
      t.class
    ], o = [
      e.button ? "btn-check" : "form-check-input",
      {
        "is-invalid": e.invalid,
        "is-valid": e.valid,
        "me-2": e.hitArea
      }
    ], s = j(() => Array.isArray(e.modelValue) ? e.modelValue.includes(e.value) : typeof e.modelValue == "string" ? e.modelValue === e.value : e.modelValue), l = () => h("input", {
      ...t,
      ...(e.modelValue || e.value) && { checked: s.value },
      class: o,
      id: e.id,
      indeterminate: e.indeterminate,
      onChange: (d) => i(d),
      type: e.type,
      value: e.value
    }), c = () => e.button ? h(oe, {
      component: "label",
      ...e.button,
      ...e.id && { for: e.id }
    }, {
      default: () => a.label && a.label() || e.label
    }) : h(Ne, { class: "form-check-label", ...e.id && { for: e.id } }, {
      default: () => a.label && a.label() || e.label
    }), u = () => h(ur, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      invalid: e.invalid,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    });
    return () => e.button ? [l(), (a.label || e.label) && c(), u()] : e.label ? e.hitArea ? [
      h(Ne, {
        customClassName: r,
        ...e.id && { for: e.id }
      }, [l(), e.label]),
      u()
    ] : h("div", {
      class: r
    }, [l(), e.label && c(), u()]) : l();
  }
}), Ig = typeof window > "u" ? class extends Object {
} : window.File, na = S({
  name: "CFormInput",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    // Inherited Props from CFormControlWrapper
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: [Ig, Number, String],
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText: Boolean,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Size the component small or large.
     *
     * @values 'sm' | 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Specifies the type of component.
     *
     * @values 'color' | 'file' | 'text' | string
     */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the element loses focus, after the content has been changed.
     */
    "change",
    /**
     * Event occurs immediately after the value of a component has changed.
     */
    "input",
    /**
     * Emit the new value whenever there’s an input or change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = (o) => {
      const s = o.target;
      n("change", o), n("update:modelValue", s.value);
    }, r = (o) => {
      const s = o.target;
      n("input", o), n("update:modelValue", s.value);
    };
    return () => h(hn, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      id: e.id,
      invalid: e.invalid,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      default: () => h("input", {
        id: e.id,
        ...t,
        class: [
          e.plainText ? "form-control-plaintext" : "form-control",
          {
            "form-control-color": e.type === "color",
            [`form-control-${e.size}`]: e.size,
            "is-invalid": e.invalid,
            "is-valid": e.valid
          },
          t.class
        ],
        disabled: e.disabled,
        onChange: (o) => i(o),
        onInput: (o) => r(o),
        readonly: e.readonly,
        type: e.type,
        ...(e.modelValue || e.modelValue === 0) && { value: e.modelValue }
      }, a.default && a.default()),
      ...a.feedback && { feedback: () => a.feedback && a.feedback() },
      ...a.feedbackInvalid && {
        feedbackInvalid: () => a.feedbackInvalid && a.feedbackInvalid()
      },
      ...a.feedbackValid && {
        feedbackValid: () => a.feedbackInvalid && a.feedbackInvalid()
      },
      ...a.label && { label: () => a.label && a.label() },
      ...a.text && { text: () => a.text && a.text() }
    });
  }
}), mr = S({
  name: "CFormRange",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * Specifies the maximum value for the component.
     */
    max: Number,
    /**
     * Specifies the minimum value for the component.
     */
    min: Number,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: String,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Specifies the interval between legal numbers in the component.
     */
    steps: Number,
    /**
     * The `value` attribute of component.
     *
     * @controllable onChange
     * */
    value: Number
  },
  emits: [
    /**
     * Event occurs when the value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = (r) => {
      const o = r.target;
      n("change", r), n("update:modelValue", o.value);
    };
    return () => [
      e.label && h(Ne, {
        for: t.id
      }, {
        default: () => a.label && a.label() || e.label
      }),
      h("input", {
        ...t,
        class: "form-range",
        disabled: e.disabled,
        max: e.max,
        min: e.min,
        onChange: (r) => i(r),
        readonly: e.readonly,
        steps: e.steps,
        type: "range",
        value: e.modelValue
      }, a.default && a.default())
    ];
  }
}), Ua = S({
  name: "CFormSelect",
  props: {
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * Specifies the number of visible options in a drop-down list.
     */
    htmlSize: Number,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: {
      type: [String, Array]
    },
    multiple: Boolean,
    /**
     * Options list of the select component. Available keys: `label`, `value`, `disabled`.
     * Examples:
     * - `:options="[{ value: 'js', label: 'JavaScript' }, { value: 'html', label: 'HTML', disabled: true }]"`
     * - `:options="['js', 'html']"`
     */
    options: Array,
    /**
     * Size the component small or large.
     *
     * @values 'sm' | 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when when a user changes the selected option of a `<select>` element.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = (r) => {
      const o = r.target, s = Array.from(o.options).filter((l) => l.selected).map((l) => l.value);
      n("change", r), n("update:modelValue", o.multiple ? s : s[0]);
    };
    return () => h(hn, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      id: e.id,
      invalid: e.invalid,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      default: () => h("select", {
        id: e.id,
        ...t,
        class: [
          "form-select",
          {
            [`form-select-${e.size}`]: e.size,
            "is-invalid": e.invalid,
            "is-valid": e.valid
          },
          t.class
        ],
        multiple: e.multiple,
        onChange: (r) => i(r),
        size: e.htmlSize,
        ...e.modelValue && !e.multiple && { value: e.modelValue }
      }, e.options ? e.options.map((r) => h("option", {
        ...typeof r == "object" && {
          ...r.disabled && { disabled: r.disabled },
          ...r.selected && { selected: r.selected },
          ...r.value !== void 0 && {
            value: r.value,
            ...e.modelValue && e.multiple && e.modelValue.includes(r.value) && { selected: !0 }
          }
        }
      }, typeof r == "string" ? r : r.label)) : a.default && a.default()),
      ...a.feedback && { feedback: () => a.feedback && a.feedback() },
      ...a.feedbackInvalid && {
        feedbackInvalid: () => a.feedbackInvalid && a.feedbackInvalid()
      },
      ...a.feedbackValid && {
        feedbackValid: () => a.feedbackInvalid && a.feedbackInvalid()
      },
      ...a.label && { label: () => a.label && a.label() },
      ...a.text && { text: () => a.text && a.text() }
    });
  }
}), vr = S({
  name: "CFormSwitch",
  inheritAttrs: !1,
  props: {
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * The element represents a caption for a component.
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: [Boolean, String],
    /**
     * Put checkboxes or radios on the opposite side.
     *
     * @since 4.8.0
     */
    reverse: Boolean,
    /**
     * Size the component large or extra large. Works only with `switch`.
     *
     * @values 'lg' | 'xl'
     */
    size: {
      type: String,
      validator: (e) => ["lg", "xl"].includes(e)
    },
    /**
     * Specifies the type of component.
     *
     * @values 'checkbox', 'radio'
     */
    type: {
      type: String,
      default: "checkbox"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the checked value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n }) {
    const a = (i) => {
      const r = i.target;
      n("change", i), n("update:modelValue", r.checked);
    };
    return () => h("div", {
      class: [
        "form-check form-switch",
        {
          "form-check-reverse": e.reverse,
          [`form-switch-${e.size}`]: e.size,
          "is-invalid": e.invalid,
          "is-valid": e.valid
        }
      ]
    }, [
      h("input", {
        ...t,
        ...e.modelValue && { checked: e.modelValue },
        class: [
          "form-check-input",
          {
            "is-invalid": e.invalid,
            "is-valid": e.valid
          }
        ],
        id: e.id,
        onChange: (i) => a(i),
        type: e.type
      }),
      e.label && h(Ne, {
        ...e.id && { for: e.id },
        class: "form-check-label"
      }, {
        default: () => e.label
      })
    ]);
  }
}), pr = S({
  name: "CFormTextarea",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: String,
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText: Boolean,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the element loses focus, after the content has been changed.
     */
    "change",
    /**
     * Event occurs immediately after the value of a component has changed.
     */
    "input",
    /**
     * Emit the new value whenever there’s an input or change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = (o) => {
      const s = o.target;
      n("change", o), n("update:modelValue", s.value);
    }, r = (o) => {
      const s = o.target;
      n("input", o), n("update:modelValue", s.value);
    };
    return () => h(hn, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      id: e.id,
      invalid: e.invalid,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      default: () => h("textarea", {
        id: e.id,
        ...t,
        disabled: e.disabled,
        readonly: e.readonly,
        class: [
          e.plainText ? "form-control-plaintext" : "form-control",
          {
            "is-invalid": e.invalid,
            "is-valid": e.valid
          }
        ],
        onChange: (o) => i(o),
        onInput: (o) => r(o),
        ...e.modelValue && { value: e.modelValue }
      }, a.default && a.default()),
      ...a.feedback && { feedback: () => a.feedback && a.feedback() },
      ...a.feedbackInvalid && {
        feedbackInvalid: () => a.feedbackInvalid && a.feedbackInvalid()
      },
      ...a.feedbackValid && {
        feedbackValid: () => a.feedbackInvalid && a.feedbackInvalid()
      },
      ...a.label && { label: () => a.label && a.label() },
      ...a.text && { text: () => a.text && a.text() }
    });
  }
}), br = S({
  name: "CInputGroup",
  props: {
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        "input-group",
        {
          [`input-group-${e.size}`]: e.size
        }
      ]
    }, t.default && t.default());
  }
}), yr = S({
  name: "CInputGroupText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "input-group-text" }, t.default && t.default());
  }
}), Fg = {
  install: (e) => {
    e.component(gr.name, gr), e.component(ta.name, ta), e.component(en.name, en), e.component(Wa.name, Wa), e.component(na.name, na), e.component(Ne.name, Ne), e.component(mr.name, mr), e.component(Ua.name, Ua), e.component(vr.name, vr), e.component(Qn.name, Qn), e.component(pr.name, pr), e.component(br.name, br), e.component(yr.name, yr);
  }
}, Rg = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
], Vn = S({
  name: "CCol",
  props: {
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xs: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    sm: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    md: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    lg: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xl: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xxl: {
      type: [Boolean, Number, String, Object]
    }
  },
  setup(e, { slots: t }) {
    const n = [];
    return Rg.forEach((a) => {
      const i = e[a], r = a === "xs" ? "" : `-${a}`;
      i && ((typeof i == "number" || typeof i == "string") && n.push(`col${r}-${i}`), typeof i == "boolean" && n.push(`col${r}`)), i && typeof i == "object" && ((typeof i.span == "number" || typeof i.span == "string") && n.push(`col${r}-${i.span}`), typeof i.span == "boolean" && n.push(`col${r}`), (typeof i.order == "number" || typeof i.order == "string") && n.push(`order${r}-${i.order}`), typeof i.offset == "number" && n.push(`offset${r}-${i.offset}`));
    }), () => h("div", {
      class: [n.length > 0 ? n : "col"]
    }, t.default && t.default());
  }
}), Ng = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "fluid"
], cu = S({
  name: "CContainer",
  props: {
    /**
     * Set container 100% wide until small breakpoint.
     */
    sm: Boolean,
    /**
     * Set container 100% wide until medium breakpoint.
     */
    md: Boolean,
    /**
     * Set container 100% wide until large breakpoint.
     */
    lg: Boolean,
    /**
     * Set container 100% wide until X-large breakpoint.
     */
    xl: Boolean,
    /**
     * Set container 100% wide until XX-large breakpoint.
     */
    xxl: Boolean,
    /**
     * Set container 100% wide, spanning the entire width of the viewport.
     */
    fluid: Boolean
  },
  setup(e, { slots: t }) {
    const n = [];
    return Ng.forEach((a) => {
      e[a] && n.push(`container-${a}`);
    }), () => h("div", {
      class: [n.length > 0 ? n : "container"]
    }, t.default && t.default());
  }
}), jg = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
], zg = S({
  name: "CRow",
  props: {
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xs: Object,
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    sm: Object,
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    md: Object,
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    lg: Object,
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xl: Object,
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xxl: Object
  },
  setup(e, { slots: t }) {
    const n = [];
    return jg.forEach((a) => {
      const i = e[a], r = a === "xs" ? "" : `-${a}`;
      typeof i == "object" && (i.cols && n.push(`row-cols${r}-${i.cols}`), typeof i.gutter == "number" && n.push(`g${r}-${i.gutter}`), typeof i.gutterX == "number" && n.push(`gx${r}-${i.gutterX}`), typeof i.gutterY == "number" && n.push(`gy${r}-${i.gutterY}`));
    }), () => h("div", {
      class: ["row", n]
    }, t.default && t.default());
  }
}), Vg = S({
  name: "CHeader",
  props: {
    /**
     * Defines optional container wrapping children elements.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'
     */
    container: {
      type: [Boolean, String],
      validator: (e) => typeof e == "boolean" || ["sm", "md", "lg", "xl", "xxl", "fluid"].includes(e)
    },
    /**
     * Place header in non-static positions.
     *
     * @values 'fixed', 'sticky'
     */
    position: {
      type: String,
      validator: (e) => ["fixed", "sticky"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h("div", { class: ["header", { [`header-${e.position}`]: e.position }] }, e.container ? h("div", { class: `container${e.container === !0 ? "" : "-" + e.container}` }, t.default && t.default()) : t.default && t.default());
  }
});
S({
  name: "CHeaderBrand",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "header-brand" }, t.default && t.default());
  }
});
S({
  name: "CHeaderDivider",
  setup(e, { slots: t }) {
    return () => h("div", { class: "header-divider" }, t.default && t.default());
  }
});
S({
  name: "CHeaderNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: "header-nav",
      role: "navigation"
    }, t.default && t.default());
  }
});
S({
  name: "CHeaderText",
  setup(e, { slots: t }) {
    return () => h("span", { class: "header-text" }, t.default && t.default());
  }
});
const uu = S({
  name: "CHeaderToggler",
  setup(e, { slots: t }) {
    return () => h("button", {
      class: "header-toggler",
      type: "button",
      "aria-label": "Toggle navigation"
    }, t.default ? t.default() : h("span", { class: ["header-toggler-icon"] }));
  }
}), Hg = S({
  name: "CImage",
  props: {
    /**
     * Set the horizontal aligment.
     *
     * @values 'start', 'center', 'end'
     */
    align: {
      type: String,
      validator: (e) => ["start", "center", "end"].includes(e)
    },
    /**
     * Make image responsive.
     */
    fluid: Boolean,
    /**
     * Make image rounded.
     */
    rounded: Boolean,
    /**
     * Give an image a rounded 1px border appearance.
     */
    thumbnail: Boolean
  },
  setup(e) {
    return () => h("img", {
      class: [
        {
          [`float-${e.align}`]: e.align && (e.align === "start" || e.align === "end"),
          "d-block mx-auto": e.align && e.align === "center",
          "img-fluid": e.fluid,
          rounded: e.rounded,
          "img-thumbnail": e.thumbnail
        }
      ]
    });
  }
}), Wg = S({
  name: "CListGroup",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    },
    /**
     * Remove some borders and rounded corners to render list group items edge-to-edge in a parent component (e.g., `<CCard>`)
     */
    flush: Boolean,
    /**
     * Specify a layout type.
     *
     * @values 'horizontal', 'horizontal-sm', 'horizontal-md', 'horizontal-lg', 'horizontal-xl', 'horizontal-xxl',
     */
    layout: {
      type: String,
      validator: (e) => [
        "horizontal",
        "horizontal-sm",
        "horizontal-md",
        "horizontal-lg",
        "horizontal-xl",
        "horizontal-xxl"
      ].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: [
        "list-group",
        {
          "list-group-flush": e.flush,
          [`list-group-${e.layout}`]: e.layout
        }
      ]
    }, t.default && t.default());
  }
}), Yg = S({
  name: "CListGroupItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "li"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: [
        "list-group-item",
        {
          [`list-group-item-${e.color}`]: e.color,
          "list-group-item-action": e.component === "a" || e.component === "button",
          active: e.active,
          disabled: e.disabled
        }
      ],
      ...(e.component === "a" || e.component === "button") && {
        active: e.active,
        disabled: e.disabled
      },
      ...e.active && { "aria-current": !0 },
      ...e.disabled && { "aria-disabled": !0 }
    }, t.default && t.default());
  }
}), Ug = S({
  name: "CLoadingButton",
  props: {
    /**
     * Makes button disabled when loading.
     */
    disabledOnLoading: Boolean,
    /**
     * Loading state (set to true to start animation).
     */
    loading: {
      type: Boolean,
      default: !1,
      required: !1
    },
    /**
     * Sets type of spinner.
     *
     * @values 'border', 'grow'
     * @default 'border'
     */
    spinnerType: {
      type: String,
      default: "border",
      required: !1,
      validator: (e) => ["border", "grow"].includes(e)
    },
    /**
     * Automatically starts loading animation and stops after a determined amount of milliseconds.
     */
    timeout: {
      type: Number,
      default: void 0,
      required: !1
    },
    ...oe.props
  },
  emits: [
    /**
     * Event called when the user clicks on a component.
     */
    "click"
  ],
  setup(e, { emit: t, slots: n }) {
    const a = O(e.loading);
    E(() => e.loading, () => {
      a.value = e.loading;
    });
    const i = () => {
      t("click"), e.timeout && (a.value = !0, setTimeout(() => {
        a.value = !1;
      }, e.timeout));
    };
    return () => h(oe, {
      ...e,
      class: ["btn-loading", { "is-loading": a.value }],
      ...e.disabledOnLoading && a.value && { disabled: !0 },
      onClick: () => i()
    }, {
      default: () => [
        h(no, { class: "btn-loading-spinner", size: "sm", variant: e.spinnerType }),
        n.default && n.default()
      ]
    });
  }
}), qg = S({
  name: "CModal",
  inheritAttrs: !1,
  props: {
    /**
     * Align the modal in the center or top of the screen.
     *
     * @values 'top', 'center'
     */
    alignment: {
      default: "top",
      validator: (e) => ["top", "center"].includes(e)
    },
    /**
     * Apply a backdrop on body while offcanvas is open.
     *
     * @values boolean | 'static'
     */
    backdrop: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "string" ? ["static"].includes(e) : typeof e == "boolean"
    },
    /**
     * A string of all className you want applied to the modal content component.
     */
    contentClassName: String,
    /**
     * Set modal to covers the entire user viewport
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl'
     */
    fullscreen: {
      type: [Boolean, String],
      validator: (e) => typeof e == "string" ? ["sm", "md", "lg", "xl", "xxl"].includes(e) : typeof e == "boolean"
    },
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard: {
      type: Boolean,
      default: !0
    },
    /**
     * Create a scrollable modal that allows scrolling the modal body.
     */
    scrollable: Boolean,
    /**
     * Size the component small, large, or extra large.
     *
     * @values 'sm', 'lg', 'xl'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg", "xl"].includes(e)
    },
    /**
     * Remove animation to create modal that simply appear rather than fade in to view.
     */
    transition: {
      type: Boolean,
      default: !0
    },
    /**
     * By default the component is unmounted after close animation, if you want to keep the component mounted set this property to false.
     */
    unmountOnClose: {
      type: Boolean,
      default: !0
    },
    /**
     * Toggle the visibility of alert component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close",
    /**
     * Callback fired when the component requests to be closed.
     */
    "close-prevented",
    /**
     * Callback fired when the modal is shown, its backdrop is static and a click outside the modal or an escape key press is performed with the keyboard option set to false.
     */
    "show"
  ],
  setup(e, { slots: t, attrs: n, emit: a }) {
    const i = O(), r = O(), o = O(e.visible);
    E(() => e.visible, () => {
      o.value = e.visible;
    });
    const s = (p, b) => {
      be(() => b(), p), document.body.classList.add("modal-open"), document.body.style.overflow = "hidden", document.body.style.paddingRight = "0px", p.style.display = "block", setTimeout(() => {
        p.classList.add("show");
      }, 1), a("show");
    }, l = () => {
      window.addEventListener("mousedown", g), window.addEventListener("keyup", f);
    }, c = (p, b) => {
      be(() => b(), p), document.body.classList.remove("modal-open"), document.body.style.removeProperty("overflow"), document.body.style.removeProperty("padding-right"), document.body.className === "" && document.body.removeAttribute("class"), p.classList.remove("show");
    }, u = (p) => {
      window.removeEventListener("mousedown", g), window.removeEventListener("keyup", f), p.style.display = "none";
    }, d = () => {
      a("close"), o.value = !1;
    }, f = (p) => {
      r.value && !r.value.contains(p.target) && (e.backdrop !== "static" && p.key === "Escape" && e.keyboard && d(), e.backdrop === "static" && (i.value.classList.add("modal-static"), a("close-prevented"), setTimeout(() => {
        i.value.classList.remove("modal-static");
      }, 300)));
    }, g = (p) => {
      window.addEventListener("mouseup", () => m(p), { once: !0 });
    }, m = (p) => {
      r.value && !r.value.contains(p.target) && (e.backdrop !== "static" && d(), e.backdrop === "static" && (i.value.classList.add("modal-static"), setTimeout(() => {
        i.value.classList.remove("modal-static");
      }, 300)));
    };
    ue("handleDismiss", d);
    const v = () => h("div", {
      class: [
        "modal",
        {
          fade: e.transition
        },
        n.class
      ],
      ref: i
    }, h("div", {
      class: [
        "modal-dialog",
        {
          "modal-dialog-centered": e.alignment === "center",
          [`modal-fullscreen-${e.fullscreen}-down`]: e.fullscreen && typeof e.fullscreen == "string",
          "modal-fullscreen": e.fullscreen && typeof e.fullscreen == "boolean",
          "modal-dialog-scrollable": e.scrollable,
          [`modal-${e.size}`]: e.size
        }
      ],
      role: "dialog"
    }, h("div", { class: ["modal-content", e.contentClassName], ref: r }, t.default && t.default())));
    return () => [
      h(Qe, {
        css: !1,
        onEnter: (p, b) => s(p, b),
        onAfterEnter: () => l(),
        onLeave: (p, b) => c(p, b),
        onAfterLeave: (p) => u(p)
      }, () => e.unmountOnClose ? o.value && v() : di(v(), [[Ic, o.value]])),
      e.backdrop && h(Wr, {
        class: "modal-backdrop",
        visible: o.value
      })
    ];
  }
}), Gg = S({
  name: "CModalBody",
  setup(e, { slots: t }) {
    return () => h("div", { class: "modal-body" }, t.default && t.default());
  }
}), Kg = S({
  name: "CModalFooter",
  setup(e, { slots: t }) {
    return () => h("div", { class: "modal-footer" }, t.default && t.default());
  }
}), Xg = S({
  name: "CModalHeader",
  props: {
    /**
     * Add a close button component to the header.
     */
    closeButton: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, { slots: t }) {
    const n = ae("handleDismiss");
    return () => h("span", { class: "modal-header" }, [
      t.default && t.default(),
      e.closeButton && h(Xn, { onClick: () => n() }, "")
    ]);
  }
}), Zg = S({
  name: "CModalTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "modal-title" }, t.default && t.default());
  }
}), Qg = S({
  name: "CMultiSelectGroupOption",
  props: {
    id: String,
    multiple: {
      type: Boolean,
      default: !0
    },
    options: {
      type: Array,
      default: () => []
    },
    required: Boolean,
    value: [Number, String, Array]
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = ae("nativeSelectRef"), a = (r) => r.map((o) => o.options ? h("optgroup", { label: o.label }, a(o.options)) : h("option", { disabled: o.disabled, value: o.value })), i = (r) => {
      const o = r.target;
      t("change", Number(o.value));
    };
    return () => h("select", {
      className: "multi-select-new",
      ...e.id && { id: `${e.id}-multi-select` },
      ...e.id && { name: `${e.id}-multi-select` },
      multiple: e.multiple,
      tabIndex: "-1",
      style: { display: "none" },
      required: e.required,
      value: e.value,
      ref: n,
      onChange: i
    }, e.options && a(e.options));
  }
}), Jg = S({
  name: "CVirtualScroller",
  props: {
    /**
     * Amount of visible items
     */
    visibleItems: {
      type: Number,
      default: 10
    }
  },
  setup(e, { slots: t }) {
    const n = O(), a = O(), i = O(1), r = O(0), o = O(0), s = O(0), l = j(() => Math.floor(e.visibleItems / 2)), c = j(() => o.value * r.value + 2 * s.value), u = j(() => Math.min(e.visibleItems, o.value) * r.value + 2 * s.value);
    _e(() => {
      n.value && (s.value = Number.parseFloat(getComputedStyle(n.value).paddingTop), n.value.dispatchEvent(new CustomEvent("scroll")));
    });
    const d = (f) => {
      i.value = r.value && Math.max(Math.ceil(f / r.value), 1);
    };
    return () => {
      const f = t.default ? Array.isArray(t.default()[0].children) ? t.default()[0].children : t.default() : [];
      return o.value = f && f.length > 0 ? f.length : 0, h("div", {
        class: ["virtual-scroller"],
        onScroll: (g) => d(g.target.scrollTop),
        style: {
          height: `${u.value}px`,
          overflowY: "auto"
        },
        ref: n
      }, h("div", {
        class: "virtual-scroller-content",
        style: {
          height: `${c.value}px`
        },
        ref: a
      }, f.map((g, m) => m + 1 > Math.max(i.value - l.value, 0) && m + 1 <= i.value + e.visibleItems + l.value && Vr(g, {
        class: [
          {
            "virtual-scroller-item-preload": m + 1 > i.value + e.visibleItems || m + 1 < i.value
          }
        ],
        style: {
          ...i.value > l.value && {
            transform: `translateY(${(i.value - l.value) * r.value}px)`
          }
        },
        ref: (v) => {
          r.value === 0 && v && v.offsetHeight && (r.value = v.offsetHeight + Number.parseFloat(getComputedStyle(v).marginTop) + Number.parseFloat(getComputedStyle(v).marginBottom));
        }
      }))));
    };
  }
}), em = (e, t) => {
  const n = e.toLowerCase().replace(/\s/g, "-");
  let a = n, i = 1;
  for (; t.some((r) => String(r.value) === a); )
    a = `${n}-${i}`, i++;
  return [
    {
      value: a,
      text: e,
      custom: !0
    }
  ];
}, ys = (e, t) => {
  if (e.length > 0 && t) {
    const n = [];
    for (const a of t) {
      const i = a.options && a.options.filter((r) => r.text && r.text.toLowerCase().includes(e.toLowerCase()));
      (a.text && a.text.toLowerCase().includes(e.toLowerCase()) || i && i.length > 0) && n.push(Object.assign({}, a, i && i.length > 0 && { options: i }));
    }
    return n;
  }
  return t;
}, Cs = (e, t) => {
  const n = [];
  for (const a of e)
    if (Array.isArray(a.options)) {
      const { options: i, ...r } = a;
      t && n.push(r), n.push(...i);
    } else
      n.push(a);
  return n;
}, tm = (e, t) => {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t))
      return n;
    n = n.nextElementSibling;
  }
}, nm = (e, t) => {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t))
      return n;
    n = n.previousElementSibling;
  }
}, xs = (e, t, n) => {
  let a = [...t, ...e];
  n && (a = a.filter((r) => !n.some((o) => o.value === r.value)));
  const i = [];
  for (const r of a)
    i.some((o) => o.value === r.value) || i.push(r);
  return i;
}, am = S({
  name: "CMultiSelectOptions",
  props: {
    loading: Boolean,
    options: {
      type: Array,
      default: () => []
    },
    optionsMaxHeight: {
      type: [Number, String],
      default: "auto"
    },
    optionsStyle: {
      type: String,
      default: "checkbox",
      validator: (e) => ["checkbox", "text"].includes(e)
    },
    scopedSlots: Object,
    searchNoResultsLabel: {
      type: String,
      default: "no items"
    },
    selected: {
      type: Array,
      default: () => []
    },
    virtualScroller: Boolean,
    visibleItems: {
      type: Number,
      default: 10
    }
  },
  emits: ["optionClick"],
  setup(e, { emit: t }) {
    const n = (r, o) => {
      if (r.code === "Space" || r.key === "Enter") {
        r.preventDefault(), a && a(o);
        return;
      }
      if (r.key === "Down" || r.key === "ArrowDown") {
        r.preventDefault();
        const s = r.target, l = tm(s, ".form-multi-select-option");
        l && l.focus();
      }
      if (r.key === "Up" || r.key === "ArrowUp") {
        r.preventDefault();
        const s = r.target, l = nm(s, ".form-multi-select-option");
        l && l.focus();
      }
    }, a = (r) => {
      t("optionClick", r);
    }, i = (r) => r.length > 0 ? r.map((o) => "value" in o ? h("div", {
      class: [
        "form-multi-select-option",
        {
          "form-multi-select-option-with-checkbox": e.optionsStyle === "checkbox",
          "form-multi-selected": e.selected.some((s) => s.value === o.value),
          disabled: o.disabled
        }
      ],
      onClick: () => a(o),
      onKeydown: (s) => n(s, o),
      tabindex: 0
    }, e.scopedSlots && e.scopedSlots.options ? h(e.scopedSlots.options, { option: o }) : o.text) : [
      h("div", { class: "form-multi-select-optgroup-label" }, e.scopedSlots && e.scopedSlots["options-groups"] ? h(e.scopedSlots["options-groups"], { option: o }) : o.label)
    ]) : h("div", { class: "form-multi-select-options-empty" }, e.searchNoResultsLabel);
    return () => [
      e.virtualScroller ? h(Jg, {
        class: "form-multi-select-options",
        visibleItems: e.visibleItems
      }, {
        default: () => i(e.options)
      }) : h("div", {
        class: "form-multi-select-options",
        ...e.optionsMaxHeight !== "auto" && {
          style: { maxHeight: e.optionsMaxHeight, overflow: "scroll" }
        }
      }, i(e.options)),
      e.loading && h(su)
    ];
  }
}), im = S({
  name: "CMultiSelectSelection",
  props: {
    multiple: {
      type: Boolean,
      default: !0
    },
    placeholder: String,
    search: [Boolean, String],
    selected: {
      type: Array,
      default: () => []
    },
    selectionType: {
      type: String,
      default: "tags",
      validator: (e) => ["counter", "tags", "text"].includes(e)
    },
    selectionTypeCounterText: {
      type: String,
      default: "item(s) selected"
    }
  },
  emits: ["remove"],
  setup(e, { emit: t, slots: n }) {
    const a = (i) => {
      t("remove", i);
    };
    return () => h("div", {
      class: "form-multi-select-selection"
    }, [
      e.multiple && e.selectionType === "counter" && !e.search && e.selected.length === 0 && e.placeholder,
      e.multiple && e.selectionType === "counter" && !e.search && e.selected.length > 0 && `${e.selected.length} ${e.selectionTypeCounterText}`,
      e.multiple && e.selectionType === "tags" && e.selected.map((i) => {
        if (e.selectionType === "tags")
          return h("span", { class: "form-multi-select-tag" }, [
            i.text,
            !i.disabled && h("button", {
              class: "form-multi-select-tag-delete close",
              ariaLabel: "Close",
              onClick: () => a(i)
            }, h("span", { ariaHidden: "true" }, "x"))
          ]);
      }),
      e.multiple && e.selectionType === "text" && e.selected.map((i, r) => h("span", `${i.text}${r === e.selected.length - 1 ? "" : ","} `)),
      !e.multiple && !e.search && e.selected.map((i) => i.text)[0],
      n.default && n.default()
    ]);
  }
}), rm = S({
  name: "CMultiSelect",
  props: {
    /**
     * Allow users to create options if they are not in the list of options.
     *
     * @since 4.9.0
     */
    allowCreateOptions: Boolean,
    /**
     * Enables selection cleaner element.
     *
     * @default true
     */
    cleaner: {
      type: Boolean,
      default: !0
    },
    /**
     * Clear current search on selecting an item.
     *
     * @since 4.9.0
     */
    clearSearchOnSelect: Boolean,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.6.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.6.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.6.0
     */
    feedbackValid: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     *
     * @since 4.6.0
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.6.0
     */
    label: String,
    /**
     * When set, the options list will have a loading style: loading spinner and reduced opacity.
     *
     * @since 4.9.0
     */
    loading: Boolean,
    /**
     * It specifies that multiple options can be selected at once.
     *
     * @default true
     */
    multiple: {
      type: Boolean,
      default: !0
    },
    /**
     * List of option elements.
     */
    options: {
      type: Array,
      default: () => []
    },
    /**
     * Sets maxHeight of options list.
     *
     * @default 'auto'
     */
    optionsMaxHeight: {
      type: [Number, String],
      default: "auto"
    },
    /**
     * Sets option style.
     *
     * @values 'checkbox', 'text'
     * @default 'checkbox'
     */
    optionsStyle: {
      type: String,
      default: "checkbox",
      validator: (e) => ["checkbox", "text"].includes(e)
    },
    /**
     * Specifies a short hint that is visible in the search input.
     *
     * @default 'Select...''
     */
    placeholder: {
      type: String,
      default: "Select..."
    },
    /**
     * When it is present, it indicates that the user must choose a value before submitting the form.
     */
    required: Boolean,
    /**
     * Enables search input element.
     */
    search: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "string" ? ["external"].includes(e) : typeof e == "boolean"
    },
    /**
     * Sets the label for no results when filtering.
     */
    searchNoResultsLabel: {
      type: String,
      default: "no items"
    },
    /**
     * Enables select all button.
     *
     * @default true
     */
    selectAll: {
      type: Boolean,
      default: !0
    },
    /**
     * Sets the select all button label.
     *
     * @default 'Select all options'
     */
    selectAllLabel: {
      type: String,
      default: "Select all options"
    },
    /**
     * Sets the selection style.
     *
     * @values 'counter', 'tags', 'text'
     * @default 'tags'
     */
    selectionType: {
      type: String,
      default: "tags",
      validator: (e) => ["counter", "tags", "text"].includes(e)
    },
    /**
     * Sets the counter selection label.
     *
     * @default 'item(s) selected'
     */
    selectionTypeCounterText: {
      type: String,
      default: "item(s) selected"
    },
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.6.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.6.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     *
     * @since 4.6.0
     */
    valid: Boolean,
    /**
     * Enable virtual scroller for the options list.
     *
     * @since 4.8.0
     */
    virtualScroller: Boolean,
    /**
     * Toggle the visibility of multi select dropdown.
     *
     * @default false
     */
    visible: Boolean,
    /**
     *
     * Amount of visible items when virtualScroller is set to `true`.
     *
     * @since 4.8.0
     */
    visibleItems: {
      type: Number,
      default: 10
    }
  },
  emits: [
    /**
     * Execute a function when a user changes the selected option. [docs]
     */
    "change",
    /**
     * Execute a function when the filter value changed.
     *
     * @since 4.7.0
     */
    "filterChange",
    /**
     * The callback is fired when the Multi Select component requests to be hidden.
     */
    "hide",
    /**
     * The callback is fired when the Multi Select component requests to be shown.
     */
    "show"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = O(), r = O(), o = O(), s = O(), l = O(), c = O(e.options), u = O(), d = O(""), f = O([]), g = O([]), m = O(e.visible);
    ue("nativeSelectRef", o);
    const v = j(() => Cs(e.search === "external" ? [...c.value, ...ys(d.value, g.value)] : ys(d.value, [...c.value, ...g.value]), !0)), p = j(() => Cs(e.options)), b = j(() => e.allowCreateOptions && v.value.some((D) => D.text && D.text.toLowerCase() === d.value.toLowerCase()) ? !1 : l.value && em(String(d.value), p.value));
    E(() => e.options, (D, _) => {
      if (JSON.stringify(D) !== JSON.stringify(_)) {
        c.value = D;
        const T = p.value.filter((B) => B.selected === !0), P = p.value.filter((B) => B.selected === !1);
        T && (f.value = xs(T, f.value, P));
      }
    }, { immediate: !0 }), E(f, () => {
      o.value && o.value.dispatchEvent(new Event("change", { bubbles: !0 })), u.value && u.value.update();
    }), E(m, () => {
      if (m.value) {
        n("show"), window.addEventListener("mouseup", C), window.addEventListener("keyup", x), y(), setTimeout(() => {
          l.value && l.value.focus();
        }, 100);
        return;
      }
      n("hide"), window.removeEventListener("mouseup", C), window.removeEventListener("keyup", x), w();
    }), Fc(() => {
      window.removeEventListener("mouseup", C), window.removeEventListener("keyup", x);
    });
    const y = () => {
      s.value && r.value && (u.value = eo(s.value, r.value, {
        placement: Zn() ? "bottom-end" : "bottom-start",
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: "clippingParents"
            }
          },
          {
            name: "offset",
            options: {
              offset: [0, 2]
            }
          }
        ]
      }));
    }, w = () => {
      u.value && u.value.destroy(), u.value = void 0;
    }, x = (D) => {
      D.key === "Escape" && (m.value = !1);
    }, C = (D) => {
      i.value && i.value.contains(D.target) || (m.value = !1);
    }, k = (D) => {
      const _ = D.target;
      d.value = _.value.toLowerCase(), n("filterChange", _.value);
    }, M = (D) => {
      if (D.key === "Enter" && d.value && e.allowCreateOptions) {
        D.preventDefault(), b.value || (f.value = [
          ...f.value,
          v.value.find((_) => String(_.text).toLowerCase() === d.value.toLowerCase())
        ]), b.value && (f.value = [...f.value, ...b.value], g.value = [...g.value, ...b.value]), d.value = "", l.value && (l.value.value = "");
        return;
      }
      if (!(d.value.length > 0) && (D.key === "Backspace" || D.key === "Delete")) {
        const _ = f.value.filter((T) => !T.disabled).pop();
        _ && (f.value = f.value.filter((T) => T.value !== _.value));
      }
    }, L = (D) => {
      if (!e.multiple) {
        f.value = [{ value: D.value, text: D.text }], m.value = !1, l.value && (l.value.value = "");
        return;
      }
      D.custom && !g.value.some((_) => _.value === D.value) && (g.value = [...g.value, D]), (e.clearSearchOnSelect || D.custom) && (d.value = "", l.value && (l.value.value = "", l.value.focus())), f.value.some((_) => _.value === D.value) ? f.value = f.value.filter((_) => _.value !== D.value) : f.value = [
        ...f.value,
        { value: D.value, text: D.text }
      ];
    }, A = () => {
      f.value = xs([
        ...p.value.filter((D) => !D.disabled),
        ...g.value
      ], f.value);
    }, $ = () => {
      f.value = f.value.filter((D) => D.disabled);
    };
    return () => [
      h(Qg, {
        id: e.id,
        multiple: e.multiple,
        options: f.value,
        required: e.required,
        value: e.multiple ? f.value.map((D) => D.value.toString()) : f.value.map((D) => D.value)[0],
        onChange: () => n("change", f.value)
      }),
      h(hn, {
        describedby: t["aria-describedby"],
        feedback: e.feedback,
        feedbackInvalid: e.feedbackInvalid,
        feedbackValid: e.feedbackValid,
        id: e.id,
        invalid: e.invalid,
        label: e.label,
        text: e.text,
        tooltipFeedback: e.tooltipFeedback,
        valid: e.valid
      }, {
        default: () => h("div", {
          class: [
            "dropdown",
            "picker",
            "form-multi-select",
            {
              "form-multi-select-with-cleaner": e.cleaner,
              disabled: e.disabled,
              [`form-multi-select-${e.size}`]: e.size,
              "form-multi-select-selection-tags": e.multiple && e.selectionType === "tags",
              show: m.value,
              "is-invalid": e.invalid,
              "is-valid": e.valid
            }
          ],
          "aria-expanded": m.value,
          id: e.id,
          ref: i
        }, {
          default: () => [
            h("div", {
              class: "form-multi-select-input-group",
              onClick: () => {
                m.value = !0;
              },
              ref: s
            }, {
              default: () => [
                h(im, {
                  multiple: e.multiple,
                  placeholder: e.placeholder,
                  onRemove: (D) => !e.disabled && L(D),
                  search: e.search,
                  selected: f.value,
                  selectionType: e.selectionType,
                  selectionTypeCounterText: e.selectionTypeCounterText
                }),
                e.multiple && e.cleaner && f.value.length > 0 && !e.disabled && h("button", {
                  type: "button",
                  class: "form-multi-select-selection-cleaner",
                  onClick: () => $()
                }),
                e.search && h("input", {
                  type: "text",
                  class: "form-multi-select-search",
                  disabled: e.disabled,
                  autocomplete: "off",
                  onInput: (D) => k(D),
                  onKeydown: (D) => M(D),
                  ...f.value.length === 0 && {
                    placeholder: e.placeholder
                  },
                  ...f.value.length > 0 && e.selectionType === "counter" && {
                    placeholder: `${f.value.length} ${e.selectionTypeCounterText}`
                  },
                  ...f.value.length > 0 && !e.multiple && {
                    placeholder: f.value.map((D) => D.text)[0]
                  },
                  ...e.multiple && f.value.length > 0 && e.selectionType !== "counter" && {
                    size: d.value.length + 2
                  },
                  ref: l
                })
              ]
            }),
            h("div", {
              class: [
                "dropdown-menu",
                {
                  show: m.value
                }
              ],
              role: "menu",
              ref: r
            }, {
              default: () => [
                e.multiple && e.selectAll && h("button", {
                  class: "form-multi-select-all",
                  onClick: () => A(),
                  type: "button"
                }, e.selectAllLabel),
                h(am, {
                  loading: e.loading,
                  onOptionClick: (D) => L(D),
                  options: v.value.length === 0 && e.allowCreateOptions ? b.value || [] : v.value,
                  optionsMaxHeight: e.optionsMaxHeight,
                  optionsStyle: e.optionsStyle,
                  scopedSlots: a,
                  searchNoResultsLabel: e.searchNoResultsLabel,
                  selected: f.value,
                  virtualScroller: e.virtualScroller,
                  visibleItems: e.visibleItems
                })
              ]
            })
          ]
        })
      })
    ];
  }
}), du = S({
  name: "CNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    },
    /**
     * Specify a layout type for component.
     *
     * @values 'fill', 'justified'
     */
    layout: {
      type: String,
      validator: (e) => ["fill", "justified"].includes(e)
    },
    /**
     * Set the nav variant to tabs or pills.
     *
     * @values 'tabs', 'pills', 'underline'
     */
    variant: {
      type: String,
      validator: (e) => ["tabs", "pills", "underline"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: [
        "nav",
        {
          [`nav-${e.layout}`]: e.layout,
          [`nav-${e.variant}`]: e.variant
        }
      ],
      role: "navigation"
    }, t.default && t.default());
  }
}), Cr = S({
  name: "CNavGroup",
  props: {
    /**
     * Make nav group more compact by cutting all `padding` in half.
     */
    compact: Boolean,
    /**
     * Show nav group items.
     */
    visible: Boolean
  },
  emits: ["visible-change"],
  setup(e, { slots: t, emit: n }) {
    const a = O(), i = O(), r = O(), o = (v, p) => {
      v ? r.value = p : r.value === p && (r.value = 0);
    }, s = (v) => r.value === v;
    _e(() => {
      a.value = e.visible, e.visible && i.value.classList.add("show"), n("visible-change", a.value);
    }), E(() => e.visible, () => {
      a.value = e.visible, a.value === !1 && (r.value = void 0);
    }), E(a, () => {
      n("visible-change", a.value);
    });
    const l = () => {
      a.value = !a.value, n("visible-change", a.value);
    }, c = (v) => {
      v.style.height = "0px", i.value.classList.add("show");
    }, u = (v, p) => {
      be(() => p(), v), v.style.height = `${v.scrollHeight}px`;
    }, d = (v) => {
      v.style.height = "auto";
    }, f = (v) => {
      v.style.height = `${v.scrollHeight}px`;
    }, g = (v, p) => {
      be(() => p(), v), setTimeout(() => {
        v.style.height = "0px";
      }, 1);
    }, m = () => {
      i.value.classList.remove("show");
    };
    return () => h("li", {
      class: "nav-group",
      ref: i
    }, [
      t.togglerContent && h("a", {
        class: ["nav-link", "nav-group-toggle"],
        onClick: l
      }, t.togglerContent && t.togglerContent()),
      h(Qe, {
        css: !1,
        onBeforeEnter: (v) => c(v),
        onEnter: (v, p) => u(v, p),
        onAfterEnter: (v) => d(v),
        onBeforeLeave: (v) => f(v),
        onLeave: (v, p) => g(v, p),
        onAfterLeave: () => m()
      }, {
        default: () => a.value && h("ul", {
          class: [
            "nav-group-items",
            {
              compact: e.compact
            }
          ]
        }, t.default && t.default().map((v, p) => v.type.name === "CNavGroup" ? h(v, {
          onVisibleChange: (b) => o(b, p + 1),
          ...r.value && { visible: s(p + 1) }
        }) : v))
      })
    ]);
  }
});
S({
  name: "CNavGroupItems",
  setup(e, { slots: t }) {
    return () => h("ul", { class: "nav-group-items" }, t.default && t.default());
  }
});
const qa = S({
  name: "CNavLink",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * @ignore
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => h(la, {
      class: "nav-link",
      active: e.active,
      component: e.component,
      disabled: e.disabled,
      href: e.href
    }, {
      default: () => t.default && t.default()
    });
  }
}), ao = S({
  name: "CNavItem",
  props: {
    ...qa.props
  },
  setup(e, { slots: t }) {
    return () => h("li", {
      class: "nav-item"
    }, e.href ? h(qa, {
      active: e.active,
      component: e.component,
      disabled: e.disabled,
      href: e.href
    }, {
      default: () => t.default && t.default()
    }) : t.default && t.default());
  }
}), fu = S({
  name: "CNavTitle",
  setup(e, { slots: t }) {
    return () => h("li", { class: "nav-title" }, t.default && t.default());
  }
}), om = S({
  name: "CNavbar",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q,
    /**
     * Sets if the color of text should be colored for a light or dark dark background.
     *
     * @values 'dark', 'light'
     */
    colorScheme: {
      type: String,
      validator: (e) => ["dark", "light"].includes(e)
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "nav"
    },
    /**
     * Defines optional container wrapping children elements.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'
     */
    container: {
      type: [Boolean, String],
      validator: (e) => typeof e == "boolean" || ["sm", "md", "lg", "xl", "xxl", "fluid"].includes(e)
    },
    /**
     * Defines the responsive breakpoint to determine when content collapses.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl'
     */
    expand: {
      type: [Boolean, String],
      validator: (e) => typeof e == "boolean" || ["sm", "md", "lg", "xl", "xxl"].includes(e)
    },
    /**
     * Place component in non-static positions.
     *
     * @values 'fixed-top', 'fixed-bottom', 'sticky-top'
     */
    placement: {
      type: String,
      validator: (e) => ["fixed-top", "fixed-bottom", "sticky-top"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: [
        "navbar",
        {
          [`bg-${e.color}`]: e.color,
          [`navbar-${e.colorScheme}`]: e.colorScheme,
          [typeof e.expand == "boolean" ? "navbar-expand" : `navbar-expand-${e.expand}`]: e.expand
        },
        e.placement
      ]
    }, e.container ? h("div", { class: [`container${e.container === !0 ? "" : "-" + e.container}`] }, t.default && t.default()) : t.default && t.default());
  }
}), sm = S({
  name: "CNavbarBrand",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     *
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => h(e.component ?? (e.href ? "a" : "span"), {
      class: "navbar-brand",
      href: e.href
    }, t.default && t.default());
  }
}), lm = S({
  name: "CNavbarNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, {
      class: "navbar-nav",
      role: "navigation"
    }, t.default && t.default());
  }
}), cm = S({
  name: "CNavbarText",
  setup(e, { slots: t }) {
    return () => h("span", { class: "navbar-text" }, t.default && t.default());
  }
}), um = S({
  name: "CNavbarToggler",
  setup(e, { slots: t }) {
    return () => h("button", {
      class: "navbar-toggler"
    }, t.default ? t.default() : h("span", { class: ["navbar-toggler-icon"] }));
  }
}), dm = S({
  name: "COffcanvas",
  inheritAttrs: !1,
  props: {
    /**
     * Apply a backdrop on body while offcanvas is open.
     *
     * @values boolean | 'static'
     */
    backdrop: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "string" ? ["static"].includes(e) : typeof e == "boolean"
    },
    /**
     * Closes the offcanvas when escape key is pressed.
     */
    keyboard: {
      type: Boolean,
      default: !0
    },
    /**
     * Components placement, there’s no default placement.
     *
     * @values 'start', 'end', 'top', 'bottom'
     */
    placement: {
      type: String,
      require: !0,
      validator: (e) => ["start", "end", "top", "bottom"].includes(e)
    },
    /**
     * Responsive offcanvas property hide content outside the viewport from a specified breakpoint and down.
     *
     * @values boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
     * @since 4.7.0
     */
    responsive: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "string" ? ["sm", "md", "lg", "xl", "xxl"].includes(e) : typeof e == "boolean"
    },
    /**
     * Allow body scrolling while offcanvas is open
     */
    scroll: {
      type: Boolean,
      default: !1
    },
    /**
     * Toggle the visibility of offcanvas component.
     */
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { attrs: t, emit: n, slots: a }) {
    const i = O(), r = O(e.visible);
    E(() => e.visible, () => {
      r.value = e.visible;
    }), E(r, () => {
      if (r.value && !e.scroll) {
        document.body.style.overflow = "hidden", document.body.style.paddingRight = "0px";
        return;
      }
      e.scroll || (document.body.style.removeProperty("overflow"), document.body.style.removeProperty("padding-right"));
    });
    const o = (g, m) => {
      n("show"), be(() => m(), g), setTimeout(() => {
        g.classList.add("show");
      }, 1);
    }, s = () => {
      i.value.focus();
    }, l = (g, m) => {
      be(() => m(), g), g.classList.add("hiding");
    }, c = (g) => {
      g.classList.remove("show", "hiding");
    }, u = () => {
      r.value = !1, n("hide");
    }, d = () => {
      e.backdrop !== "static" && u();
    }, f = (g) => {
      g.key === "Escape" && e.keyboard && u();
    };
    return () => [
      h(Qe, {
        css: !1,
        onEnter: (g, m) => o(g, m),
        onAfterEnter: () => s(),
        onLeave: (g, m) => l(g, m),
        onAfterLeave: (g) => c(g)
      }, () => di(h("div", {
        ...t,
        class: [
          {
            [`offcanvas${typeof e.responsive == "boolean" ? "" : "-" + e.responsive}`]: e.responsive,
            [`offcanvas-${e.placement}`]: e.placement
          },
          t.class
        ],
        onKeydown: (g) => f(g),
        ref: i,
        role: "dialog",
        tabindex: -1
      }, a.default && a.default()), [[jc, e.visible]])),
      e.backdrop && h(Wr, {
        class: "offcanvas-backdrop",
        onClick: d,
        visible: r.value
      })
    ];
  }
}), fm = S({
  name: "COffcanvasBody",
  setup(e, { slots: t }) {
    return () => h("div", { class: "offcanvas-body" }, t.default && t.default());
  }
}), hm = S({
  name: "COffcanvasHeader",
  setup(e, { slots: t }) {
    return () => h("div", { class: "offcanvas-header" }, t.default && t.default());
  }
}), gm = S({
  name: "COffcanvasTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(e, { slots: t }) {
    return () => h(e.component, { class: "offcanvas-title" }, t.default && t.default());
  }
}), hu = S({
  name: "CPagination",
  props: {
    /**
     * Set the alignment of pagination components.
     *
     * @values 'start', 'center', 'end'
     */
    align: {
      type: String,
      validator: (e) => ["start", "center", "end"].includes(e)
    },
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h("nav", {}, h("ul", {
      class: [
        "pagination",
        {
          [`justify-content-${e.align}`]: e.align,
          [`pagination-${e.size}`]: e.size
        }
      ]
    }, t.default && t.default()));
  }
}), mt = S({
  name: "CPaginationItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: String,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => {
      const n = e.component ?? (e.active ? "span" : "a");
      return h("li", {
        class: [
          "page-item",
          {
            active: e.active,
            disabled: e.disabled
          }
        ],
        ...e.active && { active: e.active, "aria-current": "page" }
      }, n === "a" ? h(la, {
        class: ["page-link"],
        component: n,
        href: e.href
      }, {
        default: () => t.default && t.default()
      }) : h(n, { class: ["page-link"] }, t.default && t.default()));
    };
  }
}), mm = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
], vm = S({
  name: "CPlaceholder",
  props: {
    /**
     * Set animation type to better convey the perception of something being actively loaded.
     *
     * @values 'glow', 'wave'
     */
    animation: {
      type: String,
      validator: (e) => ["glow", "wave"].includes(e)
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    },
    /**
     * Size the component extra small, small, or large.
     *
     * @values 'xs', 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["xs", "sm", "lg"].includes(e)
    },
    /**
     * The number of columns on extra small devices (<576px).
     */
    xs: Number,
    /**
     * The number of columns on small devices (<768px).
     */
    sm: Number,
    /**
     * The number of columns on medium devices (<992px).
     */
    md: Number,
    /**
     * The number of columns on large devices (<1200px).
     */
    lg: Number,
    /**
     * The number of columns on X-Large devices (<1400px).
     */
    xl: Number,
    /**
     * The number of columns on XX-Large devices (≥1400px).
     */
    xxl: Number
  },
  setup(e, { slots: t }) {
    const n = [];
    return mm.forEach((a) => {
      const i = e[a], r = a === "xs" ? "" : `-${a}`;
      typeof i == "number" && n.push(`col${r}-${i}`), typeof i == "boolean" && n.push(`col${r}`);
    }), () => h(e.component, {
      class: [
        e.animation ? `placeholder-${e.animation}` : "placeholder",
        {
          [`bg-${e.color}`]: e.color,
          [`placeholder-${e.size}`]: e.size
        },
        n
      ]
    }, t.default && t.default());
  }
}), xr = S({
  name: "CProgressBar",
  props: {
    /**
     * Use to animate the stripes right to left via CSS3 animations.
     */
    animated: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * The percent to progress the ProgressBar.
     */
    value: {
      type: Number,
      default: 0
    },
    /**
     * Set the progress bar variant to optional striped.
     *
     * @values 'striped'
     */
    variant: {
      type: String,
      validator: (e) => e === "striped"
    }
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        "progress-bar",
        `bg-${e.color}`,
        {
          [`progress-bar-${e.variant}`]: e.variant,
          "progress-bar-animated": e.animated
        }
      ],
      role: "progressbar",
      style: `width: ${e.value}%`,
      "aria-valuenow": e.value,
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }, t.default && t.default());
  }
}), io = S({
  name: "CProgress",
  props: {
    /**
     * Sets the height of the component. If you set that value the inner `<CProgressBar>` will automatically resize accordingly.
     */
    height: Number,
    /**
     * Makes progress bar thinner.
     */
    thin: Boolean,
    /**
     * Change the default color to white.
     */
    white: Boolean,
    ...xr.props
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        "progress",
        {
          "progress-thin": e.thin,
          "progress-white": e.white
        }
      ],
      ...(e.height, { style: `height: ${e.height}px` })
    }, e.value ? h(xr, {
      value: e.value,
      animated: e.animated,
      color: e.color,
      variant: e.variant
    }, t.default && t.default()) : t.default && t.default());
  }
}), pm = S({
  name: "CPopover",
  props: {
    /**
     * Apply a CSS fade transition to the popover.
     *
     * @since 4.9.0
     */
    animation: {
      type: Boolean,
      default: !0
    },
    /**
     * Content for your component. If you want to pass non-string value please use dedicated slot `<template #content>...</template>`
     */
    content: String,
    /**
     * The delay for displaying and hiding the popover (in milliseconds). When a numerical value is provided, the delay applies to both the hide and show actions. The object structure for specifying the delay is as follows: delay: `{ 'show': 500, 'hide': 100 }`.
     *
     * @since 4.9.0
     */
    delay: {
      type: [Number, Object],
      default: 0
    },
    /**
     * Specify the desired order of fallback placements by providing a list of placements as an array. The placements should be prioritized based on preference.
     *
     * @since 4.9.0
     */
    fallbackPlacements: {
      type: [String, Array],
      default: () => ["top", "right", "bottom", "left"],
      validator: (e) => typeof e == "string" ? ["top", "right", "bottom", "left"].includes(e) : Array.isArray(e) ? e.every((t) => ["top", "right", "bottom", "left"].includes(t)) : !1
    },
    /**
     * Offset of the popover relative to its target.
     */
    offset: {
      type: Array,
      default: () => [0, 8]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     */
    placement: {
      type: String,
      default: "top",
      validator: (e) => ["top", "right", "bottom", "left"].includes(e)
    },
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @values 'click', 'focus', 'hover'
     */
    trigger: {
      type: [String, Array],
      default: "click",
      validator: (e) => typeof e == "string" ? ["click", "focus", "hover"].includes(e) : Array.isArray(e) ? e.every((t) => ["click", "focus", "hover"].includes(t)) : !1
    },
    /**
     * Toggle the visibility of popover component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { attrs: t, slots: n, emit: a }) {
    const i = O(), r = O(), o = O(e.visible), { initPopper: s, destroyPopper: l } = to(), c = typeof e.delay == "number" ? { show: e.delay, hide: e.delay } : e.delay, u = {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: ".popover-arrow"
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: e.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: e.offset
          }
        }
      ],
      placement: qc(e.placement, i.value)
    }, d = (m, v) => {
      a("show"), s(i.value, r.value, u), m.classList.add("show"), be(() => v(), m);
    }, f = (m, v) => {
      a("hide"), m.classList.remove("show"), be(() => {
        v(), l();
      }, m);
    }, g = (m, v) => {
      if (i.value = m.target, v) {
        setTimeout(() => {
          o.value = !0;
        }, c.show);
        return;
      }
      setTimeout(() => {
        o.value = !1;
      }, c.hide);
    };
    return () => [
      h(Rc, {
        to: "body"
      }, h(Qe, {
        onEnter: (m, v) => d(m, v),
        onLeave: (m, v) => f(m, v)
      }, () => o.value && h("div", {
        class: [
          "popover",
          "bs-popover-auto",
          {
            fade: e.animation
          }
        ],
        ref: r,
        role: "tooltip",
        ...t
      }, [
        h("div", { class: "popover-arrow" }),
        (e.title || n.title) && h("div", { class: "popover-header" }, {
          default: () => n.title && n.title() || e.title
        }),
        (e.content || n.content) && h("div", { class: "popover-body" }, {
          default: () => n.content && n.content() || e.content
        })
      ]))),
      n.toggler && n.toggler({
        on: {
          click: (m) => e.trigger.includes("click") && g(m, !o.value),
          blur: (m) => e.trigger.includes("focus") && g(m, !1),
          focus: (m) => e.trigger.includes("focus") && g(m, !0),
          mouseenter: (m) => e.trigger.includes("hover") && g(m, !0),
          mouseleave: (m) => e.trigger.includes("hover") && g(m, !1)
        }
      })
    ];
  }
}), _s = (e) => {
  if (e)
    return !!getComputedStyle(e).getPropertyValue("--cui-is-mobile");
}, gu = S({
  name: "CSidebar",
  props: {
    /**
     * Sets if the color of text should be colored for a light or dark dark background.
     *
     * @values 'dark', light'
     */
    colorScheme: {
      type: String,
      default: void 0,
      validator: (e) => ["dark", "light"].includes(e)
    },
    /**
     * Make sidebar narrow.
     */
    narrow: Boolean,
    /**
     * Set sidebar to overlaid variant.
     */
    overlaid: Boolean,
    /**
     * Components placement, there’s no default placement.
     * @values 'start', 'end'
     */
    placement: {
      type: String,
      default: void 0,
      validator: (e) => ["start", "end"].includes(e)
    },
    /**
     * Place sidebar in non-static positions.
     */
    position: {
      type: String,
      validator: (e) => ["fixed"].includes(e)
    },
    /**
     * Size the component small, large, or extra large.
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg", "xl"].includes(e)
    },
    /**
     * Expand narrowed sidebar on hover.
     */
    unfoldable: Boolean,
    /**
     * Toggle the visibility of sidebar component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show",
    /**
     * Event emitted after visibility of component changed.
     */
    "visible-change"
  ],
  setup(e, { attrs: t, slots: n, emit: a }) {
    const i = O(), r = O(), o = O(), s = O(e.visible);
    E(r, () => {
      a("visible-change", r.value), r.value ? a("show") : a("hide");
    }), E(() => e.visible, () => s.value = e.visible), E(i, () => {
      i.value && s.value && (s.value = !1);
    }), _e(() => {
      i.value = _s(o.value), r.value = Jt(o.value), window.addEventListener("resize", c), window.addEventListener("mouseup", d), window.addEventListener("keyup", u), o.value.addEventListener("mouseup", f), o.value.addEventListener("transitionend", () => {
        r.value = Jt(o.value);
      });
    }), Fc(() => {
      window.removeEventListener("resize", c), window.removeEventListener("mouseup", d), window.removeEventListener("keyup", u), o.value.removeEventListener("mouseup", f), o.value.removeEventListener("transitionend", () => {
        r.value = Jt(o.value);
      });
    });
    const l = () => {
      s.value = !1, a("visible-change", !1);
    }, c = () => {
      i.value = _s(o.value), r.value = Jt(o.value);
    }, u = (g) => {
      i.value && !o.value.contains(g.target) && l();
    }, d = (g) => {
      i.value && !o.value.contains(g.target) && l();
    }, f = (g) => {
      const m = g.target;
      m && m.classList.contains("nav-link") && !m.classList.contains("nav-group-toggle") && i.value && l();
    };
    return () => [
      h("div", {
        class: [
          "sidebar",
          {
            [`sidebar-${e.colorScheme}`]: e.colorScheme,
            "sidebar-narrow": e.narrow,
            "sidebar-overlaid": e.overlaid,
            [`sidebar-${e.placement}`]: e.placement,
            [`sidebar-${e.position}`]: e.position,
            [`sidebar-${e.size}`]: e.size,
            "sidebar-narrow-unfoldable": e.unfoldable,
            show: s.value === !0 && i.value,
            hide: s.value === !1 && !i.value
          },
          t.class
        ],
        ref: o
      }, n.default && n.default()),
      i.value && h(Wr, {
        class: "sidebar-backdrop d-none",
        visible: e.visible,
        onClick: () => l()
      })
    ];
  }
}), bm = S({
  name: "CSidebarBrand",
  setup(e, { slots: t }) {
    return () => h("div", { class: "sidebar-brand" }, t.default && t.default());
  }
}), ym = S({
  name: "CSidebarFooter",
  setup(e, { slots: t }) {
    return () => h("div", { class: "sidebar-footer" }, t.default && t.default());
  }
}), Cm = S({
  name: "CSidebarHeader",
  setup(e, { slots: t }) {
    return () => h("div", { class: "sidebar-header" }, t.default && t.default());
  }
}), mu = S({
  name: "CSidebarNav",
  setup(e, { slots: t }) {
    const n = O(), a = (r, o) => {
      r ? n.value = o : n.value === o && (n.value = 0);
    }, i = (r) => n.value === r;
    return () => h("ul", {
      class: "sidebar-nav"
    }, t.default && t.default().map((r, o) => r.type.name === "CNavGroup" ? h(r, {
      onVisibleChange: (s) => a(s, o + 1),
      ...n.value && { visible: i(o + 1) }
    }) : r));
  }
}), xm = S({
  name: "CSidebarToggler",
  setup(e, { slots: t }) {
    return () => h("button", { class: "sidebar-toggler" }, t.default && t.default());
  }
}), vu = S({
  name: "CSmartPagination",
  props: {
    /**
     * Horizontall align
     *
     * @default 'start'
     */
    align: {
      type: String,
      default: "start",
      require: !1,
      validator: (e) => ["start", "center", "end"].includes(e)
    },
    /**
     * Current page number
     *
     * @default 1
     */
    activePage: {
      type: Number,
      default: 1,
      require: !1
    },
    /**
     * Show/hide arrows
     *
     * @default true
     */
    arrows: {
      type: Boolean,
      default: !0,
      require: !1
    },
    /**
     * Show/hide dots
     *
     * @default true
     */
    dots: {
      type: Boolean,
      default: !0,
      require: !1
    },
    /**
     * Show double arrows buttons
     *
     * @default true
     */
    doubleArrows: {
      type: Boolean,
      default: !0,
      require: !1
    },
    /**
     * The content of 'firstButton' button
     *
     * @default '&laquo;'
     */
    firstButton: {
      type: String,
      default: "&laquo;",
      require: !1
    },
    /**
     * The content of 'lastButton' button
     *
     * @default '&raquo;'
     */
    lastButton: {
      type: String,
      default: "&raquo;",
      require: !1
    },
    /**
     * Maximum items number
     *
     * @default 5
     */
    limit: {
      type: Number,
      default: 5,
      require: !1
    },
    /**
     * The content of 'nextButton' button
     *
     * @default '&rsaquo;'
     */
    nextButton: {
      type: String,
      default: "&rsaquo;",
      require: !1
    },
    /**
     * Number of pages
     */
    pages: {
      type: Number,
      default: 1e3,
      require: !0
    },
    /**
     * The content of 'previousButton' button
     *
     * @default '&lsaquo;'
     */
    previousButton: {
      type: String,
      default: "&lsaquo;",
      require: !1
    },
    /**
     * Size of pagination, valid values: 'sm', 'lg'
     */
    size: {
      type: String,
      default: void 0,
      required: !1,
      validator: (e) => ["sm", "lg"].includes(e)
    }
  },
  emits: [
    /**
     * On active page change callback.
     */
    "activePageChange"
  ],
  setup(e, { emit: t }) {
    const n = O(e.activePage), a = O(e.limit), i = O(e.pages);
    E(() => e.activePage, () => {
      n.value = e.activePage;
    }), E(() => e.limit, () => {
      a.value = e.limit;
    }), E(() => e.pages, () => {
      i.value = e.pages;
    });
    const r = j(() => e.dots && a.value > 4 && a.value < i.value), o = j(() => Math.floor((a.value - 1) / 2)), s = j(() => Math.ceil((a.value - 1) / 2)), l = j(() => r.value && n.value > o.value + 1), c = j(() => r.value && n.value < i.value - s.value), u = j(() => a.value - (c.value ? 1 : 0) - (l.value ? 1 : 0)), d = j(() => n.value + s.value), f = j(() => d.value >= i.value ? i.value : d.value - (c.value ? 1 : 0)), g = j(() => i.value < u.value ? i.value : u.value), m = j(() => n.value - o.value <= 1 ? Array.from({
      length: g.value
    }, (p, b) => b + 1) : Array.from({
      length: g.value
    }, (p, b) => f.value - b).reverse()), v = (p) => {
      p !== n.value && (n.value = p, t("activePageChange", p));
    };
    return () => h(hu, {
      align: e.align,
      "aria-label": "pagination",
      size: e.size
    }, {
      default: () => [
        e.doubleArrows && h(mt, {
          onClick: () => {
            n.value !== 1 && v(1);
          },
          "aria-label": "Go to first page",
          ...n.value === 1 && {
            "aria-disabled": !0,
            disabled: !0
          }
        }, {
          default: () => typeof e.firstButton == "string" ? h("span", {
            innerHTML: e.firstButton
          }) : e.firstButton
        }),
        e.arrows && h(mt, {
          onClick: () => {
            n.value !== 1 && v(n.value - 1);
          },
          "aria-label": "Go to previous page",
          ...n.value === 1 && {
            "aria-disabled": !0,
            disabled: !0
          }
        }, {
          default: () => typeof e.previousButton == "string" ? h("span", {
            innerHTML: e.previousButton
          }) : e.previousButton
        }),
        l.value && h(mt, {
          role: "separator",
          disabled: !0
        }, {
          default: () => "..."
        }),
        m.value.map((p) => h(mt, {
          onClick: () => v(p),
          "aria-label": n.value === p ? `Current page ${p}` : `Go to page ${p}`,
          active: n.value === p
        }, {
          default: () => p
        })),
        c.value && h(mt, {
          role: "separator",
          disabled: !0
        }, {
          default: () => "..."
        }),
        e.arrows && h(mt, {
          onClick: () => {
            n.value !== i.value && v(n.value + 1);
          },
          "aria-label": "Go to next page",
          ...n.value === i.value && {
            "aria-disabled": !0,
            disabled: !0
          }
        }, {
          default: () => typeof e.nextButton == "string" ? h("span", {
            innerHTML: e.nextButton
          }) : e.nextButton
        }),
        e.doubleArrows && h(mt, {
          onClick: () => {
            n.value !== i.value && v(i.value);
          },
          "aria-label": "Go to last page",
          ...n.value === i.value && {
            "aria-disabled": !0,
            disabled: !0
          }
        }, {
          default: () => typeof e.lastButton == "string" ? h("span", {
            innerHTML: e.lastButton
          }) : e.lastButton
        })
      ]
    });
  }
});
var _m = ["512 512", "<polygon fill='var(--ci-primary-color, currentColor)' points='367.997 338.75 271.999 434.747 271.999 17.503 239.999 17.503 239.999 434.745 144.003 338.75 121.376 361.377 256 496 390.624 361.377 367.997 338.75' class='ci-primary'/>"], wm = ["512 512", "<polygon fill='var(--ci-primary-color, currentColor)' points='390.624 150.625 256 16 121.376 150.625 144.004 173.252 240.001 77.254 240.001 495.236 272.001 495.236 272.001 77.257 367.996 173.252 390.624 150.625' class='ci-primary'/>"], Sm = ["512 512", "<polygon fill='var(--ci-primary-color, currentColor)' points='40 16 40 53.828 109.024 136 150.815 136 76.896 48 459.51 48 304 242.388 304 401.373 241.373 464 240 464 240 368 208 368 208 496 254.627 496 336 414.627 336 253.612 496 53.612 496 16 40 16' class='ci-primary'/><polygon fill='var(--ci-primary-color, currentColor)' points='166.403 248.225 226.864 187.763 204.237 165.135 143.775 225.597 83.313 165.135 60.687 187.763 121.148 248.225 60.687 308.687 83.313 331.314 143.775 270.852 204.237 331.314 226.864 308.687 166.403 248.225' class='ci-primary'/>"], km = ["512 512", "<polygon fill='var(--ci-primary-color, currentColor)' points='384 433.373 384 160 352 160 352 434.51 282.177 364.687 259.55 387.313 367.432 495.196 475.313 387.313 452.687 364.687 384 433.373' class='ci-primary'/><polygon fill='var(--ci-primary-color, currentColor)' points='159.432 17.372 51.55 125.255 74.177 147.882 144 78.059 144 352 176 352 176 79.195 244.687 147.882 267.313 125.255 159.432 17.372' class='ci-primary'/>"];
const Om = S({
  name: "CIcon",
  props: {
    /**
     * Use `:icon="..."` instead of
     *
     * @deprecated since version 3.0
     */
    content: {
      type: [String, Array],
      default: void 0,
      required: !1
    },
    /**
     * Use for replacing default CIcon component classes. Prop is overriding the 'size' prop.
     */
    customClassName: {
      type: [String, Array, Object],
      default: void 0,
      required: !1
    },
    /**
     * Name of the icon placed in React object or SVG content.
     */
    icon: {
      type: [String, Array],
      default: void 0,
      required: !1
    },
    /**
     * Use `icon="..."` instead of
     *
     * @deprecated since version 3.0
     */
    name: {
      type: String,
      default: void 0,
      required: !1
    },
    /**
     * Size of the icon. Available sizes: 'sm', 'lg', 'xl', 'xxl', '3xl...9xl', 'custom', 'custom-size'.
     */
    size: {
      type: String,
      default: void 0,
      required: !1,
      validator: (e) => [
        "custom",
        "custom-size",
        "sm",
        "lg",
        "xl",
        "xxl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl"
      ].includes(e)
    },
    /**
     * Title tag content.
     */
    title: {
      type: String,
      default: void 0,
      required: !1
    },
    /**
     * If defined component will be rendered using 'use' tag.
     */
    use: {
      type: String,
      default: void 0,
      required: !1
    }
  },
  setup(e, { attrs: t }) {
    const n = ae("icons"), a = e.icon || e.content || e.name, i = (g) => g.replace(/([-_][a-z0-9])/gi, (m) => m.toUpperCase()).replace(/-/gi, ""), r = j(() => a && typeof a == "string" ? a.includes("-") ? i(a) : a : ""), o = e.title ? `<title>${e.title}</title>` : "undefined", s = j(() => Array.isArray(a) ? a : typeof a == "string" && r.value && n[r.value] ? n[r.value] : "undefined"), l = Array.isArray(s.value) ? s.value[1] || s.value[0] : s.value, c = Array.isArray(s.value) && s.value.length > 1 ? s.value[0] : "64 64", u = t.viewBox || `0 0 ${c}`, d = () => {
      const g = !e.size && (t.width || t.height);
      return e.size === "custom" || g ? "custom-size" : e.size;
    }, f = [e.customClassName || ["icon", { [`icon-${d()}`]: d() }], t.class];
    return () => e.use ? h("svg", {
      ...t,
      xmlns: "http://www.w3.org/2000/svg",
      class: f,
      role: "img"
    }, h("use", { href: e.use })) : h("svg", {
      ...t,
      xmlns: "http://www.w3.org/2000/svg",
      class: f,
      viewBox: u,
      innerHTML: `${o}${l}`,
      role: "img"
    });
  }
}), ro = S({
  name: "CTableBody",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q
  },
  setup(e, { slots: t }) {
    return () => h("tbody", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), pu = S({
  name: "CTableCaption",
  setup(e, { slots: t }) {
    return () => h("caption", {}, t.default && t.default());
  }
}), pt = S({
  name: "CTableDataCell",
  props: {
    /**
     * Highlight a table row or cell.
     */
    active: Boolean,
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (e) => ["bottom", "middle", "top"].includes(e)
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q,
    /**
     * @ignore
     */
    scope: String
  },
  setup(e, { slots: t }) {
    return () => h(e.scope ? "th" : "td", {
      class: [
        {
          [`align-${e.align}`]: e.align,
          "table-active": e.active,
          [`table-${e.color}`]: e.color
        }
      ],
      ...e.scope && { scope: e.scope }
    }, t.default && t.default());
  }
}), oo = S({
  name: "CTableFoot",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q
  },
  setup(e, { slots: t }) {
    return () => h("tfoot", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), so = S({
  name: "CTableHead",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q
  },
  setup(e, { slots: t }) {
    return () => h("thead", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), vt = S({
  name: "CTableHeaderCell",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q
  },
  setup(e, { slots: t }) {
    return () => h("th", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), Me = S({
  name: "CTableRow",
  props: {
    /**
     * Highlight a table row or cell..
     */
    active: Boolean,
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (e) => ["bottom", "middle", "top"].includes(e)
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q
  },
  setup(e, { slots: t }) {
    return () => h("tr", {
      class: [
        {
          [`align-${e.align}`]: e.align,
          "table-active": e.active,
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), ws = (e) => e.replace(/[-_.]/g, " ").replace(/ +/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" "), Dm = (e) => typeof e == "object" ? e.label ?? ws(e.key) : ws(e), Pm = (e, t) => e ? e.map((n) => typeof n == "object" ? n.key : n) : t && Mm(t), Mm = (e) => Object.keys(e[0] || {}).filter((t) => t.charAt(0) !== "_"), bu = S({
  name: "CTable",
  props: {
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (e) => ["bottom", "middle", "top"].includes(e)
    },
    /**
     * Sets the border color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    borderColor: q,
    /**
     * Add borders on all sides of the table and cells.
     */
    bordered: Boolean,
    /**
     * Remove borders on all sides of the table and cells.
     */
    borderless: Boolean,
    /**
     * Put the `<caption>` on the top of the table.
     *
     * @values 'top' | string
     */
    caption: String,
    /**
     * Set the text of the table caption and the caption on the top of the table.
     *
     * @since 4.5.0
     */
    captionTop: String,
    /**
     * Prop for table columns configuration. If prop is not defined, table will display columns based on the first item keys, omitting keys that begins with underscore (e.g. '_props')
     *
     * In columns prop each array item represents one column. Item might be specified in two ways:
     * String: each item define column name equal to item value.
     * Object: item is object with following keys available as column configuration:
     * - key (required)(String) - define column name equal to item key.
     * - label (String) - define visible label of column. If not defined, label will be generated automatically based on column name, by converting kebab-case and snake_case to individual words and capitalization of each word.
     * - _props (Object) - adds classes to all cels in column, ex. _props: { scope: 'col', className: 'custom-class' },
     * - _style (Object) - adds styles to the column header (useful for defining widths)
     *
     * @since 4.5.0
     */
    columns: {
      type: Array
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q,
    /**
     * Array of objects or strings, where each element represents one cell in the table footer.
     *
     * Example items:
     * ['FooterCell', 'FooterCell', 'FooterCell']
     * or
     * [{ label: 'FooterCell', _props: { color: 'success' }, ...]
     *
     * @since 4.5.0
     */
    footer: {
      type: Array
    },
    /**
     * Enable a hover state on table rows within a `<CTableBody>`.
     */
    hover: Boolean,
    /**
     * Array of objects, where each object represents one item - row in table. Additionally, you can add style classes to each row by passing them by '_props' key and to single cell by '_cellProps'.
     *
     * Example item:
     * { name: 'John' , age: 12, _props: { color: 'success' }, _cellProps: { age: { className: 'fw-bold'}}}
     *
     * @since 4.5.0
     */
    items: {
      type: Array
    },
    responsive: {
      type: [Boolean, String],
      validator: (e) => typeof e == "string" ? ["sm", "md", "lg", "xl", "xxl"].includes(e) : typeof e == "boolean"
    },
    /**
     * Make table more compact by cutting all cell `padding` in half.
     */
    small: Boolean,
    /**
     * Add zebra-striping to any table row within the `<CTableBody>`.
     */
    striped: Boolean,
    /**
     * Add zebra-striping to any table column.
     *
     * @since 4.4.0
     */
    stripedColumns: Boolean,
    /**
     * Properties that will be passed to the table footer component.
     *
     * Properties to [CTableFoot](#ctablefoot) component.
     * @since 4.5.0
     */
    tableFootProps: {
      type: Object
    },
    /**
     * Properties that will be passed to the table head component.
     *
     *  Properties to [CTableHead](#ctablehead) component.
     * @since 4.5.0
     */
    tableHeadProps: {
      type: Object
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const a = j(() => Pm(e.columns, e.items)), i = () => h("table", {
      class: [
        "table",
        {
          [`align-${e.align}`]: e.align,
          "caption-top": e.captionTop || e.caption === "top",
          [`border-${e.borderColor}`]: e.borderColor,
          "table-bordered": e.bordered,
          "table-borderless": e.borderless,
          [`table-${e.color}`]: e.color,
          "table-hover": e.hover,
          "table-sm": e.small,
          "table-striped": e.striped,
          "table-striped-columns": e.stripedColumns
        },
        n.class
      ]
    }, {
      default: () => [
        (e.caption && e.caption !== "top" || e.captionTop) && h(pu, {}, {
          default: () => e.caption || e.captionTop
        }),
        e.columns && h(so, {
          ...e.tableHeadProps
        }, {
          default: () => h(Me, {}, {
            default: () => [
              e.columns && e.columns.map((r) => h(vt, {
                ...typeof r == "object" && r._props && { ...r._props },
                ...typeof r == "object" && r._style && { style: { ...r._style } }
              }, {
                default: () => Dm(r)
              }))
            ]
          })
        }),
        e.items && h(ro, {}, {
          default: () => [
            e.items && e.items.map((r) => h(Me, {
              ...r._props && { ...r._props }
            }, {
              default: () => [
                a.value && a.value.map((o) => r[o] !== void 0 && h(pt, {
                  ...r._cellProps && r._cellProps.all && { ...r._cellProps.all },
                  ...r._cellProps && r._cellProps[o] && {
                    ...r._cellProps[o]
                  }
                }, {
                  default: () => r[o]
                }))
              ]
            }))
          ]
        }),
        t.default && t.default(),
        e.footer && h(oo, {
          ...e.tableFootProps
        }, {
          default: () => h(Me, {}, {
            default: () => [
              e.footer && e.footer.map((r) => h(pt, {
                ...typeof r == "object" && r._props && { ...r._props }
              }, {
                default: () => typeof r == "object" ? r.label : r
              }))
            ]
          })
        })
      ]
    });
    return () => [
      e.responsive ? h("div", {
        class: typeof e.responsive == "boolean" ? "table-responsive" : `table-responsive-${e.responsive}`
      }, i()) : i()
    ];
  }
}), Tm = (e, t, n, a) => (t && typeof t == "object" && t.external || Object.entries(n).forEach(([i, r]) => {
  if (r instanceof Function) {
    e = e.filter((s) => r(s[i]));
    return;
  }
  const o = String(r).toLowerCase();
  o && a.includes(i) && (e = e.filter((s) => String(s[i]).toLowerCase().includes(o)));
}), e), Am = (e, t, n, a) => {
  if (!n || t && typeof t == "object" && t.external)
    return e;
  const i = n.toLowerCase(), r = (o) => String(o).toLowerCase().includes(i);
  return e = e.filter((o) => !!a.find((s) => r(o[s]))), e;
}, Ss = (e, t) => {
  const n = e.closest("tr"), a = n ? Array.from(n.children) : [], i = a.filter((r) => r.contains(e))[0];
  return t[a.indexOf(i)];
}, We = (e) => typeof e == "object" ? e.key : e, ks = (e) => typeof e == "object" ? e.label !== void 0 ? e.label : Os(e.key) : Os(e), yu = (e, t) => {
  if (e) {
    const n = [];
    for (const a of e) {
      if (typeof a == "object" && a.children) {
        n.push(...yu(a.children, []));
        continue;
      }
      typeof a == "object" ? n.push(a.key) : n.push(a);
    }
    return n;
  }
  return xu(t);
}, _r = (e) => {
  const t = [];
  for (const n of e) {
    if (typeof n == "object" && n.group && n.children) {
      t.push(..._r(n.children));
      continue;
    }
    typeof n == "object" && n.children && t.push(..._r(n.children)), t.push(n);
  }
  return t;
}, Cu = (e, t = 0) => {
  let n = t;
  for (const a of e)
    a.children || n++, a.children && (n = Cu(a.children, n));
  return n;
}, Lm = (e) => {
  const t = [], n = (a, i = 0, r = 0) => {
    const o = [];
    if (a.children)
      for (const s of a.children)
        s.group || r++, o.push(...n(s, i + 1, r));
    if (typeof a == "object" && a.group) {
      const { children: s, group: l, ...c } = a;
      o.push({
        deep: i,
        label: l,
        ...s && { colspan: Cu(s) },
        ...c
      });
    }
    return o;
  };
  if (e) {
    for (const a of e)
      if (typeof a == "object" && a.group) {
        const i = n(a);
        if (i)
          for (const r of i) {
            const { deep: o, ...s } = r;
            if (o !== void 0) {
              for (let l = 0; l < o; l++)
                t[l] || t.push([]);
              t[o] ? t[o].push(s) : t.push([s]);
            }
          }
      }
  }
  return t;
}, xu = (e) => Object.keys(e[0] || {}).filter((t) => t.charAt(0) !== "_"), Yi = (e, t) => t && t.column === e && t.state ? t.state : 0, $m = (e, t) => e.map((n) => n[t]), Bm = (e, t) => e._cellProps && {
  ...e._cellProps.all && { ...e._cellProps.all },
  ...e._cellProps[t] && { ...e._cellProps[t] }
}, Ui = (e) => typeof e == "object" && e._props ? e._props : {}, Em = (e, t) => {
  const n = {};
  return t && (typeof e != "object" || typeof e == "object" && (e.sorter === void 0 || e.sorter)) && (n.cursor = "pointer"), typeof e == "object" && e._style ? { ...n, ...e._style } : n;
}, Im = (e, t, n, a, i) => {
  const r = a.includes(i[e]);
  let o;
  return t && (o = t[e]), n && (!t || typeof o != "object" || typeof o == "object" && (o.sorter === void 0 || o.sorter)) && r;
}, Os = (e) => e.replace(/[-_.]/g, " ").replace(/ +/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" "), Fm = (e, t, n, a) => {
  const i = a.column;
  if (!i || !n.includes(i) || e && typeof e == "object" && e.external)
    return t;
  const r = a.state === "asc" ? 1 : a.state === "desc" ? -1 : 0;
  return t.slice().sort((s, l) => {
    const c = s[i], u = l[i], d = typeof c == "number" ? c : String(c).toLowerCase(), f = typeof u == "number" ? u : String(u).toLowerCase();
    return d > f ? 1 * r : f > d ? -1 * r : 0;
  });
}, Rm = S({
  name: "CSmartTableBody",
  props: {
    clickableRows: Boolean,
    columnNames: {
      type: Array,
      default: () => [],
      require: !0
    },
    currentItems: {
      type: Array,
      default: () => []
    },
    firstItemOnActivePageIndex: {
      type: Number,
      require: !0,
      default: 0
    },
    noItemsLabel: String,
    scopedSlots: Object,
    selectable: Boolean,
    selected: Array
  },
  emits: ["rowChecked", "rowClick"],
  setup(e, { emit: t }) {
    const n = e.selectable ? e.columnNames.length + 1 : e.columnNames.length;
    return () => h(ro, {
      ...e.clickableRows && { style: "cursor:pointer;" }
    }, {
      default: () => e.currentItems.length > 0 ? e.currentItems.map((a, i) => [
        h(Me, {
          ...a._props && { ...a._props },
          ...e.clickableRows && { tabindex: 0 },
          onClick: (r) => {
            t("rowClick", a, i + e.firstItemOnActivePageIndex, Ss(r.target, e.columnNames), r);
          }
        }, {
          default: () => [
            e.selectable && h(pt, {}, () => h(ta, {
              checked: e.selected && cr(e.selected, a, [
                "_cellProps",
                "_props",
                "_selected"
              ]),
              onChange: (r) => {
                t("rowChecked", a, r.target.checked);
              }
            })),
            e.columnNames.map((r) => e.scopedSlots && e.scopedSlots[r] && typeof e.scopedSlots[r] == "function" ? h(e.scopedSlots[r], { item: a }) : typeof a[r] < "u" && h(pt, {
              ...Bm(a, r)
            }, {
              default: () => String(a[r])
            }))
          ]
        }),
        e.scopedSlots && e.scopedSlots.details && [
          h(Me, {
            colspan: e.selectable ? e.columnNames.length + 1 : e.columnNames.length,
            class: "p-0",
            style: { "border-bottom-width": "0" },
            tabindex: "-1"
          }),
          h(Me, {
            class: "p-0",
            key: `details${i}`,
            onClick: (r) => {
              t("rowClick", a, i + e.firstItemOnActivePageIndex, Ss(r.target, e.columnNames), !0);
            }
          }, {
            default: () => h(pt, {
              colspan: e.selectable ? e.columnNames.length + 1 : e.columnNames.length,
              class: "p-0",
              style: { border: 0 }
            }, {
              default: () => e.scopedSlots && e.scopedSlots.details && h(e.scopedSlots.details, {
                item: a
              })
            })
          })
        ]
      ]) : h(Me, {}, {
        default: () => h(pt, { colspan: n }, {
          default: () => e.noItemsLabel
        })
      })
    });
  }
}), Ds = S({
  name: "CSmartTableHead",
  props: {
    columnFilter: [Boolean, Object],
    columnFilterValue: Object,
    columnSorter: [Boolean, Object],
    component: {
      type: String,
      default: "head"
    },
    columns: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    selectable: Boolean,
    selectAll: [Boolean, Object],
    selectedAll: [Boolean, String],
    showGroups: {
      type: Boolean,
      default: !0
    },
    sorterState: Object
  },
  emits: ["customFilterChange", "filterInput", "filterChange", "selectAllChecked", "sortClick"],
  setup(e, { slots: t, emit: n }) {
    const a = j(() => _r(e.columns)), i = j(() => Lm(e.columns)), r = (o) => {
      if (Yi(We(o), e.sorterState) === 0)
        return h("span", { class: "opacity-25 float-end me-1" }, t.sortingIcon && t.sortingIcon());
      if (Yi(We(o), e.sorterState) === "asc")
        return h("span", { class: "float-end me-1" }, t.sortingIconAscending && t.sortingIconAscending());
      if (Yi(We(o), e.sorterState) === "desc")
        return h("span", { class: "float-end me-1" }, t.sortingIconDescending && t.sortingIconDescending());
    };
    return () => h(e.component === "head" ? so : oo, {}, {
      default: () => [
        e.showGroups && i.value && i.value.length > 0 && i.value.map((o) => [
          h(Me, {}, () => [
            e.selectable && h(vt),
            o.map((s) => h(vt, {
              colspan: s.colspan,
              ...Ui(s)
            }, () => s.label))
          ])
        ]),
        h(Me, {}, {
          default: () => [
            e.selectable && h(vt, {}, () => h(ta, {
              checked: typeof e.selectedAll == "boolean" ? e.selectedAll : !1,
              indeterminate: e.selectedAll === "indeterminate",
              onChange: () => {
                n("selectAllChecked");
              }
            })),
            a.value.map((o, s) => h(vt, {
              ...Ui(o),
              onClick: () => {
                n("sortClick", We(o), s);
              },
              style: Em(o, e.columnSorter)
            }, {
              default: () => [
                h("div", {
                  class: "d-inline"
                }, ks(o)),
                e.columnSorter && (typeof o == "object" ? typeof o.sorter > "u" ? !0 : o.sorter : !0) && r(o)
              ]
            }))
          ]
        }),
        e.columnFilter && h(Me, {}, {
          default: () => [
            e.selectable && h(vt),
            a.value.map((o) => h(vt, {
              ...Ui(o)
            }, {
              default: () => typeof o != "object" || o.filter === void 0 || o.filter ? typeof o != "string" && typeof o.filter == "function" ? o.filter($m(e.items, We(o)), (s) => {
                n("customFilterChange", We(o), s);
              }) : h(na, {
                size: "sm",
                onInput: (s) => {
                  n("filterInput", We(o), s.target.value);
                },
                onChange: (s) => {
                  n("filterChange", We(o), s.target.value);
                },
                "aria-label": `column name: '${ks(o)}' filter input`,
                ...e.columnFilterValue && e.columnFilterValue[We(o)] && {
                  value: e.columnFilterValue[We(o)]
                }
              }) : ""
            }))
          ]
        })
      ]
    });
  }
}), Nm = S({
  name: "CSmartTable",
  props: {
    /**
     * Sets active page. If 'pagination' prop is enabled, activePage is set only initially.
     */
    activePage: {
      type: Number,
      default: 1
    },
    /**
     * When set, displays table cleaner above table, next to the table filter (or in place of table filter if `tableFilter` prop is not set)
     * Cleaner resets `tableFilterValue`, `columnFilterValue`, `sorterValue`. If clean is possible it is clickable (`tabIndex="0"` `role="button"`, `color="danger"`), otherwise it is not clickable and transparent. Cleaner can be customized through the `cleanerIcon` slot.
     *
     */
    cleaner: Boolean,
    /**
     * Style table items as clickable.
     */
    clickableRows: Boolean,
    /**
     * When set, displays additional filter row between table header and items, allowing filtering by specific column.
     * Column filter can be customized, by passing prop as object with additional options as keys. Available options:
     * - external (Boolean) - Disables automatic filtering inside component.
     * - lazy (Boolean) - Set to true to trigger filter updates only on change event.
     */
    columnFilter: {
      type: [Boolean, Object]
    },
    /**
     * Value of table filter. To set pass object where keys are column names and values are filter strings e.g.:
     * { user: 'John', age: 12 }
     */
    columnFilterValue: {
      type: Object
    },
    /**
     * Prop for table columns configuration. If prop is not defined, table will display columns based on the first item keys, omitting keys that begins with underscore (e.g. '_props')
     *
     * In columns prop each array item represents one column. Item might be specified in two ways:
     * String: each item define column name equal to item value.
     * Object: item is object with following keys available as column configuration:
     * - key (required)(String) - define column name equal to item key.
     * - filter (Boolean) - removes filter from column when set to false.
     * - label (String) - define visible label of column. If not defined, label will be generated automatically based on column name, by converting kebab-case and snake_case to individual words and capitalization of each word.
     * - sorter (Boolean) - disables sorting of the column when set to false
     * - [_props](https://coreui.io/vue/docs/components/table.html#ctableheadercell) (String/Array/Object) - add props to `CTableHeaderCell`.
     * - _style (String/Array/Object) - adds styles to the column header (useful for defining widths)
     */
    columns: {
      type: Array
    },
    /**
     * Enables table sorting by column value. Sorting will be performed corectly only if values in column are of one type: string (case insensitive) or number.
     *
     * Sorter can be customized, by passing prop as object with additional options as keys. Available options:
     * - external (Boolean) - Disables automatic sorting inside component.
     * - resetable (Boolean) - If set to true clicking on sorter have three states: ascending, descending and null. That means that third click on sorter will reset sorting, and restore table to original order.
     */
    columnSorter: {
      type: [Boolean, Object]
    },
    /**
     * If `true` Displays table footer, which mirrors table header. (without column filter).
     * Or Array of objects or strings, where each element represents one cell in the table footer.
     *
     * Example items:
     * `['FooterCell', 'FooterCell', 'FooterCell']`
     * or
     * `[{ label: 'FooterCell', _props: { color: 'success' }, ...]`
     */
    footer: {
      type: [Boolean, Array]
    },
    /**
     * Set to false to remove table header.
     */
    header: {
      type: Boolean,
      default: !0
    },
    /**
     * Array of objects, where each object represents one item - row in table. Additionally, you can customize each row by passing them by [_props](http://coreui.io/vue/docs/components/table.html#ctablerow) key and single cell by [_cellProps](http://coreui.io/vue/docs/components/table.html#ctabledatacell).
     *
     * Examples:
     * - `_props: { color: 'primary', align: 'middle'}`
     * - `_cellProps: { all: { class: 'fw-semibold'}, 'name': { color: 'info' }}`
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * The total number of items. Use if you pass a portion of data from an external source to let know component what is the total number of items.
     *
     * @since 4.8.0
     */
    itemsNumber: Number,
    /**
     * Number of items per site, when pagination is enabled.
     */
    itemsPerPage: {
      type: Number,
      default: 10
    },
    /**
     * Label for items per page selector.
     */
    itemsPerPageLabel: {
      type: String,
      default: "Items per page:"
    },
    /**
     * Items per page selector options.
     */
    itemsPerPageOptions: {
      type: Array,
      default: () => [5, 10, 20, 50]
    },
    /**
     * Adds select element over table, which is used for control items per page in pagination. If you want to customize this element, pass object with optional values:
     * - label (String) - replaces default label text
     * - values (Array) - custom array of pagination values
     * - external (Boolean) - disables automatic 'itemsPerPage' change (use to change pages externaly by 'pagination-change' event).
     */
    itemsPerPageSelect: {
      type: [Boolean, Object]
    },
    /**
     * When set, table will have loading style: loading spinner and reduced opacity. When 'small' prop is enabled spinner will be also smaller.
     */
    loading: Boolean,
    /**
     * ReactNode or string for passing custom noItemsLabel texts.
     */
    noItemsLabel: {
      type: String,
      default: "No items found"
    },
    /**
     * Enables default pagination. Set to true for default setup or pass an object with additional CPagination props. Default pagination will always have the computed number of pages that cannot be changed. The number of pages is generated based on the number of passed items and 'itemsPerPage' prop. If this restriction is an obstacle, you can make external CPagination instead.
     */
    pagination: {
      type: [Boolean, Object]
    },
    /**
     * Properties to [CSmartPagination](https://coreui.io/vue/docs/components/smart-pagination#csmartpagination) component.
     */
    paginationProps: Object,
    /**
     * Add checkboxes to make table rows selectable.
     */
    selectable: Boolean,
    /**
     * Enables select all checkbox displayed in the header of the table.
     *
     * Can be customized, by passing prop as object with additional options as keys. Available options:
     * - external (Boolean) - Disables automatic selection inside the component.
     *
     * @since 4.8.0
     */
    selectAll: {
      type: [Boolean, Object]
    },
    /**
     * Array of selected objects, where each object represents one item - row in table.
     *
     * Example item: `{ name: 'John' , age: 12 }`
     *
     * @since 4.8.0
     */
    selected: {
      type: Array,
      default: () => []
    },
    /**
     * State of the sorter. Name key is column name, direction can be 'asc' or 'desc'. eg.:
     * { column: 'status', state: 'asc' }
     */
    sorterValue: {
      type: Object
    },
    /**
     * Properties to [CTableBody](https://coreui.io/vue/docs/components/table/#ctablebody) component.
     */
    tableBodyProps: Object,
    /**
     * Properties to [CTableFoot](https://coreui.io/vue/docs/components/table/#ctablefoot) component.
     */
    tableFootProps: Object,
    /**
     * When set, displays table filter above table, allowing filtering by specific column.
     *
     * Column filter can be customized, by passing prop as object with additional options as keys. Available options:
     * - external (Boolean) - Disables automatic filtering inside component.
     * - lazy (Boolean) - Set to true to trigger filter updates only on change event.
     */
    tableFilter: {
      type: [Boolean, Object]
    },
    /**
     * The element represents a caption for a component.
     */
    tableFilterLabel: {
      type: String,
      default: "Filter:"
    },
    /**
     * Specifies a short hint that is visible in the search input.
     */
    tableFilterPlaceholder: {
      type: String,
      default: "type string..."
    },
    /**
     * Value of table filter.
     */
    tableFilterValue: String,
    /**
     * Properties to [CTableHead](https://coreui.io/vue/docs/components/table/#ctablehead) component.
     */
    tableHeadProps: Object,
    /**
     * Properties to [CTable](https://coreui.io/vue/docs/components/table/#ctable) component.
     */
    tableProps: Object
  },
  emits: [
    /**
     * Page change callback.
     *
     * @property {number} page - active page number
     */
    "activePageChange",
    /**
     * Column filter change callback.
     *
     * @property {object} ColumnFilterValue {[key: string]: string | number}
     */
    "columnFilterChange",
    /**
     * Filtered items change callback.
     *
     * @property {array} items
     */
    "filteredItemsChange",
    /**
     * Pagination change callback.
     *
     * @property {number} itemsPerPageNumber - items per page number
     */
    "itemsPerPageChange",
    /**
     * Row click callback.
     *
     * @property {object} item
     * @property {number} index
     * @property {string} columnName
     * @property {event} event
     */
    "rowClick",
    /**
     * Select all callback.
     *
     * @since 4.8.0
     */
    "selectAll",
    /**
     * Selected items change callback.
     *
     * @property {array} items
     */
    "selectedItemsChange",
    /**
     * Sorter value change callback.
     *
     * @property {object} SorterValue { column?: string, state?: number | string}
     */
    "sorterChange",
    /**
     * Table filter change callback.
     *
     * @property {string} tableFilterValue
     */
    "tableFilterChange"
  ],
  setup(e, { emit: t, slots: n }) {
    const a = O(e.activePage), i = O(e.columnFilterValue ?? {}), r = O(e.items.map((_, T) => ({ ..._, _id: T }))), o = O(e.itemsNumber), s = O(e.itemsPerPage || r.value.length), l = O([]), c = O(), u = O(e.sorterValue || {}), d = O(e.tableFilterValue ?? "");
    E(() => e.activePage, () => {
      a.value = e.activePage;
    }), E(() => e.columnFilterValue, () => {
      e.columnFilterValue && (i.value = e.columnFilterValue);
    }), E(() => e.items, () => {
      e.items && e.items.length < s.value * a.value - s.value && (a.value = 1), e.items.forEach((_) => {
        if (_._selected) {
          const T = { ..._ };
          delete T._cellProps, delete T._props, delete T._selected, l.value = [...l.value, T];
        }
      }), Array.isArray(e.items) && (r.value = e.items, o.value = e.itemsNumber || e.items.length);
    }, {
      immediate: !0
    }), E(() => e.itemsNumber, () => {
      o.value = e.itemsNumber;
    }), E(() => e.itemsPerPage, () => {
      s.value = e.itemsPerPage;
    }), E(() => e.selected, () => {
      l.value = e.selected;
    }), E(() => e.sorterValue, () => {
      e.sorterValue && (u.value = e.sorterValue);
    }), E(s, () => {
      e.itemsPerPage !== s.value && (a.value = 1), t("itemsPerPageChange", s.value);
    }), E([l, o], () => {
      if (e.selectable) {
        if (t("selectedItemsChange", l), l.value.length === o.value) {
          c.value = !0;
          return;
        }
        if (l.value.length === 0) {
          c.value = !1;
          return;
        }
        l.value.length > 0 && l.value.length !== o.value && (c.value = "indeterminate");
      }
    }, {
      immediate: !0
    }), _e(() => {
      r.value && r.value.length < s.value * a.value - s.value && (a.value = 1);
    });
    const f = (_, T) => {
      if (!Im(T, e.columns, e.columnSorter, C.value, x.value))
        return;
      const P = u.value;
      P.column === _ ? P.state === 0 ? P.state = "asc" : P.state === "asc" ? P.state = "desc" : typeof e.columnSorter == "object" && !e.columnSorter.resetable ? P.state = "asc" : P.state = 0 : (P.column = _, P.state = "asc"), u.value.column = P.column, u.value.state = P.state, t("sorterChange", u.value);
    }, g = (_) => {
      a.value = _, t("activePageChange", _);
    }, m = (_) => {
      (typeof e.itemsPerPageSelect != "object" || typeof e.itemsPerPageSelect == "object" && !e.itemsPerPageSelect.external) && (s.value = Number(_.target.value));
    }, v = (_, T) => {
      if (T && !cr(l.value, _, ["_cellProps", "_props", "_selected"])) {
        l.value = [...l.value, _];
        return;
      }
      l.value = l.value.filter((P) => !cr([P], _, ["_cellProps", "_props", "_selected"]));
    }, p = () => {
      if (c.value === !0) {
        l.value = [];
        return;
      }
      t("selectAll"), !(e.selectAll && typeof e.selectAll == "object" && e.selectAll.external) && (l.value = r.value.map((_) => {
        const { _cellProps: T, _props: P, _selected: B, ...I } = _;
        return I;
      }));
    }, b = (_, T, P) => {
      const B = e.columnFilter && typeof e.columnFilter == "object" && e.columnFilter.lazy === !0;
      B && P === "input" || !B && P === "change" || (a.value = 1, i.value = { ...i.value, [`${_}`]: T }, t("columnFilterChange", i.value));
    }, y = (_, T) => {
      const P = e.columnFilter && typeof e.columnFilter == "object" && e.columnFilter.lazy === !0;
      P && T === "input" || !P && T === "change" || (a.value = 1, d.value = _, t("tableFilterChange", d.value));
    }, w = () => {
      d.value = "", i.value = {}, u.value = {};
    }, x = j(() => yu(e.columns, r.value)), C = j(() => x.value.filter((_) => xu(r.value).includes(_))), k = j(() => Tm(r.value, e.columnFilter, i.value, C.value)), M = j(() => Am(k.value, e.tableFilter, d.value, C.value)), L = j(() => Fm(e.columnSorter, M.value, C.value, u.value));
    E(L, () => {
      t("filteredItemsChange", L.value);
    });
    const A = j(() => s.value ? Math.ceil(L.value.length / s.value) : 1), $ = j(() => a.value ? (a.value - 1) * s.value : 0), D = j(() => a.value ? L.value.slice($.value, $.value + s.value) : L.value);
    return () => h("div", {}, [
      (e.tableFilter || e.cleaner) && h("div", {
        class: "row my-2 mx-0"
      }, [
        e.tableFilter && h("div", {
          class: "col-auto p-0"
        }, e.tableFilter && h("div", {
          class: "row mb-2"
        }, {
          default: () => [
            h(Ne, {
              class: "col-sm-auto col-form-label"
            }, {
              default: () => e.tableFilterLabel
            }),
            h("div", {
              class: "col-sm-auto"
            }, h(na, {
              onInput: (_) => {
                y(_.target.value, "input");
              },
              onChange: (_) => {
                y(_.target.value, "change");
              },
              placeholder: e.tableFilterPlaceholder,
              value: d.value
            }))
          ]
        })),
        e.cleaner && h("div", {
          class: "col-auto p-0"
        }, h("button", {
          type: "button",
          class: "btn btn-transparent",
          ...!(d.value || u.value.column || Object.values(i.value).join("")) && { disabled: !0, tabIndex: -1 },
          onClick: () => w(),
          onKeydown: (_) => {
            _.key === "Enter" && w();
          }
        }, n.cleanerIcon ? n.cleanerIcon() : h(Om, { width: "18", content: Sm })))
      ]),
      h("div", {
        class: "position-relative"
      }, {
        default: () => [
          h(bu, {
            ...e.tableProps
          }, {
            default: () => [
              e.header && h(Ds, {
                component: "head",
                ...e.tableHeadProps,
                columnFilter: e.columnFilter,
                columnFilterValue: i.value,
                columns: e.columns ?? x.value,
                columnSorter: e.columnSorter,
                items: r.value,
                selectable: e.selectable,
                selectAll: e.selectAll,
                selectedAll: c.value,
                sorterState: u.value,
                onCustomFilterChange: (_, T) => b(_, T),
                onFilterInput: (_, T) => b(_, T, "input"),
                onFilterChange: (_, T) => b(_, T, "change"),
                onSelectAllChecked: () => p(),
                onSortClick: (_, T) => f(_, T)
              }, {
                // @slot Sorter icon when items are unsorted.
                sortingIcon: () => n.sortingIcon ? n.sortingIcon() : h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "icon",
                  viewBox: "0 0 512 512",
                  role: "img",
                  innerHTML: km[1]
                }),
                // @slot Sorter icon when items are sorted ascending.
                sortingIconAscending: () => n.sortingIconAscending ? n.sortingIconAscending() : h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "icon",
                  viewBox: "0 0 512 512",
                  role: "img",
                  innerHTML: _m[1]
                }),
                // @slot  Sorter icon when items are sorted descending.
                sortingIconDescending: () => n.sortingIconDescending ? n.sortingIconDescending() : h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "icon",
                  viewBox: "0 0 512 512",
                  role: "img",
                  innerHTML: wm[1]
                })
              }),
              h(Rm, {
                clickableRows: e.clickableRows,
                columnNames: x.value,
                currentItems: D.value,
                firstItemOnActivePageIndex: $.value,
                noItemsLabel: e.noItemsLabel,
                onRowChecked: (_, T) => v(_, T),
                onRowClick: (_, T, P, B) => e.clickableRows && t("rowClick", _, T, P, B),
                scopedSlots: n,
                selectable: e.selectable,
                selected: l.value,
                ...e.tableBodyProps
              }),
              typeof e.footer == "boolean" && e.footer && h(Ds, {
                component: "footer",
                ...e.tableFootProps,
                columnFilter: !1,
                columnSorter: !1,
                columns: e.columns ? e.columns : x.value,
                selectable: e.selectable,
                selectAll: e.selectAll,
                selectedAll: c.value,
                showGroups: !1,
                onSelectAllChecked: () => p()
              }),
              Array.isArray(e.footer) && h(oo, {
                ...e.tableFootProps
              }, {
                default: () => h(Me, {}, {
                  default: () => [
                    Array.isArray(e.footer) && e.footer.map((_) => h(pt, {
                      ...typeof _ == "object" && _._props && { ..._._props }
                    }, {
                      default: () => typeof _ == "object" ? _.label : _
                    }))
                  ]
                })
              })
            ]
          }),
          e.loading && h(su, {
            boundaries: [
              { sides: ["top"], query: "tbody" },
              { sides: ["bottom"], query: "tbody" }
            ]
          }, {
            // @slot elementCover.
            ...n.elementCover && {
              default: () => n.elementCover && n.elementCover()
            }
          })
        ]
      }),
      (e.pagination || e.itemsPerPageSelect) && h("div", {
        class: "row"
      }, [
        h("div", {
          class: "col"
        }, e.pagination && A.value > 1 || e.paginationProps ? h(vu, {
          pages: A.value,
          activePage: a.value,
          ...e.paginationProps,
          onActivePageChange: (_) => typeof e.pagination == "object" && e.pagination.external ? t("activePageChange", _) : g(_)
        }) : ""),
        e.itemsPerPageSelect && h("div", {
          class: "col-auto ms-auto"
        }, h("div", {
          class: "row"
        }, {
          default: () => [
            h(Ne, {
              class: "col-auto col-form-label"
            }, {
              default: () => e.itemsPerPageLabel
            }),
            h("div", {
              class: "col-auto"
            }, h(Ua, {
              value: s.value,
              onChange: m
            }, {
              default: () => e.itemsPerPageOptions && e.itemsPerPageOptions.map((_, T) => h("option", {
                value: _,
                key: T
              }, _))
            }))
          ]
        }))
      ])
    ]);
  }
}), _u = S({
  name: "CTabContent",
  setup(e, { slots: t }) {
    return () => h("div", { class: "tab-content" }, t.default && t.default());
  }
}), wu = S({
  name: "CTabPane",
  props: {
    /**
     * Toggle the visibility of component.
     */
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = O(), i = O(!0), r = (s, l) => {
      i.value = !1, n("show"), setTimeout(() => {
        be(() => l(), s), s.classList.add("show");
      }, 1);
    }, o = (s, l) => {
      i.value = !1, n("hide"), s.classList.remove("show"), be(() => l(), s);
    };
    return () => h(Qe, {
      onEnter: (s, l) => r(s, l),
      onLeave: (s, l) => o(s, l)
    }, () => di(h("div", {
      class: [
        "tab-pane",
        "fade",
        {
          active: e.visible,
          show: i.value && e.visible
        }
      ],
      ref: a
    }, t.default && t.default()), [[Ic, e.visible]]));
  }
}), Su = S({
  name: "CToast",
  props: {
    /**
     * Auto hide the toast.
     */
    autohide: {
      type: Boolean,
      default: !0
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: q,
    /**
     * Delay hiding the toast (ms).
     */
    delay: {
      type: Number,
      default: 5e3
    },
    /**
     * Optionally add a close button to component and allow it to self dismiss.
     */
    dismissible: {
      type: Boolean,
      default: !0
    },
    /**
     * index of the component.
     */
    index: Number,
    /**
     * Title node for your component.
     */
    title: String,
    /**
     * Toggle the visibility of component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = O(0), i = O();
    return ue("updateVisible", (o) => {
      i.value = o;
    }), _e(() => {
      e.visible && (i.value = e.visible), e.autohide && (clearTimeout(a.value), a.value = window.setTimeout(() => {
        i.value = !1, n("close");
      }, e.delay));
    }), () => h(Qe, {
      appear: !0,
      enterFromClass: "",
      enterActiveClass: "show showing",
      enterToClass: "show",
      leaveFromClass: "show",
      leaveActiveClass: "show showing",
      leaveToClass: "show",
      onAfterEnter: (o) => {
        o.classList.add("show"), e.index ? n("show", e.index) : n("show");
      },
      onAfterLeave: () => {
        e.index ? n("close", e.index) : n("close");
      }
    }, {
      default: () => i.value && h("div", {
        class: [
          "toast fade",
          {
            [`bg-${e.color}`]: e.color
          }
        ],
        "aria-live": "assertive",
        "aria-atomic": !0,
        role: "alert"
      }, t.default && t.default())
    });
  }
}), ku = S({
  name: "CToastBody",
  setup(e, { slots: t }) {
    return () => h("div", { class: "toast-body" }, t.default && t.default());
  }
}), Ou = S({
  name: "CToastClose",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: String,
    ...Xn.props
  },
  emits: [
    /**
     * Event called before the dissmiss animation has started.
     */
    "close"
  ],
  setup(e, { slots: t, emit: n }) {
    const a = ae("updateVisible"), i = () => {
      n("close"), a(!1);
    };
    return () => e.component ? h(e.component, {
      onClick: () => {
        i();
      }
    }, () => t.default && t.default()) : h(Xn, {
      ...e,
      onClick: () => {
        i();
      }
    });
  }
}), Du = S({
  name: "CToaster",
  props: {
    /**
     * Describes the placement of component.
     *
     * @values 'top-start', 'top', 'top-end', 'middle-start', 'middle', 'middle-end', 'bottom-start', 'bottom', 'bottom-end'
     */
    placement: {
      type: String,
      validator: (e) => [
        "top-start",
        "top-center",
        "top-end",
        "middle-start",
        "middle-center",
        "middle-end",
        "bottom-start",
        "bottom-center",
        "bottom-end"
      ].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => h("div", {
      class: [
        "toaster toast-container p-3",
        {
          "position-fixed": e.placement,
          "top-0": e.placement && e.placement.includes("top"),
          "top-50 translate-middle-y": e.placement && e.placement.includes("middle"),
          "bottom-0": e.placement && e.placement.includes("bottom"),
          "start-0": e.placement && e.placement.includes("start"),
          "start-50 translate-middle-x": e.placement && e.placement.includes("center"),
          "end-0": e.placement && e.placement.includes("end")
        }
      ]
    }, t.default && t.default());
  }
}), jm = S({
  name: "CToastHeader",
  props: {
    /**
     * Automatically add a close button to the header.
     */
    closeButton: Boolean
  },
  emits: [
    /**
     * Event called after clicking the close button.
     */
    "close"
  ],
  setup(e, { slots: t, emit: n }) {
    return () => h("div", { class: "toast-header" }, [
      t.default && t.default(),
      e.closeButton && h(Ou, {
        onClose: () => n("close")
      })
    ]);
  }
}), zm = S({
  name: "CTooltip",
  props: {
    /**
     * Apply a CSS fade transition to the tooltip.
     *
     * @since 4.9.0
     */
    animation: {
      type: Boolean,
      default: !0
    },
    /**
     * Content for your component. If you want to pass non-string value please use dedicated slot `<template #content>...</template>`
     */
    content: String,
    /**
     * The delay for displaying and hiding the popover (in milliseconds). When a numerical value is provided, the delay applies to both the hide and show actions. The object structure for specifying the delay is as follows: delay: `{ 'show': 500, 'hide': 100 }`.
     *
     * @since 4.9.0
     */
    delay: {
      type: [Number, Object],
      default: 0
    },
    /**
     * Specify the desired order of fallback placements by providing a list of placements as an array. The placements should be prioritized based on preference.
     *
     * @since 4.9.0
     */
    fallbackPlacements: {
      type: [String, Array],
      default: () => ["top", "right", "bottom", "left"],
      validator: (e) => typeof e == "string" ? ["top", "right", "bottom", "left"].includes(e) : Array.isArray(e) ? e.every((t) => ["top", "right", "bottom", "left"].includes(t)) : !1
    },
    /**
     * Offset of the tooltip relative to its target.
     */
    offset: {
      type: Array,
      default: () => [0, 6]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     */
    placement: {
      type: String,
      default: "top",
      validator: (e) => ["top", "right", "bottom", "left"].includes(e)
    },
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @values 'click', 'focus', 'hover'
     */
    trigger: {
      type: [String, Array],
      default: () => ["hover", "focus"],
      validator: (e) => typeof e == "string" ? ["click", "focus", "hover"].includes(e) : Array.isArray(e) ? e.every((t) => ["click", "focus", "hover"].includes(t)) : !1
    },
    /**
     * Toggle the visibility of tooltip component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { attrs: t, slots: n, emit: a }) {
    const i = O(), r = O(), o = O(e.visible), { initPopper: s, destroyPopper: l } = to(), c = typeof e.delay == "number" ? { show: e.delay, hide: e.delay } : e.delay, u = {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: ".tooltip-arrow"
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: e.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: e.offset
          }
        }
      ],
      placement: qc(e.placement, i.value)
    }, d = (m, v) => {
      a("show"), s(i.value, r.value, u), m.classList.add("show"), be(() => v(), m);
    }, f = (m, v) => {
      a("hide"), m.classList.remove("show"), be(() => {
        v(), l();
      }, m);
    }, g = (m, v) => {
      if (i.value = m.target, v) {
        setTimeout(() => {
          o.value = !0;
        }, c.show);
        return;
      }
      setTimeout(() => {
        o.value = !1;
      }, c.hide);
    };
    return () => [
      h(Rc, {
        to: "body"
      }, h(Qe, {
        onEnter: (m, v) => d(m, v),
        onLeave: (m, v) => f(m, v)
      }, () => o.value && h("div", {
        class: [
          "tooltip",
          "bs-tooltip-auto",
          {
            fade: e.animation
          }
        ],
        ref: r,
        role: "tooltip",
        ...t
      }, [
        h("div", { class: "tooltip-arrow" }),
        (e.content || n.content) && h("div", { class: "tooltip-inner" }, {
          default: () => n.content && n.content() || e.content
        })
      ]))),
      n.toggler && n.toggler({
        on: {
          click: (m) => e.trigger.includes("click") && g(m, !o.value),
          blur: (m) => e.trigger.includes("focus") && g(m, !1),
          focus: (m) => e.trigger.includes("focus") && g(m, !0),
          mouseenter: (m) => e.trigger.includes("hover") && g(m, !0),
          mouseleave: (m) => e.trigger.includes("hover") && g(m, !1)
        }
      })
    ];
  }
}), Vm = S({
  name: "CWidgetStatsA",
  props: {
    color: String,
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for action component, ex. `<CDropdown>`.
   *
   * @slot action
   */
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(e, { slots: t }) {
    return () => h(Wt, {
      class: [
        { [`bg-${e.color}`]: e.color, "text-high-emphasis-inverse": e.color }
      ]
    }, () => [
      h(Yt, {
        class: "pb-0 d-flex justify-content-between align-items-start"
      }, () => [
        h("div", {}, [
          (e.value || t.value) && h("div", { class: "fs-4 fw-semibold" }, {
            default: () => t.value && t.value() || e.value
          }),
          (e.title || t.title) && h("div", {}, {
            default: () => t.title && t.title() || e.title
          })
        ]),
        /**
         * @slot Location for action component, ex. `<CDropdown>`.
         */
        t.action && t.action()
      ]),
      /**
       * @slot Location for chart component.
       */
      t.chart && t.chart(),
      t.default && t.default()
    ]);
  }
});
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function Ps(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Hm(e) {
  var t, n;
  return Ps(e) === !1 ? !1 : (t = e.constructor, t === void 0 ? !0 : (n = t.prototype, !(Ps(n) === !1 || n.hasOwnProperty("isPrototypeOf") === !1)));
}
function Hn() {
  return Hn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, Hn.apply(this, arguments);
}
function Pu(e, t) {
  if (e == null)
    return {};
  var n, a, i = {}, r = Object.keys(e);
  for (a = 0; a < r.length; a++)
    t.indexOf(n = r[a]) >= 0 || (i[n] = e[n]);
  return i;
}
const wr = { silent: !1, logLevel: "warn" }, Wm = ["validator"], Mu = Object.prototype, Tu = Mu.toString, Ym = Mu.hasOwnProperty, Au = /^\s*function (\w+)/;
function Ms(e) {
  var t;
  const n = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (n) {
    const a = n.toString().match(Au);
    return a ? a[1] : "";
  }
  return "";
}
const zt = Hm, Lu = (e) => e;
let te = Lu;
process.env.NODE_ENV !== "production" && (te = typeof console < "u" ? function(t, n = wr.logLevel) {
  wr.silent === !1 && console[n](`[VueTypes warn]: ${t}`);
} : Lu);
const sn = (e, t) => Ym.call(e, t), Um = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, ln = Array.isArray || function(e) {
  return Tu.call(e) === "[object Array]";
}, cn = (e) => Tu.call(e) === "[object Function]", Ga = (e, t) => zt(e) && sn(e, "_vueTypes_name") && (!t || e._vueTypes_name === t), $u = (e) => zt(e) && (sn(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((t) => sn(e, t)));
function lo(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function Ut(e, t, n = !1) {
  let a, i = !0, r = "";
  a = zt(e) ? e : { type: e };
  const o = Ga(a) ? a._vueTypes_name + " - " : "";
  if ($u(a) && a.type !== null) {
    if (a.type === void 0 || a.type === !0 || !a.required && t == null)
      return i;
    ln(a.type) ? (i = a.type.some((s) => Ut(s, t, !0) === !0), r = a.type.map((s) => Ms(s)).join(" or ")) : (r = Ms(a), i = r === "Array" ? ln(t) : r === "Object" ? zt(t) : r === "String" || r === "Number" || r === "Boolean" || r === "Function" ? function(s) {
      if (s == null)
        return "";
      const l = s.constructor.toString().match(Au);
      return l ? l[1].replace(/^Async/, "") : "";
    }(t) === r : t instanceof a.type);
  }
  if (!i) {
    const s = `${o}value "${t}" should be of type "${r}"`;
    return n === !1 ? (te(s), !1) : s;
  }
  if (sn(a, "validator") && cn(a.validator)) {
    const s = te, l = [];
    if (te = (c) => {
      l.push(c);
    }, i = a.validator(t), te = s, !i) {
      const c = (l.length > 1 ? "* " : "") + l.join(`
* `);
      return l.length = 0, n === !1 ? (te(c), i) : c;
    }
  }
  return i;
}
function Ce(e, t) {
  const n = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(i) {
    return i === void 0 ? this.type === Boolean || Array.isArray(this.type) && this.type.includes(Boolean) ? void (this.default = void 0) : (sn(this, "default") && delete this.default, this) : cn(i) || Ut(this, i, !0) === !0 ? (this.default = ln(i) ? () => [...i] : zt(i) ? () => Object.assign({}, i) : i, this) : (te(`${this._vueTypes_name} - invalid default value: "${i}"`), this);
  } } }), { validator: a } = n;
  return cn(a) && (n.validator = lo(a, n)), n;
}
function Ke(e, t) {
  const n = Ce(e, t);
  return Object.defineProperty(n, "validate", { value(a) {
    return cn(this.validator) && te(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = lo(a, this), this;
  } });
}
function Ts(e, t, n) {
  const a = function(l) {
    const c = {};
    return Object.getOwnPropertyNames(l).forEach((u) => {
      c[u] = Object.getOwnPropertyDescriptor(l, u);
    }), Object.defineProperties({}, c);
  }(t);
  if (a._vueTypes_name = e, !zt(n))
    return a;
  const { validator: i } = n, r = Pu(n, Wm);
  if (cn(i)) {
    let { validator: l } = a;
    l && (l = (s = (o = l).__original) !== null && s !== void 0 ? s : o), a.validator = lo(l ? function(c) {
      return l.call(this, c) && i.call(this, c);
    } : i, a);
  }
  var o, s;
  return Object.assign(a, r);
}
function mi(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
const qm = () => Ke("any", {}), Gm = () => Ke("function", { type: Function }), As = () => Ke("boolean", { type: Boolean }), Km = () => Ke("string", { type: String }), Xm = () => Ke("number", { type: Number }), Zm = () => Ke("array", { type: Array }), Qm = () => Ke("object", { type: Object }), Jm = () => Ce("integer", { type: Number, validator(e) {
  const t = Um(e);
  return t === !1 && te(`integer - "${e}" is not an integer`), t;
} }), ev = () => Ce("symbol", { validator(e) {
  const t = typeof e == "symbol";
  return t === !1 && te(`symbol - invalid value "${e}"`), t;
} }), tv = () => Object.defineProperty({ type: null, validator(e) {
  const t = e === null;
  return t === !1 && te("nullable - value should be null"), t;
} }, "_vueTypes_name", { value: "nullable" });
function nv(e, t = "custom validation failed") {
  if (typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return Ce(e.name || "<<anonymous function>>", { type: null, validator(n) {
    const a = e(n);
    return a || te(`${this._vueTypes_name} - ${t}`), a;
  } });
}
function av(e) {
  if (!ln(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const t = `oneOf - value should be one of "${e.map((a) => typeof a == "symbol" ? a.toString() : a).join('", "')}".`, n = { validator(a) {
    const i = e.indexOf(a) !== -1;
    return i || te(t), i;
  } };
  if (e.indexOf(null) === -1) {
    const a = e.reduce((i, r) => {
      if (r != null) {
        const o = r.constructor;
        i.indexOf(o) === -1 && i.push(o);
      }
      return i;
    }, []);
    a.length > 0 && (n.type = a);
  }
  return Ce("oneOf", n);
}
function iv(e) {
  if (!ln(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let t = !1, n = !1, a = [];
  for (let r = 0; r < e.length; r += 1) {
    const o = e[r];
    if ($u(o)) {
      if (cn(o.validator) && (t = !0), Ga(o, "oneOf") && o.type) {
        a = a.concat(o.type);
        continue;
      }
      if (Ga(o, "nullable")) {
        n = !0;
        continue;
      }
      if (o.type === !0 || !o.type) {
        te('oneOfType - invalid usage of "true" and "null" as types.');
        continue;
      }
      a = a.concat(o.type);
    } else
      a.push(o);
  }
  a = a.filter((r, o) => a.indexOf(r) === o);
  const i = n === !1 && a.length > 0 ? a : null;
  return Ce("oneOfType", t ? { type: i, validator(r) {
    const o = [], s = e.some((l) => {
      const c = Ut(l, r, !0);
      return typeof c == "string" && o.push(c), c === !0;
    });
    return s || te(`oneOfType - provided value does not match any of the ${o.length} passed-in validators:
${mi(o.join(`
`))}`), s;
  } } : { type: i });
}
function rv(e) {
  return Ce("arrayOf", { type: Array, validator(t) {
    let n = "";
    const a = t.every((i) => (n = Ut(e, i, !0), n === !0));
    return a || te(`arrayOf - value validation error:
${mi(n)}`), a;
  } });
}
function ov(e) {
  return Ce("instanceOf", { type: e });
}
function sv(e) {
  return Ce("objectOf", { type: Object, validator(t) {
    let n = "";
    const a = Object.keys(t).every((i) => (n = Ut(e, t[i], !0), n === !0));
    return a || te(`objectOf - value validation error:
${mi(n)}`), a;
  } });
}
function co(e) {
  const t = Object.keys(e), n = t.filter((i) => {
    var r;
    return !((r = e[i]) === null || r === void 0 || !r.required);
  }), a = Ce("shape", { type: Object, validator(i) {
    if (!zt(i))
      return !1;
    const r = Object.keys(i);
    if (n.length > 0 && n.some((o) => r.indexOf(o) === -1)) {
      const o = n.filter((s) => r.indexOf(s) === -1);
      return te(o.length === 1 ? `shape - required property "${o[0]}" is not defined.` : `shape - required properties "${o.join('", "')}" are not defined.`), !1;
    }
    return r.every((o) => {
      if (t.indexOf(o) === -1)
        return this._vueTypes_isLoose === !0 || (te(`shape - shape definition does not include a "${o}" property. Allowed keys: "${t.join('", "')}".`), !1);
      const s = Ut(e[o], i[o], !0);
      return typeof s == "string" && te(`shape - "${o}" property validation error:
 ${mi(s)}`), s === !0;
    });
  } });
  return Object.defineProperty(a, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(a, "loose", { get() {
    return this._vueTypes_isLoose = !0, this;
  } }), a;
}
const lv = ["name", "validate", "getter"], cv = /* @__PURE__ */ (() => {
  var e;
  return (e = class {
    static get any() {
      return qm();
    }
    static get func() {
      return Gm().def(this.defaults.func);
    }
    static get bool() {
      return this.defaults.bool === void 0 ? As() : As().def(this.defaults.bool);
    }
    static get string() {
      return Km().def(this.defaults.string);
    }
    static get number() {
      return Xm().def(this.defaults.number);
    }
    static get array() {
      return Zm().def(this.defaults.array);
    }
    static get object() {
      return Qm().def(this.defaults.object);
    }
    static get integer() {
      return Jm().def(this.defaults.integer);
    }
    static get symbol() {
      return ev();
    }
    static get nullable() {
      return tv();
    }
    static extend(t) {
      if (te("VueTypes.extend is deprecated. Use the ES6+ method instead. See https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#extending-namespaced-validators-in-es6 for details."), ln(t))
        return t.forEach((l) => this.extend(l)), this;
      const { name: n, validate: a = !1, getter: i = !1 } = t, r = Pu(t, lv);
      if (sn(this, n))
        throw new TypeError(`[VueTypes error]: Type "${n}" already defined`);
      const { type: o } = r;
      if (Ga(o))
        return delete r.type, Object.defineProperty(this, n, i ? { get: () => Ts(n, o, r) } : { value(...l) {
          const c = Ts(n, o, r);
          return c.validator && (c.validator = c.validator.bind(c, ...l)), c;
        } });
      let s;
      return s = i ? { get() {
        const l = Object.assign({}, r);
        return a ? Ke(n, l) : Ce(n, l);
      }, enumerable: !0 } : { value(...l) {
        const c = Object.assign({}, r);
        let u;
        return u = a ? Ke(n, c) : Ce(n, c), c.validator && (u.validator = c.validator.bind(u, ...l)), u;
      }, enumerable: !0 }, Object.defineProperty(this, n, s);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = wr, e.custom = nv, e.oneOf = av, e.instanceOf = ov, e.oneOfType = iv, e.arrayOf = rv, e.objectOf = sv, e.shape = co, e.utils = { validate: (t, n) => Ut(n, t, !0) === !0, toType: (t, n, a = !1) => a ? Ke(t, n) : Ce(t, n) }, e;
})();
function uv(e = { func: () => {
}, bool: !0, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var t;
  return (t = class extends cv {
    static get sensibleDefaults() {
      return Hn({}, this.defaults);
    }
    static set sensibleDefaults(n) {
      this.defaults = n !== !1 ? Hn({}, n !== !0 ? n : e) : {};
    }
  }).defaults = Hn({}, e), t;
}
class TS extends uv() {
}
const dv = S({
  name: "CWidgetStatsB",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Colors have been inverted from their default dark shade.
     */
    inverse: Boolean,
    progress: co({
      /**
       * Sets the color context of the progress bar to one of CoreUI’s themed colors
       *
       * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
       */
      color: q,
      /**
       * The percent to progress the ProgressBar (out of 100).
       */
      value: {
        type: Number,
        default: 0
      }
    }),
    /**
     * Helper text for your component. If you want to pass non-string value please use dedicated slot `<template #text>...</template>`
     */
    text: String,
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  setup(e, { slots: t }) {
    return () => h(Wt, {
      class: [
        {
          "text-high-emphasis-inverse": e.inverse
        }
      ],
      color: e.color
    }, () => h(Yt, {
      class: "card-body"
    }, () => [
      (e.value || t.value) && h("div", {
        class: "fs-4 fw-semibold"
      }, {
        default: () => t.value && t.value() || e.value
      }),
      (e.title || t.title) && h("div", {}, {
        default: () => t.title && t.title() || e.title
      }),
      h(io, {
        class: "my-2",
        ...e.progress && e.progress.color && { color: e.progress.color },
        height: 4,
        ...e.progress && e.progress.value && { value: e.progress.value },
        white: e.inverse
      }),
      (e.text || t.text) && h("small", {
        class: [
          e.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, {
        default: () => t.text && t.text() || e.text
      })
    ]));
  }
}), fv = S({
  name: "CWidgetStatsC",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Colors have been inverted from their default dark shade.
     */
    inverse: Boolean,
    progress: co({
      /**
       * Sets the color context of the progress bar to one of CoreUI’s themed colors
       *
       * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
       */
      color: q,
      /**
       * The percent to progress the ProgressBar (out of 100).
       */
      value: {
        type: Number,
        default: 0
      }
    }),
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for icon component.
   *
   * @slot icon
   */
  setup(e, { slots: t }) {
    return () => h(Wt, {
      class: [
        {
          "text-white": e.inverse
        }
      ],
      color: e.color
    }, () => h(Yt, {
      class: "card-body"
    }, () => [
      t.icon && h("div", {
        class: [
          "text-end mb-4",
          e.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, t.icon && t.icon()),
      (e.value || t.value) && h("div", {
        class: "fs-4 fw-semibold"
      }, {
        default: () => t.value && t.value() || e.value
      }),
      (e.title || t.title) && h("div", {
        class: [
          "text-uppercase fw-semibold small",
          e.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, {
        default: () => t.title && t.title() || e.title
      }),
      h(io, {
        class: "my-2",
        ...e.progress && e.progress.color && { color: e.progress.color },
        height: 4,
        ...e.progress && e.progress.value && { value: e.progress.value },
        white: e.inverse
      })
    ]));
  }
}), hv = S({
  name: "CWidgetStatsD",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Values and titles for your component.
     */
    values: {
      type: Array,
      default: () => []
    }
  },
  /**
   * Location for icon component, ex. `<CDropdown>`.
   *
   * @slot icon
   */
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(e, { slots: t }) {
    return () => h(Wt, {}, {
      default: () => [
        h(Yr, {
          class: [
            "position-relative d-flex justify-content-center align-items-center",
            {
              [`bg-${e.color}`]: e.color
            }
          ]
        }, () => [t.icon && t.icon(), t.chart && t.chart()]),
        h(Yt, {
          class: "row text-center"
        }, {
          default: () => e.values && e.values.map((n, a) => [
            a % 2 !== 0 && h("div", { class: "vr" }),
            h(Vn, {}, {
              default: () => [
                h(Vn, { class: "fs-5 fw-semibold" }, () => n.value),
                h(Vn, { class: "text-uppercase text-medium-emphasis small" }, () => n.title)
              ]
            })
          ])
        })
      ]
    });
  }
}), gv = S({
  name: "CWidgetStatsE",
  props: {
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(e, { slots: t }) {
    return () => h(Wt, {}, () => h(Yt, {
      class: "text-center"
    }, () => [
      (e.title || t.title) && h("div", {
        class: "text-muted small text-uppercase font-weight-bold"
      }, {
        default: () => t.title && t.title() || e.title
      }),
      (e.value || t.value) && h("div", {
        class: "h2 py-3"
      }, {
        default: () => t.value && t.value() || e.value
      }),
      t.chart && t.chart(),
      t.default && t.default()
    ]));
  }
}), mv = S({
  name: "CWidgetStatsF",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: q,
    /**
     * Set padding of your component.
     */
    padding: {
      type: Boolean,
      default: !0
    },
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Helper text for your component. If you want to pass non-string value please use dedicated slot `<template #text>...</template>`
     */
    text: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for icon component.
   *
   * @slot icon
   */
  setup(e, { slots: t }) {
    return () => h(Wt, {}, {
      default: () => [
        h(Yt, {
          class: ["d-flex align-items-center", e.padding === !1 && "p-0"]
        }, () => [
          h("div", {
            class: [
              "me-3",
              "text-white",
              `bg-${e.color}`,
              e.padding ? "p-3" : "p-4"
            ]
          }, t.default && t.default() || t.icon && t.icon()),
          h("div", {}, [
            (e.value || t.value) && h("div", {
              class: [`fs-6 fw-semibold text-${e.color}`]
            }, {
              default: () => t.value && t.value() || e.value
            }),
            (e.title || t.title) && h("div", {
              class: "text-medium-emphasis text-uppercase fw-semibold small"
            }, {
              default: () => t.title && t.title() || e.title
            })
          ])
        ]),
        t.footer && h(Yc, {}, () => t.footer && t.footer())
      ]
    });
  }
}), Ka = S({
  name: "CIcon",
  props: {
    /**
     * Use `:icon="..."` instead of
     *
     * @deprecated since version 3.0
     */
    content: {
      type: [String, Array],
      default: void 0,
      required: !1
    },
    /**
     * Use for replacing default CIcon component classes. Prop is overriding the 'size' prop.
     */
    customClassName: {
      type: [String, Array, Object],
      default: void 0,
      required: !1
    },
    /**
     * Name of the icon placed in React object or SVG content.
     */
    icon: {
      type: [String, Array],
      default: void 0,
      required: !1
    },
    /**
     * Use `icon="..."` instead of
     *
     * @deprecated since version 3.0
     */
    name: {
      type: String,
      default: void 0,
      required: !1
    },
    /**
     * Size of the icon. Available sizes: 'sm', 'lg', 'xl', 'xxl', '3xl...9xl', 'custom', 'custom-size'.
     */
    size: {
      type: String,
      default: void 0,
      required: !1,
      validator: (e) => [
        "custom",
        "custom-size",
        "sm",
        "lg",
        "xl",
        "xxl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl"
      ].includes(e)
    },
    /**
     * Title tag content.
     */
    title: {
      type: String,
      default: void 0,
      required: !1
    },
    /**
     * If defined component will be rendered using 'use' tag.
     */
    use: {
      type: String,
      default: void 0,
      required: !1
    }
  },
  setup(e, { attrs: t }) {
    const n = ae("icons"), a = e.icon || e.content || e.name, i = (g) => g.replace(/([-_][a-z0-9])/gi, (m) => m.toUpperCase()).replace(/-/gi, ""), r = j(() => a && typeof a == "string" ? a.includes("-") ? i(a) : a : ""), o = e.title ? `<title>${e.title}</title>` : "undefined", s = j(() => Array.isArray(a) ? a : typeof a == "string" && r.value && n[r.value] ? n[r.value] : "undefined"), l = Array.isArray(s.value) ? s.value[1] || s.value[0] : s.value, c = Array.isArray(s.value) && s.value.length > 1 ? s.value[0] : "64 64", u = t.viewBox || `0 0 ${c}`, d = () => {
      const g = !e.size && (t.width || t.height);
      return e.size === "custom" || g ? "custom-size" : e.size;
    }, f = [e.customClassName || ["icon", { [`icon-${d()}`]: d() }], t.class];
    return () => e.use ? h("svg", {
      ...t,
      xmlns: "http://www.w3.org/2000/svg",
      class: f,
      role: "img"
    }, h("use", { href: e.use })) : h("svg", {
      ...t,
      xmlns: "http://www.w3.org/2000/svg",
      class: f,
      viewBox: u,
      innerHTML: `${o}${l}`,
      role: "img"
    });
  }
});
/*!
 * Chart.js v3.9.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
function nt() {
}
const vv = /* @__PURE__ */ function() {
  let e = 0;
  return function() {
    return e++;
  };
}();
function V(e) {
  return e === null || typeof e > "u";
}
function K(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function N(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
const ne = (e) => (typeof e == "number" || e instanceof Number) && isFinite(+e);
function Oe(e, t) {
  return ne(e) ? e : t;
}
function F(e, t) {
  return typeof e > "u" ? t : e;
}
const pv = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : e / t, Bu = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function U(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function W(e, t, n, a) {
  let i, r, o;
  if (K(e))
    for (r = e.length, i = 0; i < r; i++)
      t.call(n, e[i], i);
  else if (N(e))
    for (o = Object.keys(e), r = o.length, i = 0; i < r; i++)
      t.call(n, e[o[i]], o[i]);
}
function Xa(e, t) {
  let n, a, i, r;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (i = e[n], r = t[n], i.datasetIndex !== r.datasetIndex || i.index !== r.index)
      return !1;
  return !0;
}
function Za(e) {
  if (K(e))
    return e.map(Za);
  if (N(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let i = 0;
    for (; i < a; ++i)
      t[n[i]] = Za(e[n[i]]);
    return t;
  }
  return e;
}
function Eu(e) {
  return ["__proto__", "prototype", "constructor"].indexOf(e) === -1;
}
function bv(e, t, n, a) {
  if (!Eu(e))
    return;
  const i = t[e], r = n[e];
  N(i) && N(r) ? aa(i, r, a) : t[e] = Za(r);
}
function aa(e, t, n) {
  const a = K(t) ? t : [t], i = a.length;
  if (!N(e))
    return e;
  n = n || {};
  const r = n.merger || bv;
  for (let o = 0; o < i; ++o) {
    if (t = a[o], !N(t))
      continue;
    const s = Object.keys(t);
    for (let l = 0, c = s.length; l < c; ++l)
      r(s[l], e, t, n);
  }
  return e;
}
function Wn(e, t) {
  return aa(e, t, { merger: yv });
}
function yv(e, t, n) {
  if (!Eu(e))
    return;
  const a = t[e], i = n[e];
  N(a) && N(i) ? Wn(a, i) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Za(i));
}
const Ls = {
  "": (e) => e,
  x: (e) => e.x,
  y: (e) => e.y
};
function xt(e, t) {
  return (Ls[t] || (Ls[t] = Cv(t)))(e);
}
function Cv(e) {
  const t = xv(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function xv(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const i of t)
    a += i, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function uo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const $e = (e) => typeof e < "u", _t = (e) => typeof e == "function", $s = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function _v(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Z = Math.PI, Y = 2 * Z, wv = Y + Z, Qa = Number.POSITIVE_INFINITY, Sv = Z / 180, ee = Z / 2, kn = Z / 4, Bs = Z * 2 / 3, De = Math.log10, Xe = Math.sign;
function Es(e) {
  const t = Math.round(e);
  e = Yn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(De(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function kv(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((i, r) => i - r).pop(), t;
}
function un(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
function Yn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Ov(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Iu(e, t, n) {
  let a, i, r;
  for (a = 0, i = e.length; a < i; a++)
    r = e[a][n], isNaN(r) || (t.min = Math.min(t.min, r), t.max = Math.max(t.max, r));
}
function Fe(e) {
  return e * (Z / 180);
}
function fo(e) {
  return e * (180 / Z);
}
function Is(e) {
  if (!ne(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Fu(e, t) {
  const n = t.x - e.x, a = t.y - e.y, i = Math.sqrt(n * n + a * a);
  let r = Math.atan2(a, n);
  return r < -0.5 * Z && (r += Y), {
    angle: r,
    distance: i
  };
}
function Sr(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Dv(e, t) {
  return (e - t + wv) % Y - Z;
}
function ye(e) {
  return (e % Y + Y) % Y;
}
function ia(e, t, n, a) {
  const i = ye(e), r = ye(t), o = ye(n), s = ye(r - i), l = ye(o - i), c = ye(i - r), u = ye(i - o);
  return i === r || i === o || a && r === o || s > l && c < u;
}
function re(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Pv(e) {
  return re(e, -32768, 32767);
}
function st(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function ho(e, t, n) {
  n = n || ((o) => e[o] < t);
  let a = e.length - 1, i = 0, r;
  for (; a - i > 1; )
    r = i + a >> 1, n(r) ? i = r : a = r;
  return { lo: i, hi: a };
}
const lt = (e, t, n, a) => ho(e, n, a ? (i) => e[i][t] <= n : (i) => e[i][t] < n), Mv = (e, t, n) => ho(e, n, (a) => e[a][t] >= n);
function Tv(e, t, n) {
  let a = 0, i = e.length;
  for (; a < i && e[a] < t; )
    a++;
  for (; i > a && e[i - 1] > n; )
    i--;
  return a > 0 || i < e.length ? e.slice(a, i) : e;
}
const Ru = ["push", "pop", "shift", "splice", "unshift"];
function Av(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [t]
    }
  }), Ru.forEach((n) => {
    const a = "_onData" + uo(n), i = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...r) {
        const o = i.apply(this, r);
        return e._chartjs.listeners.forEach((s) => {
          typeof s[a] == "function" && s[a](...r);
        }), o;
      }
    });
  });
}
function Fs(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, i = a.indexOf(t);
  i !== -1 && a.splice(i, 1), !(a.length > 0) && (Ru.forEach((r) => {
    delete e[r];
  }), delete e._chartjs);
}
function Nu(e) {
  const t = /* @__PURE__ */ new Set();
  let n, a;
  for (n = 0, a = e.length; n < a; ++n)
    t.add(e[n]);
  return t.size === a ? e : Array.from(t);
}
const ju = function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
}();
function zu(e, t, n) {
  const a = n || ((o) => Array.prototype.slice.call(o));
  let i = !1, r = [];
  return function(...o) {
    r = a(o), i || (i = !0, ju.call(window, () => {
      i = !1, e.apply(t, r);
    }));
  };
}
function Lv(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const go = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", ce = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, $v = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Vu(e, t, n) {
  const a = t.length;
  let i = 0, r = a;
  if (e._sorted) {
    const { iScale: o, _parsed: s } = e, l = o.axis, { min: c, max: u, minDefined: d, maxDefined: f } = o.getUserBounds();
    d && (i = re(
      Math.min(
        lt(s, o.axis, c).lo,
        n ? a : lt(t, l, o.getPixelForValue(c)).lo
      ),
      0,
      a - 1
    )), f ? r = re(
      Math.max(
        lt(s, o.axis, u, !0).hi + 1,
        n ? 0 : lt(t, l, o.getPixelForValue(u), !0).hi + 1
      ),
      i,
      a
    ) - i : r = a - i;
  }
  return { start: i, count: r };
}
function Hu(e) {
  const { xScale: t, yScale: n, _scaleRanges: a } = e, i = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!a)
    return e._scaleRanges = i, !0;
  const r = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== n.min || a.ymax !== n.max;
  return Object.assign(a, i), r;
}
const _a = (e) => e === 0 || e === 1, Rs = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Y / n)), Ns = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Y / n) + 1, Un = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => -e * (e - 2),
  easeInOutQuad: (e) => (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => (e -= 1) * e * e + 1,
  easeInOutCubic: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
  easeInOutQuart: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
  easeInOutQuint: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
  easeInSine: (e) => -Math.cos(e * ee) + 1,
  easeOutSine: (e) => Math.sin(e * ee),
  easeInOutSine: (e) => -0.5 * (Math.cos(Z * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => _a(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => _a(e) ? e : Rs(e, 0.075, 0.3),
  easeOutElastic: (e) => _a(e) ? e : Ns(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return _a(e) ? e : e < 0.5 ? 0.5 * Rs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Ns(e * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(e) {
    return e * e * ((1.70158 + 1) * e - 1.70158);
  },
  easeOutBack(e) {
    return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
  },
  easeInOutBack(e) {
    let t = 1.70158;
    return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  },
  easeInBounce: (e) => 1 - Un.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Un.easeInBounce(e * 2) * 0.5 : Un.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
/*!
 * @kurkle/color v0.2.1
 * https://github.com/kurkle/color#readme
 * (c) 2022 Jukka Kurkela
 * Released under the MIT License
 */
function da(e) {
  return e + 0.5 | 0;
}
const bt = (e, t, n) => Math.max(Math.min(e, n), t);
function $n(e) {
  return bt(da(e * 2.55), 0, 255);
}
function Ct(e) {
  return bt(da(e * 255), 0, 255);
}
function rt(e) {
  return bt(da(e / 2.55) / 100, 0, 1);
}
function js(e) {
  return bt(da(e * 100), 0, 100);
}
const ke = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, kr = [..."0123456789ABCDEF"], Bv = (e) => kr[e & 15], Ev = (e) => kr[(e & 240) >> 4] + kr[e & 15], wa = (e) => (e & 240) >> 4 === (e & 15), Iv = (e) => wa(e.r) && wa(e.g) && wa(e.b) && wa(e.a);
function Fv(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & ke[e[1]] * 17,
    g: 255 & ke[e[2]] * 17,
    b: 255 & ke[e[3]] * 17,
    a: t === 5 ? ke[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: ke[e[1]] << 4 | ke[e[2]],
    g: ke[e[3]] << 4 | ke[e[4]],
    b: ke[e[5]] << 4 | ke[e[6]],
    a: t === 9 ? ke[e[7]] << 4 | ke[e[8]] : 255
  })), n;
}
const Rv = (e, t) => e < 255 ? t(e) : "";
function Nv(e) {
  var t = Iv(e) ? Bv : Ev;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Rv(e.a, t) : void 0;
}
const jv = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Wu(e, t, n) {
  const a = t * Math.min(n, 1 - n), i = (r, o = (r + e / 30) % 12) => n - a * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [i(0), i(8), i(4)];
}
function zv(e, t, n) {
  const a = (i, r = (i + e / 60) % 6) => n - n * t * Math.max(Math.min(r, 4 - r, 1), 0);
  return [a(5), a(3), a(1)];
}
function Vv(e, t, n) {
  const a = Wu(e, 1, 0.5);
  let i;
  for (t + n > 1 && (i = 1 / (t + n), t *= i, n *= i), i = 0; i < 3; i++)
    a[i] *= 1 - t - n, a[i] += t;
  return a;
}
function Hv(e, t, n, a, i) {
  return e === i ? (t - n) / a + (t < n ? 6 : 0) : t === i ? (n - e) / a + 2 : (e - t) / a + 4;
}
function mo(e) {
  const n = e.r / 255, a = e.g / 255, i = e.b / 255, r = Math.max(n, a, i), o = Math.min(n, a, i), s = (r + o) / 2;
  let l, c, u;
  return r !== o && (u = r - o, c = s > 0.5 ? u / (2 - r - o) : u / (r + o), l = Hv(n, a, i, u, r), l = l * 60 + 0.5), [l | 0, c || 0, s];
}
function vo(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Ct);
}
function po(e, t, n) {
  return vo(Wu, e, t, n);
}
function Wv(e, t, n) {
  return vo(Vv, e, t, n);
}
function Yv(e, t, n) {
  return vo(zv, e, t, n);
}
function Yu(e) {
  return (e % 360 + 360) % 360;
}
function Uv(e) {
  const t = jv.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? $n(+t[5]) : Ct(+t[5]));
  const i = Yu(+t[2]), r = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? a = Wv(i, r, o) : t[1] === "hsv" ? a = Yv(i, r, o) : a = po(i, r, o), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function qv(e, t) {
  var n = mo(e);
  n[0] = Yu(n[0] + t), n = po(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Gv(e) {
  if (!e)
    return;
  const t = mo(e), n = t[0], a = js(t[1]), i = js(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${i}%, ${rt(e.a)})` : `hsl(${n}, ${a}%, ${i}%)`;
}
const zs = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, Vs = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Kv() {
  const e = {}, t = Object.keys(Vs), n = Object.keys(zs);
  let a, i, r, o, s;
  for (a = 0; a < t.length; a++) {
    for (o = s = t[a], i = 0; i < n.length; i++)
      r = n[i], s = s.replace(r, zs[r]);
    r = parseInt(Vs[o], 16), e[s] = [r >> 16 & 255, r >> 8 & 255, r & 255];
  }
  return e;
}
let Sa;
function Xv(e) {
  Sa || (Sa = Kv(), Sa.transparent = [0, 0, 0, 0]);
  const t = Sa[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Zv = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Qv(e) {
  const t = Zv.exec(e);
  let n = 255, a, i, r;
  if (t) {
    if (t[7] !== a) {
      const o = +t[7];
      n = t[8] ? $n(o) : bt(o * 255, 0, 255);
    }
    return a = +t[1], i = +t[3], r = +t[5], a = 255 & (t[2] ? $n(a) : bt(a, 0, 255)), i = 255 & (t[4] ? $n(i) : bt(i, 0, 255)), r = 255 & (t[6] ? $n(r) : bt(r, 0, 255)), {
      r: a,
      g: i,
      b: r,
      a: n
    };
  }
}
function Jv(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${rt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const qi = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Zt = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function e0(e, t, n) {
  const a = Zt(rt(e.r)), i = Zt(rt(e.g)), r = Zt(rt(e.b));
  return {
    r: Ct(qi(a + n * (Zt(rt(t.r)) - a))),
    g: Ct(qi(i + n * (Zt(rt(t.g)) - i))),
    b: Ct(qi(r + n * (Zt(rt(t.b)) - r))),
    a: e.a + n * (t.a - e.a)
  };
}
function ka(e, t, n) {
  if (e) {
    let a = mo(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = po(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Uu(e, t) {
  return e && Object.assign(t || {}, e);
}
function Hs(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Ct(e[3]))) : (t = Uu(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ct(t.a)), t;
}
function t0(e) {
  return e.charAt(0) === "r" ? Qv(e) : Uv(e);
}
class Ja {
  constructor(t) {
    if (t instanceof Ja)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = Hs(t) : n === "string" && (a = Fv(t) || Xv(t) || t0(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Uu(this._rgb);
    return t && (t.a = rt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Hs(t);
  }
  rgbString() {
    return this._valid ? Jv(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Nv(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Gv(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, i = t.rgb;
      let r;
      const o = n === r ? 0.5 : n, s = 2 * o - 1, l = a.a - i.a, c = ((s * l === -1 ? s : (s + l) / (1 + s * l)) + 1) / 2;
      r = 1 - c, a.r = 255 & c * a.r + r * i.r + 0.5, a.g = 255 & c * a.g + r * i.g + 0.5, a.b = 255 & c * a.b + r * i.b + 0.5, a.a = o * a.a + (1 - o) * i.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = e0(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Ja(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ct(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = da(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ka(this._rgb, 2, t), this;
  }
  darken(t) {
    return ka(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ka(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ka(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return qv(this._rgb, t), this;
  }
}
function qu(e) {
  return new Ja(e);
}
function Gu(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ws(e) {
  return Gu(e) ? e : qu(e);
}
function Gi(e) {
  return Gu(e) ? e : qu(e).saturate(0.5).darken(0.1).hexString();
}
const Vt = /* @__PURE__ */ Object.create(null), Or = /* @__PURE__ */ Object.create(null);
function qn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, i = n.length; a < i; ++a) {
    const r = n[a];
    e = e[r] || (e[r] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ki(e, t, n) {
  return typeof t == "string" ? aa(qn(e, t), n) : aa(qn(e, ""), t);
}
class n0 {
  constructor(t) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (n) => n.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (n, a) => Gi(a.backgroundColor), this.hoverBorderColor = (n, a) => Gi(a.borderColor), this.hoverColor = (n, a) => Gi(a.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t);
  }
  set(t, n) {
    return Ki(this, t, n);
  }
  get(t) {
    return qn(this, t);
  }
  describe(t, n) {
    return Ki(Or, t, n);
  }
  override(t, n) {
    return Ki(Vt, t, n);
  }
  route(t, n, a, i) {
    const r = qn(this, t), o = qn(this, a), s = "_" + n;
    Object.defineProperties(r, {
      [s]: {
        value: r[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const l = this[s], c = o[i];
          return N(l) ? Object.assign({}, c, l) : F(l, c);
        },
        set(l) {
          this[s] = l;
        }
      }
    });
  }
}
var R = new n0({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
});
function a0(e) {
  return !e || V(e.size) || V(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function ei(e, t, n, a, i) {
  let r = t[i];
  return r || (r = t[i] = e.measureText(i).width, n.push(i)), r > a && (a = r), a;
}
function i0(e, t, n, a) {
  a = a || {};
  let i = a.data = a.data || {}, r = a.garbageCollect = a.garbageCollect || [];
  a.font !== t && (i = a.data = {}, r = a.garbageCollect = [], a.font = t), e.save(), e.font = t;
  let o = 0;
  const s = n.length;
  let l, c, u, d, f;
  for (l = 0; l < s; l++)
    if (d = n[l], d != null && K(d) !== !0)
      o = ei(e, i, r, o, d);
    else if (K(d))
      for (c = 0, u = d.length; c < u; c++)
        f = d[c], f != null && !K(f) && (o = ei(e, i, r, o, f));
  e.restore();
  const g = r.length / 2;
  if (g > n.length) {
    for (l = 0; l < g; l++)
      delete i[r[l]];
    r.splice(0, g);
  }
  return o;
}
function Mt(e, t, n) {
  const a = e.currentDevicePixelRatio, i = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - i) * a) / a + i;
}
function Ys(e, t) {
  t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore();
}
function Dr(e, t, n, a) {
  Ku(e, t, n, a, null);
}
function Ku(e, t, n, a, i) {
  let r, o, s, l, c, u;
  const d = t.pointStyle, f = t.rotation, g = t.radius;
  let m = (f || 0) * Sv;
  if (d && typeof d == "object" && (r = d.toString(), r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(m), e.drawImage(d, -d.width / 2, -d.height / 2, d.width, d.height), e.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch (e.beginPath(), d) {
      default:
        i ? e.ellipse(n, a, i / 2, g, 0, 0, Y) : e.arc(n, a, g, 0, Y), e.closePath();
        break;
      case "triangle":
        e.moveTo(n + Math.sin(m) * g, a - Math.cos(m) * g), m += Bs, e.lineTo(n + Math.sin(m) * g, a - Math.cos(m) * g), m += Bs, e.lineTo(n + Math.sin(m) * g, a - Math.cos(m) * g), e.closePath();
        break;
      case "rectRounded":
        c = g * 0.516, l = g - c, o = Math.cos(m + kn) * l, s = Math.sin(m + kn) * l, e.arc(n - o, a - s, c, m - Z, m - ee), e.arc(n + s, a - o, c, m - ee, m), e.arc(n + o, a + s, c, m, m + ee), e.arc(n - s, a + o, c, m + ee, m + Z), e.closePath();
        break;
      case "rect":
        if (!f) {
          l = Math.SQRT1_2 * g, u = i ? i / 2 : l, e.rect(n - u, a - l, 2 * u, 2 * l);
          break;
        }
        m += kn;
      case "rectRot":
        o = Math.cos(m) * g, s = Math.sin(m) * g, e.moveTo(n - o, a - s), e.lineTo(n + s, a - o), e.lineTo(n + o, a + s), e.lineTo(n - s, a + o), e.closePath();
        break;
      case "crossRot":
        m += kn;
      case "cross":
        o = Math.cos(m) * g, s = Math.sin(m) * g, e.moveTo(n - o, a - s), e.lineTo(n + o, a + s), e.moveTo(n + s, a - o), e.lineTo(n - s, a + o);
        break;
      case "star":
        o = Math.cos(m) * g, s = Math.sin(m) * g, e.moveTo(n - o, a - s), e.lineTo(n + o, a + s), e.moveTo(n + s, a - o), e.lineTo(n - s, a + o), m += kn, o = Math.cos(m) * g, s = Math.sin(m) * g, e.moveTo(n - o, a - s), e.lineTo(n + o, a + s), e.moveTo(n + s, a - o), e.lineTo(n - s, a + o);
        break;
      case "line":
        o = i ? i / 2 : Math.cos(m) * g, s = Math.sin(m) * g, e.moveTo(n - o, a - s), e.lineTo(n + o, a + s);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(m) * g, a + Math.sin(m) * g);
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function ra(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function vi(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function pi(e) {
  e.restore();
}
function r0(e, t, n, a, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (i === "middle") {
    const r = (t.x + n.x) / 2;
    e.lineTo(r, t.y), e.lineTo(r, n.y);
  } else
    i === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function o0(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(
    a ? t.cp1x : t.cp2x,
    a ? t.cp1y : t.cp2y,
    a ? n.cp2x : n.cp1x,
    a ? n.cp2y : n.cp1y,
    n.x,
    n.y
  );
}
function Ht(e, t, n, a, i, r = {}) {
  const o = K(t) ? t : [t], s = r.strokeWidth > 0 && r.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = i.string, s0(e, r), l = 0; l < o.length; ++l)
    c = o[l], s && (r.strokeColor && (e.strokeStyle = r.strokeColor), V(r.strokeWidth) || (e.lineWidth = r.strokeWidth), e.strokeText(c, n, a, r.maxWidth)), e.fillText(c, n, a, r.maxWidth), l0(e, n, a, c, r), a += i.lineHeight;
  e.restore();
}
function s0(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), V(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function l0(e, t, n, a, i) {
  if (i.strikethrough || i.underline) {
    const r = e.measureText(a), o = t - r.actualBoundingBoxLeft, s = t + r.actualBoundingBoxRight, l = n - r.actualBoundingBoxAscent, c = n + r.actualBoundingBoxDescent, u = i.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = i.decorationWidth || 2, e.moveTo(o, u), e.lineTo(s, u), e.stroke();
  }
}
function oa(e, t) {
  const { x: n, y: a, w: i, h: r, radius: o } = t;
  e.arc(n + o.topLeft, a + o.topLeft, o.topLeft, -ee, Z, !0), e.lineTo(n, a + r - o.bottomLeft), e.arc(n + o.bottomLeft, a + r - o.bottomLeft, o.bottomLeft, Z, ee, !0), e.lineTo(n + i - o.bottomRight, a + r), e.arc(n + i - o.bottomRight, a + r - o.bottomRight, o.bottomRight, ee, 0, !0), e.lineTo(n + i, a + o.topRight), e.arc(n + i - o.topRight, a + o.topRight, o.topRight, 0, -ee, !0), e.lineTo(n + o.topLeft, a);
}
const c0 = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/), u0 = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
function d0(e, t) {
  const n = ("" + e).match(c0);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const f0 = (e) => +e || 0;
function bo(e, t) {
  const n = {}, a = N(t), i = a ? Object.keys(t) : t, r = N(e) ? a ? (o) => F(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of i)
    n[o] = f0(r(o));
  return n;
}
function Xu(e) {
  return bo(e, { top: "y", right: "x", bottom: "y", left: "x" });
}
function Ft(e) {
  return bo(e, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
}
function fe(e) {
  const t = Xu(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function ie(e, t) {
  e = e || {}, t = t || R.font;
  let n = F(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = F(e.style, t.style);
  a && !("" + a).match(u0) && (console.warn('Invalid font style specified: "' + a + '"'), a = "");
  const i = {
    family: F(e.family, t.family),
    lineHeight: d0(F(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: F(e.weight, t.weight),
    string: ""
  };
  return i.string = a0(i), i;
}
function Bn(e, t, n, a) {
  let i, r, o;
  for (i = 0, r = e.length; i < r; ++i)
    if (o = e[i], o !== void 0 && o !== void 0)
      return o;
}
function h0(e, t, n) {
  const { min: a, max: i } = e, r = Bu(t, (i - a) / 2), o = (s, l) => n && s === 0 ? 0 : s + l;
  return {
    min: o(a, -Math.abs(r)),
    max: o(i, r)
  };
}
function St(e, t) {
  return Object.assign(Object.create(e), t);
}
function yo(e, t = [""], n = e, a, i = () => e[0]) {
  $e(a) || (a = ed("_fallback", e));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: n,
    _fallback: a,
    _getTarget: i,
    override: (o) => yo([o, ...e], t, n, a)
  };
  return new Proxy(r, {
    deleteProperty(o, s) {
      return delete o[s], delete o._keys, delete e[0][s], !0;
    },
    get(o, s) {
      return Qu(
        o,
        s,
        () => x0(s, t, e, o)
      );
    },
    getOwnPropertyDescriptor(o, s) {
      return Reflect.getOwnPropertyDescriptor(o._scopes[0], s);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    has(o, s) {
      return qs(o).includes(s);
    },
    ownKeys(o) {
      return qs(o);
    },
    set(o, s, l) {
      const c = o._storage || (o._storage = i());
      return o[s] = c[s] = l, delete o._keys, !0;
    }
  });
}
function dn(e, t, n, a) {
  const i = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Zu(e, a),
    setContext: (r) => dn(e, r, n, a),
    override: (r) => dn(e.override(r), t, n, a)
  };
  return new Proxy(i, {
    deleteProperty(r, o) {
      return delete r[o], delete e[o], !0;
    },
    get(r, o, s) {
      return Qu(
        r,
        o,
        () => m0(r, o, s)
      );
    },
    getOwnPropertyDescriptor(r, o) {
      return r._descriptors.allKeys ? Reflect.has(e, o) ? { enumerable: !0, configurable: !0 } : void 0 : Reflect.getOwnPropertyDescriptor(e, o);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    has(r, o) {
      return Reflect.has(e, o);
    },
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    set(r, o, s) {
      return e[o] = s, delete r[o], !0;
    }
  });
}
function Zu(e, t = { scriptable: !0, indexable: !0 }) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: i = t.allKeys } = e;
  return {
    allKeys: i,
    scriptable: n,
    indexable: a,
    isScriptable: _t(n) ? n : () => n,
    isIndexable: _t(a) ? a : () => a
  };
}
const g0 = (e, t) => e ? e + uo(t) : t, Co = (e, t) => N(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Qu(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t))
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function m0(e, t, n) {
  const { _proxy: a, _context: i, _subProxy: r, _descriptors: o } = e;
  let s = a[t];
  return _t(s) && o.isScriptable(t) && (s = v0(t, s, e, n)), K(s) && s.length && (s = p0(t, s, e, o.isIndexable)), Co(t, s) && (s = dn(s, i, r && r[t], o)), s;
}
function v0(e, t, n, a) {
  const { _proxy: i, _context: r, _subProxy: o, _stack: s } = n;
  if (s.has(e))
    throw new Error("Recursion detected: " + Array.from(s).join("->") + "->" + e);
  return s.add(e), t = t(r, o || a), s.delete(e), Co(e, t) && (t = xo(i._scopes, i, e, t)), t;
}
function p0(e, t, n, a) {
  const { _proxy: i, _context: r, _subProxy: o, _descriptors: s } = n;
  if ($e(r.index) && a(e))
    t = t[r.index % t.length];
  else if (N(t[0])) {
    const l = t, c = i._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const d = xo(c, i, e, u);
      t.push(dn(d, r, o && o[e], s));
    }
  }
  return t;
}
function Ju(e, t, n) {
  return _t(e) ? e(t, n) : e;
}
const b0 = (e, t) => e === !0 ? t : typeof e == "string" ? xt(t, e) : void 0;
function y0(e, t, n, a, i) {
  for (const r of t) {
    const o = b0(n, r);
    if (o) {
      e.add(o);
      const s = Ju(o._fallback, n, i);
      if ($e(s) && s !== n && s !== a)
        return s;
    } else if (o === !1 && $e(a) && n !== a)
      return null;
  }
  return !1;
}
function xo(e, t, n, a) {
  const i = t._rootScopes, r = Ju(t._fallback, n, a), o = [...e, ...i], s = /* @__PURE__ */ new Set();
  s.add(a);
  let l = Us(s, o, n, r || n, a);
  return l === null || $e(r) && r !== n && (l = Us(s, o, r, l, a), l === null) ? !1 : yo(
    Array.from(s),
    [""],
    i,
    r,
    () => C0(t, n, a)
  );
}
function Us(e, t, n, a, i) {
  for (; n; )
    n = y0(e, t, n, a, i);
  return n;
}
function C0(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const i = a[t];
  return K(i) && N(n) ? n : i;
}
function x0(e, t, n, a) {
  let i;
  for (const r of t)
    if (i = ed(g0(r, e), n), $e(i))
      return Co(e, i) ? xo(n, a, e, i) : i;
}
function ed(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if ($e(a))
      return a;
  }
}
function qs(e) {
  let t = e._keys;
  return t || (t = e._keys = _0(e._scopes)), t;
}
function _0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((i) => !i.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
function td(e, t, n, a) {
  const { iScale: i } = e, { key: r = "r" } = this._parsing, o = new Array(a);
  let s, l, c, u;
  for (s = 0, l = a; s < l; ++s)
    c = s + n, u = t[c], o[s] = {
      r: i.parse(xt(u, r), c)
    };
  return o;
}
const w0 = Number.EPSILON || 1e-14, fn = (e, t) => t < e.length && !e[t].skip && e[t], nd = (e) => e === "x" ? "y" : "x";
function S0(e, t, n, a) {
  const i = e.skip ? t : e, r = t, o = n.skip ? t : n, s = Sr(r, i), l = Sr(o, r);
  let c = s / (s + l), u = l / (s + l);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const d = a * c, f = a * u;
  return {
    previous: {
      x: r.x - d * (o.x - i.x),
      y: r.y - d * (o.y - i.y)
    },
    next: {
      x: r.x + f * (o.x - i.x),
      y: r.y + f * (o.y - i.y)
    }
  };
}
function k0(e, t, n) {
  const a = e.length;
  let i, r, o, s, l, c = fn(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (l = c, c = fn(e, u + 1), !(!l || !c)) {
      if (Yn(t[u], 0, w0)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      i = n[u] / t[u], r = n[u + 1] / t[u], s = Math.pow(i, 2) + Math.pow(r, 2), !(s <= 9) && (o = 3 / Math.sqrt(s), n[u] = i * o * t[u], n[u + 1] = r * o * t[u]);
    }
}
function O0(e, t, n = "x") {
  const a = nd(n), i = e.length;
  let r, o, s, l = fn(e, 0);
  for (let c = 0; c < i; ++c) {
    if (o = s, s = l, l = fn(e, c + 1), !s)
      continue;
    const u = s[n], d = s[a];
    o && (r = (u - o[n]) / 3, s[`cp1${n}`] = u - r, s[`cp1${a}`] = d - r * t[c]), l && (r = (l[n] - u) / 3, s[`cp2${n}`] = u + r, s[`cp2${a}`] = d + r * t[c]);
  }
}
function D0(e, t = "x") {
  const n = nd(t), a = e.length, i = Array(a).fill(0), r = Array(a);
  let o, s, l, c = fn(e, 0);
  for (o = 0; o < a; ++o)
    if (s = l, l = c, c = fn(e, o + 1), !!l) {
      if (c) {
        const u = c[t] - l[t];
        i[o] = u !== 0 ? (c[n] - l[n]) / u : 0;
      }
      r[o] = s ? c ? Xe(i[o - 1]) !== Xe(i[o]) ? 0 : (i[o - 1] + i[o]) / 2 : i[o - 1] : i[o];
    }
  k0(e, i, r), O0(e, r, t);
}
function Oa(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function P0(e, t) {
  let n, a, i, r, o, s = ra(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    o = r, r = s, s = n < a - 1 && ra(e[n + 1], t), r && (i = e[n], o && (i.cp1x = Oa(i.cp1x, t.left, t.right), i.cp1y = Oa(i.cp1y, t.top, t.bottom)), s && (i.cp2x = Oa(i.cp2x, t.left, t.right), i.cp2y = Oa(i.cp2y, t.top, t.bottom)));
}
function M0(e, t, n, a, i) {
  let r, o, s, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    D0(e, i);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (r = 0, o = e.length; r < o; ++r)
      s = e[r], l = S0(
        c,
        s,
        e[Math.min(r + 1, o - (a ? 0 : 1)) % o],
        t.tension
      ), s.cp1x = l.previous.x, s.cp1y = l.previous.y, s.cp2x = l.next.x, s.cp2y = l.next.y, c = s;
  }
  t.capBezierPoints && P0(e, n);
}
function ad() {
  return typeof window < "u" && typeof document < "u";
}
function _o(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ti(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const bi = (e) => window.getComputedStyle(e, null);
function T0(e, t) {
  return bi(e).getPropertyValue(t);
}
const A0 = ["top", "right", "bottom", "left"];
function Rt(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let i = 0; i < 4; i++) {
    const r = A0[i];
    a[r] = parseFloat(e[t + "-" + r + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const L0 = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function $0(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: i, offsetY: r } = a;
  let o = !1, s, l;
  if (L0(i, r, e.target))
    s = i, l = r;
  else {
    const c = t.getBoundingClientRect();
    s = a.clientX - c.left, l = a.clientY - c.top, o = !0;
  }
  return { x: s, y: l, box: o };
}
function Lt(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, i = bi(n), r = i.boxSizing === "border-box", o = Rt(i, "padding"), s = Rt(i, "border", "width"), { x: l, y: c, box: u } = $0(e, n), d = o.left + (u && s.left), f = o.top + (u && s.top);
  let { width: g, height: m } = t;
  return r && (g -= o.width + s.width, m -= o.height + s.height), {
    x: Math.round((l - d) / g * n.width / a),
    y: Math.round((c - f) / m * n.height / a)
  };
}
function B0(e, t, n) {
  let a, i;
  if (t === void 0 || n === void 0) {
    const r = _o(e);
    if (!r)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const o = r.getBoundingClientRect(), s = bi(r), l = Rt(s, "border", "width"), c = Rt(s, "padding");
      t = o.width - c.width - l.width, n = o.height - c.height - l.height, a = ti(s.maxWidth, r, "clientWidth"), i = ti(s.maxHeight, r, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || Qa,
    maxHeight: i || Qa
  };
}
const Xi = (e) => Math.round(e * 10) / 10;
function E0(e, t, n, a) {
  const i = bi(e), r = Rt(i, "margin"), o = ti(i.maxWidth, e, "clientWidth") || Qa, s = ti(i.maxHeight, e, "clientHeight") || Qa, l = B0(e, t, n);
  let { width: c, height: u } = l;
  if (i.boxSizing === "content-box") {
    const d = Rt(i, "border", "width"), f = Rt(i, "padding");
    c -= f.width + d.width, u -= f.height + d.height;
  }
  return c = Math.max(0, c - r.width), u = Math.max(0, a ? Math.floor(c / a) : u - r.height), c = Xi(Math.min(c, o, l.maxWidth)), u = Xi(Math.min(u, s, l.maxHeight)), c && !u && (u = Xi(c / 2)), {
    width: c,
    height: u
  };
}
function Gs(e, t, n) {
  const a = t || 1, i = Math.floor(e.height * a), r = Math.floor(e.width * a);
  e.height = i / a, e.width = r / a;
  const o = e.canvas;
  return o.style && (n || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || o.height !== i || o.width !== r ? (e.currentDevicePixelRatio = a, o.height = i, o.width = r, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const I0 = function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
  } catch {
  }
  return e;
}();
function Ks(e, t) {
  const n = T0(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function $t(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function F0(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function R0(e, t, n, a) {
  const i = { x: e.cp2x, y: e.cp2y }, r = { x: t.cp1x, y: t.cp1y }, o = $t(e, i, n), s = $t(i, r, n), l = $t(r, t, n), c = $t(o, s, n), u = $t(s, l, n);
  return $t(c, u, n);
}
const Xs = /* @__PURE__ */ new Map();
function N0(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = Xs.get(n);
  return a || (a = new Intl.NumberFormat(e, t), Xs.set(n, a)), a;
}
function fa(e, t, n) {
  return N0(t, n).format(e);
}
const j0 = function(e, t) {
  return {
    x(n) {
      return e + e + t - n;
    },
    setWidth(n) {
      t = n;
    },
    textAlign(n) {
      return n === "center" ? n : n === "right" ? "left" : "right";
    },
    xPlus(n, a) {
      return n - a;
    },
    leftForLtr(n, a) {
      return n - a;
    }
  };
}, z0 = function() {
  return {
    x(e) {
      return e;
    },
    setWidth(e) {
    },
    textAlign(e) {
      return e;
    },
    xPlus(e, t) {
      return e + t;
    },
    leftForLtr(e, t) {
      return e;
    }
  };
};
function tn(e, t, n) {
  return e ? j0(t, n) : z0();
}
function id(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function rd(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function od(e) {
  return e === "angle" ? {
    between: ia,
    compare: Dv,
    normalize: ye
  } : {
    between: st,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Zs({ start: e, end: t, count: n, loop: a, style: i }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: i
  };
}
function V0(e, t, n) {
  const { property: a, start: i, end: r } = n, { between: o, normalize: s } = od(a), l = t.length;
  let { start: c, end: u, loop: d } = e, f, g;
  if (d) {
    for (c += l, u += l, f = 0, g = l; f < g && o(s(t[c % l][a]), i, r); ++f)
      c--, u--;
    c %= l, u %= l;
  }
  return u < c && (u += l), { start: c, end: u, loop: d, style: e.style };
}
function sd(e, t, n) {
  if (!n)
    return [e];
  const { property: a, start: i, end: r } = n, o = t.length, { compare: s, between: l, normalize: c } = od(a), { start: u, end: d, loop: f, style: g } = V0(e, t, n), m = [];
  let v = !1, p = null, b, y, w;
  const x = () => l(i, w, b) && s(i, w) !== 0, C = () => s(r, b) === 0 || l(r, w, b), k = () => v || x(), M = () => !v || C();
  for (let L = u, A = u; L <= d; ++L)
    y = t[L % o], !y.skip && (b = c(y[a]), b !== w && (v = l(b, i, r), p === null && k() && (p = s(b, i) === 0 ? L : A), p !== null && M() && (m.push(Zs({ start: p, end: L, loop: f, count: o, style: g })), p = null), A = L, w = b));
  return p !== null && m.push(Zs({ start: p, end: d, loop: f, count: o, style: g })), m;
}
function ld(e, t) {
  const n = [], a = e.segments;
  for (let i = 0; i < a.length; i++) {
    const r = sd(a[i], e.points, t);
    r.length && n.push(...r);
  }
  return n;
}
function H0(e, t, n, a) {
  let i = 0, r = t - 1;
  if (n && !a)
    for (; i < t && !e[i].skip; )
      i++;
  for (; i < t && e[i].skip; )
    i++;
  for (i %= t, n && (r += i); r > i && e[r % t].skip; )
    r--;
  return r %= t, { start: i, end: r };
}
function W0(e, t, n, a) {
  const i = e.length, r = [];
  let o = t, s = e[t], l;
  for (l = t + 1; l <= n; ++l) {
    const c = e[l % i];
    c.skip || c.stop ? s.skip || (a = !1, r.push({ start: t % i, end: (l - 1) % i, loop: a }), t = o = c.stop ? l : null) : (o = l, s.skip && (t = l)), s = c;
  }
  return o !== null && r.push({ start: t % i, end: o % i, loop: a }), r;
}
function Y0(e, t) {
  const n = e.points, a = e.options.spanGaps, i = n.length;
  if (!i)
    return [];
  const r = !!e._loop, { start: o, end: s } = H0(n, i, r, a);
  if (a === !0)
    return Qs(e, [{ start: o, end: s, loop: r }], n, t);
  const l = s < o ? s + i : s, c = !!e._fullLoop && o === 0 && s === i - 1;
  return Qs(e, W0(n, o, l, c), n, t);
}
function Qs(e, t, n, a) {
  return !a || !a.setContext || !n ? t : U0(e, t, n, a);
}
function U0(e, t, n, a) {
  const i = e._chart.getContext(), r = Js(e.options), { _datasetIndex: o, options: { spanGaps: s } } = e, l = n.length, c = [];
  let u = r, d = t[0].start, f = d;
  function g(m, v, p, b) {
    const y = s ? -1 : 1;
    if (m !== v) {
      for (m += l; n[m % l].skip; )
        m -= y;
      for (; n[v % l].skip; )
        v += y;
      m % l !== v % l && (c.push({ start: m % l, end: v % l, loop: p, style: b }), u = b, d = v % l);
    }
  }
  for (const m of t) {
    d = s ? d : m.start;
    let v = n[d % l], p;
    for (f = d + 1; f <= m.end; f++) {
      const b = n[f % l];
      p = Js(a.setContext(St(i, {
        type: "segment",
        p0: v,
        p1: b,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: o
      }))), q0(p, u) && g(d, f - 1, m.loop, u), v = b, u = p;
    }
    d < f - 1 && g(d, f - 1, m.loop, u);
  }
  return c;
}
function Js(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor
  };
}
function q0(e, t) {
  return t && JSON.stringify(e) !== JSON.stringify(t);
}
/*!
 * Chart.js v3.9.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
class G0 {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, a, i) {
    const r = n.listeners[i], o = n.duration;
    r.forEach((s) => s({
      chart: t,
      initial: n.initial,
      numSteps: o,
      currentStep: Math.min(a - n.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = ju.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, i) => {
      if (!a.running || !a.items.length)
        return;
      const r = a.items;
      let o = r.length - 1, s = !1, l;
      for (; o >= 0; --o)
        l = r[o], l._active ? (l._total > a.duration && (a.duration = l._total), l.tick(t), s = !0) : (r[o] = r[r.length - 1], r.pop());
      s && (i.draw(), this._notify(i, a, t, "progress")), r.length || (a.running = !1, this._notify(i, a, t, "complete"), a.initial = !1), n += r.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let a = n.get(t);
    return a || (a = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, a)), a;
  }
  listen(t, n, a) {
    this._getAnims(t).listeners[n].push(a);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((a, i) => Math.max(a, i._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const a = n.items;
    let i = a.length - 1;
    for (; i >= 0; --i)
      a[i].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var at = new G0();
const el = "transparent", K0 = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Ws(e || el), i = a.valid && Ws(t || el);
    return i && i.valid ? i.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class X0 {
  constructor(t, n, a, i) {
    const r = n[a];
    i = Bn([t.to, i, r, t.from]);
    const o = Bn([t.from, r, i]);
    this._active = !0, this._fn = t.fn || K0[t.type || typeof o], this._easing = Un[t.easing] || Un.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = o, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], r = a - this._start, o = this._duration - r;
      this._start = a, this._duration = Math.floor(Math.max(o, t.duration)), this._total += r, this._loop = !!t.loop, this._to = Bn([t.to, n, i, t.from]), this._from = Bn([t.from, i, n]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, a = this._duration, i = this._prop, r = this._from, o = this._loop, s = this._to;
    let l;
    if (this._active = r !== s && (o || n < a), !this._active) {
      this._target[i] = s, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[i] = r;
      return;
    }
    l = n / a % 2, l = o && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[i] = this._fn(r, s, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, a) => {
      t.push({ res: n, rej: a });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", a = this._promises || [];
    for (let i = 0; i < a.length; i++)
      a[i][n]();
  }
}
const Z0 = ["x", "y", "borderWidth", "radius", "tension"], Q0 = ["color", "borderColor", "backgroundColor"];
R.set("animation", {
  delay: void 0,
  duration: 1e3,
  easing: "easeOutQuart",
  fn: void 0,
  from: void 0,
  loop: void 0,
  to: void 0,
  type: void 0
});
const J0 = Object.keys(R.animation);
R.describe("animation", {
  _fallback: !1,
  _indexable: !1,
  _scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn"
});
R.set("animations", {
  colors: {
    type: "color",
    properties: Q0
  },
  numbers: {
    type: "number",
    properties: Z0
  }
});
R.describe("animations", {
  _fallback: "animation"
});
R.set("transitions", {
  active: {
    animation: {
      duration: 400
    }
  },
  resize: {
    animation: {
      duration: 0
    }
  },
  show: {
    animations: {
      colors: {
        from: "transparent"
      },
      visible: {
        type: "boolean",
        duration: 0
      }
    }
  },
  hide: {
    animations: {
      colors: {
        to: "transparent"
      },
      visible: {
        type: "boolean",
        easing: "linear",
        fn: (e) => e | 0
      }
    }
  }
});
class cd {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!N(t))
      return;
    const n = this._properties;
    Object.getOwnPropertyNames(t).forEach((a) => {
      const i = t[a];
      if (!N(i))
        return;
      const r = {};
      for (const o of J0)
        r[o] = i[o];
      (K(i.properties) && i.properties || [a]).forEach((o) => {
        (o === a || !n.has(o)) && n.set(o, r);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, i = tp(t, a);
    if (!i)
      return [];
    const r = this._createAnimations(i, a);
    return a.$shared && ep(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), r;
  }
  _createAnimations(t, n) {
    const a = this._properties, i = [], r = t.$animations || (t.$animations = {}), o = Object.keys(n), s = Date.now();
    let l;
    for (l = o.length - 1; l >= 0; --l) {
      const c = o[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        i.push(...this._animateOptions(t, n));
        continue;
      }
      const u = n[c];
      let d = r[c];
      const f = a.get(c);
      if (d)
        if (f && d.active()) {
          d.update(f, u, s);
          continue;
        } else
          d.cancel();
      if (!f || !f.duration) {
        t[c] = u;
        continue;
      }
      r[c] = d = new X0(f, t, c, u), i.push(d);
    }
    return i;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const a = this._createAnimations(t, n);
    if (a.length)
      return at.add(this._chart, a), !0;
  }
}
function ep(e, t) {
  const n = [], a = Object.keys(t);
  for (let i = 0; i < a.length; i++) {
    const r = e[a[i]];
    r && r.active() && n.push(r.wait());
  }
  return Promise.all(n);
}
function tp(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, { $shared: !1, $animations: {} })), n;
}
function tl(e, t) {
  const n = e && e.options || {}, a = n.reverse, i = n.min === void 0 ? t : 0, r = n.max === void 0 ? t : 0;
  return {
    start: a ? r : i,
    end: a ? i : r
  };
}
function np(e, t, n) {
  if (n === !1)
    return !1;
  const a = tl(e, n), i = tl(t, n);
  return {
    top: i.end,
    right: a.end,
    bottom: i.start,
    left: a.start
  };
}
function ap(e) {
  let t, n, a, i;
  return N(e) ? (t = e.top, n = e.right, a = e.bottom, i = e.left) : t = n = a = i = e, {
    top: t,
    right: n,
    bottom: a,
    left: i,
    disabled: e === !1
  };
}
function ud(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let i, r;
  for (i = 0, r = a.length; i < r; ++i)
    n.push(a[i].index);
  return n;
}
function nl(e, t, n, a = {}) {
  const i = e.keys, r = a.mode === "single";
  let o, s, l, c;
  if (t !== null) {
    for (o = 0, s = i.length; o < s; ++o) {
      if (l = +i[o], l === n) {
        if (a.all)
          continue;
        break;
      }
      c = e.values[l], ne(c) && (r || t === 0 || Xe(t) === Xe(c)) && (t += c);
    }
    return t;
  }
}
function ip(e) {
  const t = Object.keys(e), n = new Array(t.length);
  let a, i, r;
  for (a = 0, i = t.length; a < i; ++a)
    r = t[a], n[a] = {
      x: r,
      y: e[r]
    };
  return n;
}
function al(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function rp(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function op(e) {
  const { min: t, max: n, minDefined: a, maxDefined: i } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: i ? n : Number.POSITIVE_INFINITY
  };
}
function sp(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function il(e, t, n, a) {
  for (const i of t.getMatchingVisibleMetas(a).reverse()) {
    const r = e[i.index];
    if (n && r > 0 || !n && r < 0)
      return i.index;
  }
  return null;
}
function rl(e, t) {
  const { chart: n, _cachedMeta: a } = e, i = n._stacks || (n._stacks = {}), { iScale: r, vScale: o, index: s } = a, l = r.axis, c = o.axis, u = rp(r, o, a), d = t.length;
  let f;
  for (let g = 0; g < d; ++g) {
    const m = t[g], { [l]: v, [c]: p } = m, b = m._stacks || (m._stacks = {});
    f = b[c] = sp(i, u, v), f[s] = p, f._top = il(f, o, !0, a.type), f._bottom = il(f, o, !1, a.type);
  }
}
function Zi(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function lp(e, t) {
  return St(
    e,
    {
      active: !1,
      dataset: void 0,
      datasetIndex: t,
      index: t,
      mode: "default",
      type: "dataset"
    }
  );
}
function cp(e, t, n) {
  return St(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function On(e, t) {
  const n = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const i of t) {
      const r = i._stacks;
      if (!r || r[a] === void 0 || r[a][n] === void 0)
        return;
      delete r[a][n];
    }
  }
}
const Qi = (e) => e === "reset" || e === "none", ol = (e, t) => t ? e : Object.assign({}, e), up = (e, t, n) => e && !t.hidden && t._stacked && { keys: ud(n, !0), values: null };
class je {
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = al(t.vScale, t), this.addElements();
  }
  updateIndex(t) {
    this.index !== t && On(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), i = (d, f, g, m) => d === "x" ? f : d === "r" ? m : g, r = n.xAxisID = F(a.xAxisID, Zi(t, "x")), o = n.yAxisID = F(a.yAxisID, Zi(t, "y")), s = n.rAxisID = F(a.rAxisID, Zi(t, "r")), l = n.indexAxis, c = n.iAxisID = i(l, r, o, s), u = n.vAxisID = i(l, o, r, s);
    n.xScale = this.getScaleForId(r), n.yScale = this.getScaleForId(o), n.rScale = this.getScaleForId(s), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(u);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Fs(this._data, this), t._stacked && On(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (N(n))
      this._data = ip(n);
    else if (a !== n) {
      if (a) {
        Fs(a, this);
        const i = this._cachedMeta;
        On(i), i._parsed = [];
      }
      n && Object.isExtensible(n) && Av(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, a = this.getDataset();
    let i = !1;
    this._dataCheck();
    const r = n._stacked;
    n._stacked = al(n.vScale, n), n.stack !== a.stack && (i = !0, On(n), n.stack = a.stack), this._resyncElements(t), (i || r !== n._stacked) && rl(this, n._parsed);
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: i } = this, { iScale: r, _stacked: o } = a, s = r.axis;
    let l = t === 0 && n === i.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], u, d, f;
    if (this._parsing === !1)
      a._parsed = i, a._sorted = !0, f = i;
    else {
      K(i[t]) ? f = this.parseArrayData(a, i, t, n) : N(i[t]) ? f = this.parseObjectData(a, i, t, n) : f = this.parsePrimitiveData(a, i, t, n);
      const g = () => d[s] === null || c && d[s] < c[s];
      for (u = 0; u < n; ++u)
        a._parsed[u + t] = d = f[u], l && (g() && (l = !1), c = d);
      a._sorted = l;
    }
    o && rl(this, f);
  }
  parsePrimitiveData(t, n, a, i) {
    const { iScale: r, vScale: o } = t, s = r.axis, l = o.axis, c = r.getLabels(), u = r === o, d = new Array(i);
    let f, g, m;
    for (f = 0, g = i; f < g; ++f)
      m = f + a, d[f] = {
        [s]: u || r.parse(c[m], m),
        [l]: o.parse(n[m], m)
      };
    return d;
  }
  parseArrayData(t, n, a, i) {
    const { xScale: r, yScale: o } = t, s = new Array(i);
    let l, c, u, d;
    for (l = 0, c = i; l < c; ++l)
      u = l + a, d = n[u], s[l] = {
        x: r.parse(d[0], u),
        y: o.parse(d[1], u)
      };
    return s;
  }
  parseObjectData(t, n, a, i) {
    const { xScale: r, yScale: o } = t, { xAxisKey: s = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(i);
    let u, d, f, g;
    for (u = 0, d = i; u < d; ++u)
      f = u + a, g = n[f], c[u] = {
        x: r.parse(xt(g, s), f),
        y: o.parse(xt(g, l), f)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, a) {
    const i = this.chart, r = this._cachedMeta, o = n[t.axis], s = {
      keys: ud(i, !0),
      values: n._stacks[t.axis]
    };
    return nl(s, o, r.index, { mode: a });
  }
  updateRangeFromParsed(t, n, a, i) {
    const r = a[n.axis];
    let o = r === null ? NaN : r;
    const s = i && a._stacks[n.axis];
    i && s && (i.values = s, o = nl(i, r, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, i = a._parsed, r = a._sorted && t === a.iScale, o = i.length, s = this._getOtherScale(t), l = up(n, a, this.chart), c = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }, { min: u, max: d } = op(s);
    let f, g;
    function m() {
      g = i[f];
      const v = g[s.axis];
      return !ne(g[t.axis]) || u > v || d < v;
    }
    for (f = 0; f < o && !(!m() && (this.updateRangeFromParsed(c, t, g, l), r)); ++f)
      ;
    if (r) {
      for (f = o - 1; f >= 0; --f)
        if (!m()) {
          this.updateRangeFromParsed(c, t, g, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let i, r, o;
    for (i = 0, r = n.length; i < r; ++i)
      o = n[i][t.axis], ne(o) && a.push(o);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = n.iScale, i = n.vScale, r = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(r[a.axis]) : "",
      value: i ? "" + i.getLabelForValue(r[i.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = ap(F(this.options.clip, np(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, i = a.data || [], r = n.chartArea, o = [], s = this._drawStart || 0, l = this._drawCount || i.length - s, c = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, r, s, l), u = s; u < s + l; ++u) {
      const d = i[u];
      d.hidden || (d.active && c ? o.push(d) : d.draw(t, r));
    }
    for (u = 0; u < o.length; ++u)
      o[u].draw(t, r);
  }
  getStyle(t, n) {
    const a = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, n, a) {
    const i = this.getDataset();
    let r;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      r = o.$context || (o.$context = cp(this.getContext(), t, o)), r.parsed = this.getParsed(t), r.raw = i.data[t], r.index = r.dataIndex = t;
    } else
      r = this.$context || (this.$context = lp(this.chart.getContext(), this.index)), r.dataset = i, r.index = r.datasetIndex = this.index;
    return r.active = !!n, r.mode = a, r;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const i = n === "active", r = this._cachedDataOpts, o = t + "-" + n, s = r[o], l = this.enableOptionSharing && $e(a);
    if (s)
      return ol(s, l);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), d = i ? [`${t}Hover`, "hover", t, ""] : [t, ""], f = c.getOptionScopes(this.getDataset(), u), g = Object.keys(R.elements[t]), m = () => this.getContext(a, i), v = c.resolveNamedOptions(f, g, m, d);
    return v.$shared && (v.$shared = l, r[o] = Object.freeze(ol(v, l))), v;
  }
  _resolveAnimations(t, n, a) {
    const i = this.chart, r = this._cachedDataOpts, o = `animation-${n}`, s = r[o];
    if (s)
      return s;
    let l;
    if (i.options.animation !== !1) {
      const u = this.chart.config, d = u.datasetAnimationScopeKeys(this._type, n), f = u.getOptionScopes(this.getDataset(), d);
      l = u.createResolver(f, this.getContext(t, a, n));
    }
    const c = new cd(i, l && l.animations);
    return l && l._cacheable && (r[o] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Qi(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), i = this._sharedOptions, r = this.getSharedOptions(a), o = this.includeOptions(n, r) || r !== i;
    return this.updateSharedOptions(r, n, a), { sharedOptions: r, includeOptions: o };
  }
  updateElement(t, n, a, i) {
    Qi(i) ? Object.assign(t, a) : this._resolveAnimations(n, i).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Qi(n) && this._resolveAnimations(void 0, n).update(t, a);
  }
  _setStyle(t, n, a, i) {
    t.active = i;
    const r = this.getStyle(n, i);
    this._resolveAnimations(n, a, i).update(t, {
      options: !i && this.getSharedOptions(r) || r
    });
  }
  removeHoverStyle(t, n, a) {
    this._setStyle(t, a, "active", !1);
  }
  setHoverStyle(t, n, a) {
    this._setStyle(t, a, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const n = this._data, a = this._cachedMeta.data;
    for (const [s, l, c] of this._syncList)
      this[s](l, c);
    this._syncList = [];
    const i = a.length, r = n.length, o = Math.min(r, i);
    o && this.parse(0, o), r > i ? this._insertElements(i, r - i, t) : r < i && this._removeElements(r, i - r);
  }
  _insertElements(t, n, a = !0) {
    const i = this._cachedMeta, r = i.data, o = t + n;
    let s;
    const l = (c) => {
      for (c.length += n, s = c.length - 1; s >= o; s--)
        c[s] = c[s - n];
    };
    for (l(r), s = t; s < o; ++s)
      r[s] = new this.dataElementType();
    this._parsing && l(i._parsed), this.parse(t, n), a && this.updateElements(r, t, n, "reset");
  }
  updateElements(t, n, a, i) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const i = a._parsed.splice(t, n);
      a._stacked && On(a, i);
    }
    a.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, a, i] = t;
      this[n](a, i);
    }
    this.chart._dataChanges.push([this.index, ...t]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync(["_insertElements", this.getDataset().data.length - t, t]);
  }
  _onDataPop() {
    this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
  }
  _onDataShift() {
    this._sync(["_removeElements", 0, 1]);
  }
  _onDataSplice(t, n) {
    n && this._sync(["_removeElements", t, n]);
    const a = arguments.length - 2;
    a && this._sync(["_insertElements", t, a]);
  }
  _onDataUnshift() {
    this._sync(["_insertElements", 0, arguments.length]);
  }
}
je.defaults = {};
je.prototype.datasetElementType = null;
je.prototype.dataElementType = null;
function dp(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let i = 0, r = n.length; i < r; i++)
      a = a.concat(n[i].controller.getAllParsedValues(e));
    e._cache.$bar = Nu(a.sort((i, r) => i - r));
  }
  return e._cache.$bar;
}
function fp(e) {
  const t = e.iScale, n = dp(t, e.type);
  let a = t._length, i, r, o, s;
  const l = () => {
    o === 32767 || o === -32768 || ($e(s) && (a = Math.min(a, Math.abs(o - s) || a)), s = o);
  };
  for (i = 0, r = n.length; i < r; ++i)
    o = t.getPixelForValue(n[i]), l();
  for (s = void 0, i = 0, r = t.ticks.length; i < r; ++i)
    o = t.getPixelForTick(i), l();
  return a;
}
function hp(e, t, n, a) {
  const i = n.barThickness;
  let r, o;
  return V(i) ? (r = t.min * n.categoryPercentage, o = n.barPercentage) : (r = i * a, o = 1), {
    chunk: r / a,
    ratio: o,
    start: t.pixels[e] - r / 2
  };
}
function gp(e, t, n, a) {
  const i = t.pixels, r = i[e];
  let o = e > 0 ? i[e - 1] : null, s = e < i.length - 1 ? i[e + 1] : null;
  const l = n.categoryPercentage;
  o === null && (o = r - (s === null ? t.end - t.start : s - r)), s === null && (s = r + r - o);
  const c = r - (r - Math.min(o, s)) / 2 * l;
  return {
    chunk: Math.abs(s - o) / 2 * l / a,
    ratio: n.barPercentage,
    start: c
  };
}
function mp(e, t, n, a) {
  const i = n.parse(e[0], a), r = n.parse(e[1], a), o = Math.min(i, r), s = Math.max(i, r);
  let l = o, c = s;
  Math.abs(o) > Math.abs(s) && (l = s, c = o), t[n.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: i,
    end: r,
    min: o,
    max: s
  };
}
function dd(e, t, n, a) {
  return K(e) ? mp(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function sl(e, t, n, a) {
  const i = e.iScale, r = e.vScale, o = i.getLabels(), s = i === r, l = [];
  let c, u, d, f;
  for (c = n, u = n + a; c < u; ++c)
    f = t[c], d = {}, d[i.axis] = s || i.parse(o[c], c), l.push(dd(f, d, r, c));
  return l;
}
function Ji(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function vp(e, t, n) {
  return e !== 0 ? Xe(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function pp(e) {
  let t, n, a, i, r;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (i = "end", r = "start") : (i = "start", r = "end"), { start: n, end: a, reverse: t, top: i, bottom: r };
}
function bp(e, t, n, a) {
  let i = t.borderSkipped;
  const r = {};
  if (!i) {
    e.borderSkipped = r;
    return;
  }
  if (i === !0) {
    e.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 };
    return;
  }
  const { start: o, end: s, reverse: l, top: c, bottom: u } = pp(e);
  i === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? i = c : (n._bottom || 0) === a ? i = u : (r[ll(u, o, s, l)] = !0, i = c)), r[ll(i, o, s, l)] = !0, e.borderSkipped = r;
}
function ll(e, t, n, a) {
  return a ? (e = yp(e, t, n), e = cl(e, n, t)) : e = cl(e, t, n), e;
}
function yp(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function cl(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Cp(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class yi extends je {
  parsePrimitiveData(t, n, a, i) {
    return sl(t, n, a, i);
  }
  parseArrayData(t, n, a, i) {
    return sl(t, n, a, i);
  }
  parseObjectData(t, n, a, i) {
    const { iScale: r, vScale: o } = t, { xAxisKey: s = "x", yAxisKey: l = "y" } = this._parsing, c = r.axis === "x" ? s : l, u = o.axis === "x" ? s : l, d = [];
    let f, g, m, v;
    for (f = a, g = a + i; f < g; ++f)
      v = n[f], m = {}, m[r.axis] = r.parse(xt(v, c), f), d.push(dd(xt(v, u), m, o, f));
    return d;
  }
  updateRangeFromParsed(t, n, a, i) {
    super.updateRangeFromParsed(t, n, a, i);
    const r = a._custom;
    r && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, r.min), t.max = Math.max(t.max, r.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: a, vScale: i } = n, r = this.getParsed(t), o = r._custom, s = Ji(o) ? "[" + o.start + ", " + o.end + "]" : "" + i.getLabelForValue(r[i.axis]);
    return {
      label: "" + a.getLabelForValue(r[a.axis]),
      value: s
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, t);
  }
  updateElements(t, n, a, i) {
    const r = i === "reset", { index: o, _cachedMeta: { vScale: s } } = this, l = s.getBasePixel(), c = s.isHorizontal(), u = this._getRuler(), { sharedOptions: d, includeOptions: f } = this._getSharedOptions(n, i);
    for (let g = n; g < n + a; g++) {
      const m = this.getParsed(g), v = r || V(m[s.axis]) ? { base: l, head: l } : this._calculateBarValuePixels(g), p = this._calculateBarIndexPixels(g, u), b = (m._stacks || {})[s.axis], y = {
        horizontal: c,
        base: v.base,
        enableBorderRadius: !b || Ji(m._custom) || o === b._top || o === b._bottom,
        x: c ? v.head : p.center,
        y: c ? p.center : v.head,
        height: c ? p.size : Math.abs(v.size),
        width: c ? Math.abs(v.size) : p.size
      };
      f && (y.options = d || this.resolveDataElementOptions(g, t[g].active ? "active" : i));
      const w = y.options || t[g].options;
      bp(y, w, b, o), Cp(y, w, u.ratio), this.updateElement(t[g], g, y, i);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, i = a.getMatchingVisibleMetas(this._type).filter((l) => l.controller.options.grouped), r = a.options.stacked, o = [], s = (l) => {
      const c = l.controller.getParsed(n), u = c && c[l.vScale.axis];
      if (V(u) || isNaN(u))
        return !0;
    };
    for (const l of i)
      if (!(n !== void 0 && s(l)) && ((r === !1 || o.indexOf(l.stack) === -1 || r === void 0 && l.stack === void 0) && o.push(l.stack), l.index === t))
        break;
    return o.length || o.push(void 0), o;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, n, a) {
    const i = this._getStacks(t, a), r = n !== void 0 ? i.indexOf(n) : -1;
    return r === -1 ? i.length - 1 : r;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, a = n.iScale, i = [];
    let r, o;
    for (r = 0, o = n.data.length; r < o; ++r)
      i.push(a.getPixelForValue(this.getParsed(r)[a.axis], r));
    const s = t.barThickness;
    return {
      min: s || fp(n),
      pixels: i,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: s ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: a }, options: { base: i, minBarLength: r } } = this, o = i || 0, s = this.getParsed(t), l = s._custom, c = Ji(l);
    let u = s[n.axis], d = 0, f = a ? this.applyStack(n, s, a) : u, g, m;
    f !== u && (d = f - u, f = u), c && (u = l.barStart, f = l.barEnd - l.barStart, u !== 0 && Xe(u) !== Xe(l.barEnd) && (d = 0), d += u);
    const v = !V(i) && !c ? i : d;
    let p = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(d + f) : g = p, m = g - p, Math.abs(m) < r) {
      m = vp(m, n, o) * r, u === o && (p -= m / 2);
      const b = n.getPixelForDecimal(0), y = n.getPixelForDecimal(1), w = Math.min(b, y), x = Math.max(b, y);
      p = Math.max(Math.min(p, x), w), g = p + m;
    }
    if (p === n.getPixelForValue(o)) {
      const b = Xe(m) * n.getLineWidthForValue(o) / 2;
      p += b, m -= b;
    }
    return {
      size: m,
      base: p,
      head: g,
      center: g + m / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, i = this.options, r = i.skipNull, o = F(i.maxBarThickness, 1 / 0);
    let s, l;
    if (n.grouped) {
      const c = r ? this._getStackCount(t) : n.stackCount, u = i.barThickness === "flex" ? gp(t, n, i, c) : hp(t, n, i, c), d = this._getStackIndex(this.index, this._cachedMeta.stack, r ? t : void 0);
      s = u.start + u.chunk * d + u.chunk / 2, l = Math.min(o, u.chunk * u.ratio);
    } else
      s = a.getPixelForValue(this.getParsed(t)[a.axis], t), l = Math.min(o, n.min * n.ratio);
    return {
      base: s - l / 2,
      head: s + l / 2,
      center: s,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, i = a.length;
    let r = 0;
    for (; r < i; ++r)
      this.getParsed(r)[n.axis] !== null && a[r].draw(this._ctx);
  }
}
yi.id = "bar";
yi.defaults = {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "base", "width", "height"]
    }
  }
};
yi.overrides = {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
};
class Ci extends je {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, n, a, i) {
    const r = super.parsePrimitiveData(t, n, a, i);
    for (let o = 0; o < r.length; o++)
      r[o]._custom = this.resolveDataElementOptions(o + a).radius;
    return r;
  }
  parseArrayData(t, n, a, i) {
    const r = super.parseArrayData(t, n, a, i);
    for (let o = 0; o < r.length; o++) {
      const s = n[a + o];
      r[o]._custom = F(s[2], this.resolveDataElementOptions(o + a).radius);
    }
    return r;
  }
  parseObjectData(t, n, a, i) {
    const r = super.parseObjectData(t, n, a, i);
    for (let o = 0; o < r.length; o++) {
      const s = n[a + o];
      r[o]._custom = F(s && s.r && +s.r, this.resolveDataElementOptions(o + a).radius);
    }
    return r;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let n = 0;
    for (let a = t.length - 1; a >= 0; --a)
      n = Math.max(n, t[a].size(this.resolveDataElementOptions(a)) / 2);
    return n > 0 && n;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { xScale: a, yScale: i } = n, r = this.getParsed(t), o = a.getLabelForValue(r.x), s = i.getLabelForValue(r.y), l = r._custom;
    return {
      label: n.label,
      value: "(" + o + ", " + s + (l ? ", " + l : "") + ")"
    };
  }
  update(t) {
    const n = this._cachedMeta.data;
    this.updateElements(n, 0, n.length, t);
  }
  updateElements(t, n, a, i) {
    const r = i === "reset", { iScale: o, vScale: s } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(n, i), u = o.axis, d = s.axis;
    for (let f = n; f < n + a; f++) {
      const g = t[f], m = !r && this.getParsed(f), v = {}, p = v[u] = r ? o.getPixelForDecimal(0.5) : o.getPixelForValue(m[u]), b = v[d] = r ? s.getBasePixel() : s.getPixelForValue(m[d]);
      v.skip = isNaN(p) || isNaN(b), c && (v.options = l || this.resolveDataElementOptions(f, g.active ? "active" : i), r && (v.options.radius = 0)), this.updateElement(g, f, v, i);
    }
  }
  resolveDataElementOptions(t, n) {
    const a = this.getParsed(t);
    let i = super.resolveDataElementOptions(t, n);
    i.$shared && (i = Object.assign({}, i, { $shared: !1 }));
    const r = i.radius;
    return n !== "active" && (i.radius = 0), i.radius += F(a && a._custom, r), i;
  }
}
Ci.id = "bubble";
Ci.defaults = {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "borderWidth", "radius"]
    }
  }
};
Ci.overrides = {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return "";
        }
      }
    }
  }
};
function xp(e, t, n) {
  let a = 1, i = 1, r = 0, o = 0;
  if (t < Y) {
    const s = e, l = s + t, c = Math.cos(s), u = Math.sin(s), d = Math.cos(l), f = Math.sin(l), g = (w, x, C) => ia(w, s, l, !0) ? 1 : Math.max(x, x * n, C, C * n), m = (w, x, C) => ia(w, s, l, !0) ? -1 : Math.min(x, x * n, C, C * n), v = g(0, c, d), p = g(ee, u, f), b = m(Z, c, d), y = m(Z + ee, u, f);
    a = (v - b) / 2, i = (p - y) / 2, r = -(v + b) / 2, o = -(p + y) / 2;
  }
  return { ratioX: a, ratioY: i, offsetX: r, offsetY: o };
}
class gn extends je {
  constructor(t, n) {
    super(t, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, n) {
    const a = this.getDataset().data, i = this._cachedMeta;
    if (this._parsing === !1)
      i._parsed = a;
    else {
      let r = (l) => +a[l];
      if (N(a[t])) {
        const { key: l = "value" } = this._parsing;
        r = (c) => +xt(a[c], l);
      }
      let o, s;
      for (o = t, s = t + n; o < s; ++o)
        i._parsed[o] = r(o);
    }
  }
  _getRotation() {
    return Fe(this.options.rotation - 90);
  }
  _getCircumference() {
    return Fe(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Y, n = -Y;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a)) {
        const i = this.chart.getDatasetMeta(a).controller, r = i._getRotation(), o = i._getCircumference();
        t = Math.min(t, r), n = Math.max(n, r + o);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: a } = n, i = this._cachedMeta, r = i.data, o = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing, s = Math.max((Math.min(a.width, a.height) - o) / 2, 0), l = Math.min(pv(this.options.cutout, s), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: d } = this._getRotationExtents(), { ratioX: f, ratioY: g, offsetX: m, offsetY: v } = xp(d, u, l), p = (a.width - o) / f, b = (a.height - o) / g, y = Math.max(Math.min(p, b) / 2, 0), w = Bu(this.options.radius, y), x = Math.max(w * l, 0), C = (w - x) / this._getVisibleDatasetWeightTotal();
    this.offsetX = m * w, this.offsetY = v * w, i.total = this.calculateTotal(), this.outerRadius = w - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * c, 0), this.updateElements(r, 0, r.length, t);
  }
  _circumference(t, n) {
    const a = this.options, i = this._cachedMeta, r = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || i._parsed[t] === null || i.data[t].hidden ? 0 : this.calculateCircumference(i._parsed[t] * r / Y);
  }
  updateElements(t, n, a, i) {
    const r = i === "reset", o = this.chart, s = o.chartArea, c = o.options.animation, u = (s.left + s.right) / 2, d = (s.top + s.bottom) / 2, f = r && c.animateScale, g = f ? 0 : this.innerRadius, m = f ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: p } = this._getSharedOptions(n, i);
    let b = this._getRotation(), y;
    for (y = 0; y < n; ++y)
      b += this._circumference(y, r);
    for (y = n; y < n + a; ++y) {
      const w = this._circumference(y, r), x = t[y], C = {
        x: u + this.offsetX,
        y: d + this.offsetY,
        startAngle: b,
        endAngle: b + w,
        circumference: w,
        outerRadius: m,
        innerRadius: g
      };
      p && (C.options = v || this.resolveDataElementOptions(y, x.active ? "active" : i)), b += w, this.updateElement(x, y, C, i);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let a = 0, i;
    for (i = 0; i < n.length; i++) {
      const r = t._parsed[i];
      r !== null && !isNaN(r) && this.chart.getDataVisibility(i) && !n[i].hidden && (a += Math.abs(r));
    }
    return a;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? Y * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, i = a.data.labels || [], r = fa(n._parsed[t], a.options.locale);
    return {
      label: i[t] || "",
      value: r
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let i, r, o, s, l;
    if (!t) {
      for (i = 0, r = a.data.datasets.length; i < r; ++i)
        if (a.isDatasetVisible(i)) {
          o = a.getDatasetMeta(i), t = o.data, s = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (i = 0, r = t.length; i < r; ++i)
      l = s.resolveDataElementOptions(i), l.borderAlign !== "inner" && (n = Math.max(n, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let a = 0, i = t.length; a < i; ++a) {
      const r = this.resolveDataElementOptions(a);
      n = Math.max(n, r.offset || 0, r.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(t) {
    let n = 0;
    for (let a = 0; a < t; ++a)
      this.chart.isDatasetVisible(a) && (n += this._getRingWeight(a));
    return n;
  }
  _getRingWeight(t) {
    return Math.max(F(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
gn.id = "doughnut";
gn.defaults = {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
};
gn.descriptors = {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing"
};
gn.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const t = e.data;
          if (t.labels.length && t.datasets.length) {
            const { labels: { pointStyle: n } } = e.legend.options;
            return t.labels.map((a, i) => {
              const o = e.getDatasetMeta(0).controller.getStyle(i);
              return {
                text: a,
                fillStyle: o.backgroundColor,
                strokeStyle: o.borderColor,
                lineWidth: o.borderWidth,
                pointStyle: n,
                hidden: !e.getDataVisibility(i),
                index: i
              };
            });
          }
          return [];
        }
      },
      onClick(e, t, n) {
        n.chart.toggleDataVisibility(t.index), n.chart.update();
      }
    },
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(e) {
          let t = e.label;
          const n = ": " + e.formattedValue;
          return K(t) ? (t = t.slice(), t[0] += n) : t += n, t;
        }
      }
    }
  }
};
class xi extends je {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: a, data: i = [], _dataset: r } = n, o = this.chart._animationsDisabled;
    let { start: s, count: l } = Vu(n, i, o);
    this._drawStart = s, this._drawCount = l, Hu(n) && (s = 0, l = i.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!r._decimated, a.points = i;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !o,
      options: c
    }, t), this.updateElements(i, s, l, t);
  }
  updateElements(t, n, a, i) {
    const r = i === "reset", { iScale: o, vScale: s, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: d } = this._getSharedOptions(n, i), f = o.axis, g = s.axis, { spanGaps: m, segment: v } = this.options, p = un(m) ? m : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || r || i === "none";
    let y = n > 0 && this.getParsed(n - 1);
    for (let w = n; w < n + a; ++w) {
      const x = t[w], C = this.getParsed(w), k = b ? x : {}, M = V(C[g]), L = k[f] = o.getPixelForValue(C[f], w), A = k[g] = r || M ? s.getBasePixel() : s.getPixelForValue(l ? this.applyStack(s, C, l) : C[g], w);
      k.skip = isNaN(L) || isNaN(A) || M, k.stop = w > 0 && Math.abs(C[f] - y[f]) > p, v && (k.parsed = C, k.raw = c.data[w]), d && (k.options = u || this.resolveDataElementOptions(w, x.active ? "active" : i)), b || this.updateElement(x, w, k, i), y = C;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, a = n.options && n.options.borderWidth || 0, i = t.data || [];
    if (!i.length)
      return a;
    const r = i[0].size(this.resolveDataElementOptions(0)), o = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(a, r, o) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
xi.id = "line";
xi.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
};
xi.overrides = {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
};
class _i extends je {
  constructor(t, n) {
    super(t, n), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, i = a.data.labels || [], r = fa(n._parsed[t].r, a.options.locale);
    return {
      label: i[t] || "",
      value: r
    };
  }
  parseObjectData(t, n, a, i) {
    return td.bind(this)(t, n, a, i);
  }
  update(t) {
    const n = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(n, 0, n.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, n = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
    return t.data.forEach((a, i) => {
      const r = this.getParsed(i).r;
      !isNaN(r) && this.chart.getDataVisibility(i) && (r < n.min && (n.min = r), r > n.max && (n.max = r));
    }), n;
  }
  _updateRadius() {
    const t = this.chart, n = t.chartArea, a = t.options, i = Math.min(n.right - n.left, n.bottom - n.top), r = Math.max(i / 2, 0), o = Math.max(a.cutoutPercentage ? r / 100 * a.cutoutPercentage : 1, 0), s = (r - o) / t.getVisibleDatasetCount();
    this.outerRadius = r - s * this.index, this.innerRadius = this.outerRadius - s;
  }
  updateElements(t, n, a, i) {
    const r = i === "reset", o = this.chart, l = o.options.animation, c = this._cachedMeta.rScale, u = c.xCenter, d = c.yCenter, f = c.getIndexAngle(0) - 0.5 * Z;
    let g = f, m;
    const v = 360 / this.countVisibleElements();
    for (m = 0; m < n; ++m)
      g += this._computeAngle(m, i, v);
    for (m = n; m < n + a; m++) {
      const p = t[m];
      let b = g, y = g + this._computeAngle(m, i, v), w = o.getDataVisibility(m) ? c.getDistanceFromCenterForValue(this.getParsed(m).r) : 0;
      g = y, r && (l.animateScale && (w = 0), l.animateRotate && (b = y = f));
      const x = {
        x: u,
        y: d,
        innerRadius: 0,
        outerRadius: w,
        startAngle: b,
        endAngle: y,
        options: this.resolveDataElementOptions(m, p.active ? "active" : i)
      };
      this.updateElement(p, m, x, i);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let n = 0;
    return t.data.forEach((a, i) => {
      !isNaN(this.getParsed(i).r) && this.chart.getDataVisibility(i) && n++;
    }), n;
  }
  _computeAngle(t, n, a) {
    return this.chart.getDataVisibility(t) ? Fe(this.resolveDataElementOptions(t, n).angle || a) : 0;
  }
}
_i.id = "polarArea";
_i.defaults = {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
    }
  },
  indexAxis: "r",
  startAngle: 0
};
_i.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const t = e.data;
          if (t.labels.length && t.datasets.length) {
            const { labels: { pointStyle: n } } = e.legend.options;
            return t.labels.map((a, i) => {
              const o = e.getDatasetMeta(0).controller.getStyle(i);
              return {
                text: a,
                fillStyle: o.backgroundColor,
                strokeStyle: o.borderColor,
                lineWidth: o.borderWidth,
                pointStyle: n,
                hidden: !e.getDataVisibility(i),
                index: i
              };
            });
          }
          return [];
        }
      },
      onClick(e, t, n) {
        n.chart.toggleDataVisibility(t.index), n.chart.update();
      }
    },
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(e) {
          return e.chart.data.labels[e.dataIndex] + ": " + e.formattedValue;
        }
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
};
class wo extends gn {
}
wo.id = "pie";
wo.defaults = {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
};
class wi extends je {
  getLabelAndValue(t) {
    const n = this._cachedMeta.vScale, a = this.getParsed(t);
    return {
      label: n.getLabels()[t],
      value: "" + n.getLabelForValue(a[n.axis])
    };
  }
  parseObjectData(t, n, a, i) {
    return td.bind(this)(t, n, a, i);
  }
  update(t) {
    const n = this._cachedMeta, a = n.dataset, i = n.data || [], r = n.iScale.getLabels();
    if (a.points = i, t !== "resize") {
      const o = this.resolveDatasetElementOptions(t);
      this.options.showLine || (o.borderWidth = 0);
      const s = {
        _loop: !0,
        _fullLoop: r.length === i.length,
        options: o
      };
      this.updateElement(a, void 0, s, t);
    }
    this.updateElements(i, 0, i.length, t);
  }
  updateElements(t, n, a, i) {
    const r = this._cachedMeta.rScale, o = i === "reset";
    for (let s = n; s < n + a; s++) {
      const l = t[s], c = this.resolveDataElementOptions(s, l.active ? "active" : i), u = r.getPointPositionForValue(s, this.getParsed(s).r), d = o ? r.xCenter : u.x, f = o ? r.yCenter : u.y, g = {
        x: d,
        y: f,
        angle: u.angle,
        skip: isNaN(d) || isNaN(f),
        options: c
      };
      this.updateElement(l, s, g, i);
    }
  }
}
wi.id = "radar";
wi.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
};
wi.overrides = {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
};
let ze = class {
  constructor() {
    this.x = void 0, this.y = void 0, this.active = !1, this.options = void 0, this.$animations = void 0;
  }
  tooltipPosition(t) {
    const { x: n, y: a } = this.getProps(["x", "y"], t);
    return { x: n, y: a };
  }
  hasValue() {
    return un(this.x) && un(this.y);
  }
  getProps(t, n) {
    const a = this.$animations;
    if (!n || !a)
      return this;
    const i = {};
    return t.forEach((r) => {
      i[r] = a[r] && a[r].active() ? a[r]._to : this[r];
    }), i;
  }
};
ze.defaults = {};
ze.defaultRoutes = void 0;
const fd = {
  values(e) {
    return K(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let i, r = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (i = "scientific"), r = _p(e, n);
    }
    const o = De(Math.abs(r)), s = Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = { notation: i, minimumFractionDigits: s, maximumFractionDigits: s };
    return Object.assign(l, this.options.ticks.format), fa(e, a, l);
  },
  logarithmic(e, t, n) {
    if (e === 0)
      return "0";
    const a = e / Math.pow(10, Math.floor(De(e)));
    return a === 1 || a === 2 || a === 5 ? fd.numeric.call(this, e, t, n) : "";
  }
};
function _p(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Si = { formatters: fd };
R.set("scale", {
  display: !0,
  offset: !1,
  reverse: !1,
  beginAtZero: !1,
  bounds: "ticks",
  grace: 0,
  grid: {
    display: !0,
    lineWidth: 1,
    drawBorder: !0,
    drawOnChartArea: !0,
    drawTicks: !0,
    tickLength: 8,
    tickWidth: (e, t) => t.lineWidth,
    tickColor: (e, t) => t.color,
    offset: !1,
    borderDash: [],
    borderDashOffset: 0,
    borderWidth: 1
  },
  title: {
    display: !1,
    text: "",
    padding: {
      top: 4,
      bottom: 4
    }
  },
  ticks: {
    minRotation: 0,
    maxRotation: 50,
    mirror: !1,
    textStrokeWidth: 0,
    textStrokeColor: "",
    padding: 3,
    display: !0,
    autoSkip: !0,
    autoSkipPadding: 3,
    labelOffset: 0,
    callback: Si.formatters.values,
    minor: {},
    major: {},
    align: "center",
    crossAlign: "near",
    showLabelBackdrop: !1,
    backdropColor: "rgba(255, 255, 255, 0.75)",
    backdropPadding: 2
  }
});
R.route("scale.ticks", "color", "", "color");
R.route("scale.grid", "color", "", "borderColor");
R.route("scale.grid", "borderColor", "", "borderColor");
R.route("scale.title", "color", "", "color");
R.describe("scale", {
  _fallback: !1,
  _scriptable: (e) => !e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
  _indexable: (e) => e !== "borderDash" && e !== "tickBorderDash"
});
R.describe("scales", {
  _fallback: "scale"
});
R.describe("scale.ticks", {
  _scriptable: (e) => e !== "backdropPadding" && e !== "callback",
  _indexable: (e) => e !== "backdropPadding"
});
function wp(e, t) {
  const n = e.options.ticks, a = n.maxTicksLimit || Sp(e), i = n.major.enabled ? Op(t) : [], r = i.length, o = i[0], s = i[r - 1], l = [];
  if (r > a)
    return Dp(t, l, i, r / a), l;
  const c = kp(i, t, a);
  if (r > 0) {
    let u, d;
    const f = r > 1 ? Math.round((s - o) / (r - 1)) : null;
    for (Da(t, l, c, V(f) ? 0 : o - f, o), u = 0, d = r - 1; u < d; u++)
      Da(t, l, c, i[u], i[u + 1]);
    return Da(t, l, c, s, V(f) ? t.length : s + f), l;
  }
  return Da(t, l, c), l;
}
function Sp(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), i = e._maxLength / n;
  return Math.floor(Math.min(a, i));
}
function kp(e, t, n) {
  const a = Pp(e), i = t.length / n;
  if (!a)
    return Math.max(i, 1);
  const r = kv(a);
  for (let o = 0, s = r.length - 1; o < s; o++) {
    const l = r[o];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function Op(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Dp(e, t, n, a) {
  let i = 0, r = n[0], o;
  for (a = Math.ceil(a), o = 0; o < e.length; o++)
    o === r && (t.push(e[o]), i++, r = n[i * a]);
}
function Da(e, t, n, a, i) {
  const r = F(a, 0), o = Math.min(F(i, e.length), e.length);
  let s = 0, l, c, u;
  for (n = Math.ceil(n), i && (l = i - a, n = l / Math.floor(l / n)), u = r; u < 0; )
    s++, u = Math.round(r + s * n);
  for (c = Math.max(r, 0); c < o; c++)
    c === u && (t.push(e[c]), s++, u = Math.round(r + s * n));
}
function Pp(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Mp = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ul = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n;
function dl(e, t) {
  const n = [], a = e.length / t, i = e.length;
  let r = 0;
  for (; r < i; r += a)
    n.push(e[Math.floor(r)]);
  return n;
}
function Tp(e, t, n) {
  const a = e.ticks.length, i = Math.min(t, a - 1), r = e._startPixel, o = e._endPixel, s = 1e-6;
  let l = e.getPixelForTick(i), c;
  if (!(n && (a === 1 ? c = Math.max(l - r, o - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(i - 1)) / 2, l += i < t ? c : -c, l < r - s || l > o + s)))
    return l;
}
function Ap(e, t) {
  W(e, (n) => {
    const a = n.gc, i = a.length / 2;
    let r;
    if (i > t) {
      for (r = 0; r < i; ++r)
        delete n.data[a[r]];
      a.splice(0, i);
    }
  });
}
function Dn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function fl(e, t) {
  if (!e.display)
    return 0;
  const n = ie(e.font, t), a = fe(e.padding);
  return (K(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function Lp(e, t) {
  return St(e, {
    scale: t,
    type: "scale"
  });
}
function $p(e, t, n) {
  return St(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Bp(e, t, n) {
  let a = go(e);
  return (n && t !== "right" || !n && t === "right") && (a = Mp(a)), a;
}
function Ep(e, t, n, a) {
  const { top: i, left: r, bottom: o, right: s, chart: l } = e, { chartArea: c, scales: u } = l;
  let d = 0, f, g, m;
  const v = o - i, p = s - r;
  if (e.isHorizontal()) {
    if (g = ce(a, r, s), N(n)) {
      const b = Object.keys(n)[0], y = n[b];
      m = u[b].getPixelForValue(y) + v - t;
    } else
      n === "center" ? m = (c.bottom + c.top) / 2 + v - t : m = ul(e, n, t);
    f = s - r;
  } else {
    if (N(n)) {
      const b = Object.keys(n)[0], y = n[b];
      g = u[b].getPixelForValue(y) - p + t;
    } else
      n === "center" ? g = (c.left + c.right) / 2 - p + t : g = ul(e, n, t);
    m = ce(a, o, i), d = n === "left" ? -ee : ee;
  }
  return { titleX: g, titleY: m, maxWidth: f, rotation: d };
}
class qt extends ze {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: a, _suggestedMax: i } = this;
    return t = Oe(t, Number.POSITIVE_INFINITY), n = Oe(n, Number.NEGATIVE_INFINITY), a = Oe(a, Number.POSITIVE_INFINITY), i = Oe(i, Number.NEGATIVE_INFINITY), {
      min: Oe(t, a),
      max: Oe(n, i),
      minDefined: ne(t),
      maxDefined: ne(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: a, minDefined: i, maxDefined: r } = this.getUserBounds(), o;
    if (i && r)
      return { min: n, max: a };
    const s = this.getMatchingVisibleMetas();
    for (let l = 0, c = s.length; l < c; ++l)
      o = s[l].controller.getMinMax(this, t), i || (n = Math.min(n, o.min)), r || (a = Math.max(a, o.max));
    return n = r && n > a ? a : n, a = i && n > a ? n : a, {
      min: Oe(n, Oe(a, n)),
      max: Oe(a, Oe(n, a))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    U(this.options.beforeUpdate, [this]);
  }
  update(t, n, a) {
    const { beginAtZero: i, grace: r, ticks: o } = this.options, s = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = h0(this, r, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = s < this.ticks.length;
    this._convertTicksToLabels(l ? dl(this.ticks, s) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = wp(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    U(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    U(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    U(this.options.afterSetDimensions, [this]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), U(this.options[t], [this]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    U(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, i, r;
    for (a = 0, i = t.length; a < i; a++)
      r = t[a], r.label = U(n.callback, [r.value, a, t], this);
  }
  afterTickToLabelConversion() {
    U(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    U(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = this.ticks.length, i = n.minRotation || 0, r = n.maxRotation;
    let o = i, s, l, c;
    if (!this._isVisible() || !n.display || i >= r || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const u = this._getLabelSizes(), d = u.widest.width, f = u.highest.height, g = re(this.chart.width - d, 0, this.maxWidth);
    s = t.offset ? this.maxWidth / a : g / (a - 1), d + 6 > s && (s = g / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Dn(t.grid) - n.padding - fl(t.title, this.chart.options.font), c = Math.sqrt(d * d + f * f), o = fo(Math.min(
      Math.asin(re((u.highest.height + 6) / s, -1, 1)),
      Math.asin(re(l / c, -1, 1)) - Math.asin(re(f / c, -1, 1))
    )), o = Math.max(i, Math.min(r, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    U(this.options.afterCalculateLabelRotation, [this]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    U(this.options.beforeFit, [this]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: i, grid: r } } = this, o = this._isVisible(), s = this.isHorizontal();
    if (o) {
      const l = fl(i, n.options.font);
      if (s ? (t.width = this.maxWidth, t.height = Dn(r) + l) : (t.height = this.maxHeight, t.width = Dn(r) + l), a.display && this.ticks.length) {
        const { first: c, last: u, widest: d, highest: f } = this._getLabelSizes(), g = a.padding * 2, m = Fe(this.labelRotation), v = Math.cos(m), p = Math.sin(m);
        if (s) {
          const b = a.mirror ? 0 : p * d.width + v * f.height;
          t.height = Math.min(this.maxHeight, t.height + b + g);
        } else {
          const b = a.mirror ? 0 : v * d.width + p * f.height;
          t.width = Math.min(this.maxWidth, t.width + b + g);
        }
        this._calculatePadding(c, u, p, v);
      }
    }
    this._handleMargins(), s ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, i) {
    const { ticks: { align: r, padding: o }, position: s } = this.options, l = this.labelRotation !== 0, c = s !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, g = 0;
      l ? c ? (f = i * t.width, g = a * n.height) : (f = a * t.height, g = i * n.width) : r === "start" ? g = n.width : r === "end" ? f = t.width : r !== "inner" && (f = t.width / 2, g = n.width / 2), this.paddingLeft = Math.max((f - u + o) * this.width / (this.width - u), 0), this.paddingRight = Math.max((g - d + o) * this.width / (this.width - d), 0);
    } else {
      let u = n.height / 2, d = t.height / 2;
      r === "start" ? (u = 0, d = t.height) : r === "end" && (u = n.height, d = 0), this.paddingTop = u + o, this.paddingBottom = d + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    U(this.options.afterFit, [this]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, a;
    for (n = 0, a = t.length; n < a; n++)
      V(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = dl(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length);
    }
    return t;
  }
  _computeLabelSizes(t, n) {
    const { ctx: a, _longestTextCache: i } = this, r = [], o = [];
    let s = 0, l = 0, c, u, d, f, g, m, v, p, b, y, w;
    for (c = 0; c < n; ++c) {
      if (f = t[c].label, g = this._resolveTickFontOptions(c), a.font = m = g.string, v = i[m] = i[m] || { data: {}, gc: [] }, p = g.lineHeight, b = y = 0, !V(f) && !K(f))
        b = ei(a, v.data, v.gc, b, f), y = p;
      else if (K(f))
        for (u = 0, d = f.length; u < d; ++u)
          w = f[u], !V(w) && !K(w) && (b = ei(a, v.data, v.gc, b, w), y += p);
      r.push(b), o.push(y), s = Math.max(b, s), l = Math.max(y, l);
    }
    Ap(i, n);
    const x = r.indexOf(s), C = o.indexOf(l), k = (M) => ({ width: r[M] || 0, height: o[M] || 0 });
    return {
      first: k(0),
      last: k(n - 1),
      widest: k(x),
      highest: k(C),
      widths: r,
      heights: o
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return Pv(this._alignToPixels ? Mt(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const a = n[t];
      return a.$context || (a.$context = $p(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Lp(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Fe(this.labelRotation), a = Math.abs(Math.cos(n)), i = Math.abs(Math.sin(n)), r = this._getLabelSizes(), o = t.autoSkipPadding || 0, s = r ? r.widest.width + o : 0, l = r ? r.highest.height + o : 0;
    return this.isHorizontal() ? l * a > s * i ? s / a : l / i : l * i < s * a ? l / a : s / i;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, i = this.options, { grid: r, position: o } = i, s = r.offset, l = this.isHorizontal(), u = this.ticks.length + (s ? 1 : 0), d = Dn(r), f = [], g = r.setContext(this.getContext()), m = g.drawBorder ? g.borderWidth : 0, v = m / 2, p = function(B) {
      return Mt(a, B, m);
    };
    let b, y, w, x, C, k, M, L, A, $, D, _;
    if (o === "top")
      b = p(this.bottom), k = this.bottom - d, L = b - v, $ = p(t.top) + v, _ = t.bottom;
    else if (o === "bottom")
      b = p(this.top), $ = t.top, _ = p(t.bottom) - v, k = b + v, L = this.top + d;
    else if (o === "left")
      b = p(this.right), C = this.right - d, M = b - v, A = p(t.left) + v, D = t.right;
    else if (o === "right")
      b = p(this.left), A = t.left, D = p(t.right) - v, C = b + v, M = this.left + d;
    else if (n === "x") {
      if (o === "center")
        b = p((t.top + t.bottom) / 2 + 0.5);
      else if (N(o)) {
        const B = Object.keys(o)[0], I = o[B];
        b = p(this.chart.scales[B].getPixelForValue(I));
      }
      $ = t.top, _ = t.bottom, k = b + v, L = k + d;
    } else if (n === "y") {
      if (o === "center")
        b = p((t.left + t.right) / 2);
      else if (N(o)) {
        const B = Object.keys(o)[0], I = o[B];
        b = p(this.chart.scales[B].getPixelForValue(I));
      }
      C = b - v, M = C - d, A = t.left, D = t.right;
    }
    const T = F(i.ticks.maxTicksLimit, u), P = Math.max(1, Math.ceil(u / T));
    for (y = 0; y < u; y += P) {
      const B = r.setContext(this.getContext(y)), I = B.lineWidth, z = B.color, he = B.borderDash || [], Be = B.borderDashOffset, Ee = B.tickWidth, ft = B.tickColor, we = B.tickBorderDash || [], Ve = B.tickBorderDashOffset;
      w = Tp(this, y, s), w !== void 0 && (x = Mt(a, w, I), l ? C = M = A = D = x : k = L = $ = _ = x, f.push({
        tx1: C,
        ty1: k,
        tx2: M,
        ty2: L,
        x1: A,
        y1: $,
        x2: D,
        y2: _,
        width: I,
        color: z,
        borderDash: he,
        borderDashOffset: Be,
        tickWidth: Ee,
        tickColor: ft,
        tickBorderDash: we,
        tickBorderDashOffset: Ve
      }));
    }
    return this._ticksLength = u, this._borderValue = b, f;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: i, ticks: r } = a, o = this.isHorizontal(), s = this.ticks, { align: l, crossAlign: c, padding: u, mirror: d } = r, f = Dn(a.grid), g = f + u, m = d ? -u : g, v = -Fe(this.labelRotation), p = [];
    let b, y, w, x, C, k, M, L, A, $, D, _, T = "middle";
    if (i === "top")
      k = this.bottom - m, M = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      k = this.top + m, M = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const B = this._getYAxisLabelAlignment(f);
      M = B.textAlign, C = B.x;
    } else if (i === "right") {
      const B = this._getYAxisLabelAlignment(f);
      M = B.textAlign, C = B.x;
    } else if (n === "x") {
      if (i === "center")
        k = (t.top + t.bottom) / 2 + g;
      else if (N(i)) {
        const B = Object.keys(i)[0], I = i[B];
        k = this.chart.scales[B].getPixelForValue(I) + g;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (i === "center")
        C = (t.left + t.right) / 2 - g;
      else if (N(i)) {
        const B = Object.keys(i)[0], I = i[B];
        C = this.chart.scales[B].getPixelForValue(I);
      }
      M = this._getYAxisLabelAlignment(f).textAlign;
    }
    n === "y" && (l === "start" ? T = "top" : l === "end" && (T = "bottom"));
    const P = this._getLabelSizes();
    for (b = 0, y = s.length; b < y; ++b) {
      w = s[b], x = w.label;
      const B = r.setContext(this.getContext(b));
      L = this.getPixelForTick(b) + r.labelOffset, A = this._resolveTickFontOptions(b), $ = A.lineHeight, D = K(x) ? x.length : 1;
      const I = D / 2, z = B.color, he = B.textStrokeColor, Be = B.textStrokeWidth;
      let Ee = M;
      o ? (C = L, M === "inner" && (b === y - 1 ? Ee = this.options.reverse ? "left" : "right" : b === 0 ? Ee = this.options.reverse ? "right" : "left" : Ee = "center"), i === "top" ? c === "near" || v !== 0 ? _ = -D * $ + $ / 2 : c === "center" ? _ = -P.highest.height / 2 - I * $ + $ : _ = -P.highest.height + $ / 2 : c === "near" || v !== 0 ? _ = $ / 2 : c === "center" ? _ = P.highest.height / 2 - I * $ : _ = P.highest.height - D * $, d && (_ *= -1)) : (k = L, _ = (1 - D) * $ / 2);
      let ft;
      if (B.showLabelBackdrop) {
        const we = fe(B.backdropPadding), Ve = P.heights[b], He = P.widths[b];
        let Se = k + _ - we.top, tt = C - we.left;
        switch (T) {
          case "middle":
            Se -= Ve / 2;
            break;
          case "bottom":
            Se -= Ve;
            break;
        }
        switch (M) {
          case "center":
            tt -= He / 2;
            break;
          case "right":
            tt -= He;
            break;
        }
        ft = {
          left: tt,
          top: Se,
          width: He + we.width,
          height: Ve + we.height,
          color: B.backdropColor
        };
      }
      p.push({
        rotation: v,
        label: x,
        font: A,
        color: z,
        strokeColor: he,
        strokeWidth: Be,
        textOffset: _,
        textAlign: Ee,
        textBaseline: T,
        translation: [C, k],
        backdrop: ft
      });
    }
    return p;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Fe(this.labelRotation))
      return t === "top" ? "left" : "right";
    let i = "center";
    return n.align === "start" ? i = "left" : n.align === "end" ? i = "right" : n.align === "inner" && (i = "inner"), i;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: i, padding: r } } = this.options, o = this._getLabelSizes(), s = t + r, l = o.widest.width;
    let c, u;
    return n === "left" ? i ? (u = this.right + r, a === "near" ? c = "left" : a === "center" ? (c = "center", u += l / 2) : (c = "right", u += l)) : (u = this.right - s, a === "near" ? c = "right" : a === "center" ? (c = "center", u -= l / 2) : (c = "left", u = this.left)) : n === "right" ? i ? (u = this.left + r, a === "near" ? c = "right" : a === "center" ? (c = "center", u -= l / 2) : (c = "left", u -= l)) : (u = this.left + s, a === "near" ? c = "left" : a === "center" ? (c = "center", u += l / 2) : (c = "right", u = this.right)) : c = "right", { textAlign: c, x: u };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return { top: 0, left: this.left, bottom: t.height, right: this.right };
    if (n === "top" || n === "bottom")
      return { top: this.top, left: 0, bottom: this.bottom, right: t.width };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: a, top: i, width: r, height: o } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(a, i, r, o), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const i = this.ticks.findIndex((r) => r.value === t);
    return i >= 0 ? n.setContext(this.getContext(i)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, a = this.ctx, i = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let r, o;
    const s = (l, c, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (r = 0, o = i.length; r < o; ++r) {
        const l = i[r];
        n.drawOnChartArea && s(
          { x: l.x1, y: l.y1 },
          { x: l.x2, y: l.y2 },
          l
        ), n.drawTicks && s(
          { x: l.tx1, y: l.ty1 },
          { x: l.tx2, y: l.ty2 },
          {
            color: l.tickColor,
            width: l.tickWidth,
            borderDash: l.tickBorderDash,
            borderDashOffset: l.tickBorderDashOffset
          }
        );
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { grid: a } } = this, i = a.setContext(this.getContext()), r = a.drawBorder ? i.borderWidth : 0;
    if (!r)
      return;
    const o = a.setContext(this.getContext(0)).lineWidth, s = this._borderValue;
    let l, c, u, d;
    this.isHorizontal() ? (l = Mt(t, this.left, r) - r / 2, c = Mt(t, this.right, o) + o / 2, u = d = s) : (u = Mt(t, this.top, r) - r / 2, d = Mt(t, this.bottom, o) + o / 2, l = c = s), n.save(), n.lineWidth = i.borderWidth, n.strokeStyle = i.borderColor, n.beginPath(), n.moveTo(l, u), n.lineTo(c, d), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, i = this._computeLabelArea();
    i && vi(a, i);
    const r = this._labelItems || (this._labelItems = this._computeLabelItems(t));
    let o, s;
    for (o = 0, s = r.length; o < s; ++o) {
      const l = r[o], c = l.font, u = l.label;
      l.backdrop && (a.fillStyle = l.backdrop.color, a.fillRect(l.backdrop.left, l.backdrop.top, l.backdrop.width, l.backdrop.height));
      let d = l.textOffset;
      Ht(a, u, 0, d, c, l);
    }
    i && pi(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: i } } = this;
    if (!a.display)
      return;
    const r = ie(a.font), o = fe(a.padding), s = a.align;
    let l = r.lineHeight / 2;
    n === "bottom" || n === "center" || N(n) ? (l += o.bottom, K(a.text) && (l += r.lineHeight * (a.text.length - 1))) : l += o.top;
    const { titleX: c, titleY: u, maxWidth: d, rotation: f } = Ep(this, l, n, s);
    Ht(t, a.text, 0, 0, r, {
      color: a.color,
      maxWidth: d,
      rotation: f,
      textAlign: Bp(s, n, i),
      textBaseline: "middle",
      translation: [c, u]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = F(t.grid && t.grid.z, -1);
    return !this._isVisible() || this.draw !== qt.prototype.draw ? [{
      z: n,
      draw: (i) => {
        this.draw(i);
      }
    }] : [{
      z: a,
      draw: (i) => {
        this.drawBackground(), this.drawGrid(i), this.drawTitle();
      }
    }, {
      z: a + 1,
      draw: () => {
        this.drawBorder();
      }
    }, {
      z: n,
      draw: (i) => {
        this.drawLabels(i);
      }
    }];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", i = [];
    let r, o;
    for (r = 0, o = n.length; r < o; ++r) {
      const s = n[r];
      s[a] === this.id && (!t || s.type === t) && i.push(s);
    }
    return i;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return ie(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Pa {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Rp(n) && (a = this.register(n));
    const i = this.items, r = t.id, o = this.scope + "." + r;
    if (!r)
      throw new Error("class does not have id: " + t);
    return r in i || (i[r] = t, Ip(t, o, a), this.override && R.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, i = this.scope;
    a in n && delete n[a], i && a in R[i] && (delete R[i][a], this.override && delete Vt[a]);
  }
}
function Ip(e, t, n) {
  const a = aa(/* @__PURE__ */ Object.create(null), [
    n ? R.get(n) : {},
    R.get(t),
    e.defaults
  ]);
  R.set(t, a), e.defaultRoutes && Fp(t, e.defaultRoutes), e.descriptors && R.describe(t, e.descriptors);
}
function Fp(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), i = a.pop(), r = [e].concat(a).join("."), o = t[n].split("."), s = o.pop(), l = o.join(".");
    R.route(r, i, l, s);
  });
}
function Rp(e) {
  return "id" in e && "defaults" in e;
}
class Np {
  constructor() {
    this.controllers = new Pa(je, "datasets", !0), this.elements = new Pa(ze, "elements"), this.plugins = new Pa(Object, "plugins"), this.scales = new Pa(qt, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, n, a) {
    [...n].forEach((i) => {
      const r = a || this._getRegistryForType(i);
      a || r.isForType(i) || r === this.plugins && i.id ? this._exec(t, r, i) : W(i, (o) => {
        const s = a || this._getRegistryForType(o);
        this._exec(t, s, o);
      });
    });
  }
  _exec(t, n, a) {
    const i = uo(t);
    U(a["before" + i], [], a), n[t](a), U(a["after" + i], [], a);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const a = this._typedRegistries[n];
      if (a.isForType(t))
        return a;
    }
    return this.plugins;
  }
  _get(t, n, a) {
    const i = n.get(t);
    if (i === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return i;
  }
}
var qe = new Np();
class ki extends je {
  update(t) {
    const n = this._cachedMeta, { data: a = [] } = n, i = this.chart._animationsDisabled;
    let { start: r, count: o } = Vu(n, a, i);
    if (this._drawStart = r, this._drawCount = o, Hu(n) && (r = 0, o = a.length), this.options.showLine) {
      const { dataset: s, _dataset: l } = n;
      s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!l._decimated, s.points = a;
      const c = this.resolveDatasetElementOptions(t);
      c.segment = this.options.segment, this.updateElement(s, void 0, {
        animated: !i,
        options: c
      }, t);
    }
    this.updateElements(a, r, o, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = qe.getElement("line")), super.addElements();
  }
  updateElements(t, n, a, i) {
    const r = i === "reset", { iScale: o, vScale: s, _stacked: l, _dataset: c } = this._cachedMeta, u = this.resolveDataElementOptions(n, i), d = this.getSharedOptions(u), f = this.includeOptions(i, d), g = o.axis, m = s.axis, { spanGaps: v, segment: p } = this.options, b = un(v) ? v : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || r || i === "none";
    let w = n > 0 && this.getParsed(n - 1);
    for (let x = n; x < n + a; ++x) {
      const C = t[x], k = this.getParsed(x), M = y ? C : {}, L = V(k[m]), A = M[g] = o.getPixelForValue(k[g], x), $ = M[m] = r || L ? s.getBasePixel() : s.getPixelForValue(l ? this.applyStack(s, k, l) : k[m], x);
      M.skip = isNaN(A) || isNaN($) || L, M.stop = x > 0 && Math.abs(k[g] - w[g]) > b, p && (M.parsed = k, M.raw = c.data[x]), f && (M.options = d || this.resolveDataElementOptions(x, C.active ? "active" : i)), y || this.updateElement(C, x, M, i), w = k;
    }
    this.updateSharedOptions(d, i, u);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.data || [];
    if (!this.options.showLine) {
      let s = 0;
      for (let l = n.length - 1; l >= 0; --l)
        s = Math.max(s, n[l].size(this.resolveDataElementOptions(l)) / 2);
      return s > 0 && s;
    }
    const a = t.dataset, i = a.options && a.options.borderWidth || 0;
    if (!n.length)
      return i;
    const r = n[0].size(this.resolveDataElementOptions(0)), o = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(i, r, o) / 2;
  }
}
ki.id = "scatter";
ki.defaults = {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
};
ki.overrides = {
  interaction: {
    mode: "point"
  },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(e) {
          return "(" + e.label + ", " + e.formattedValue + ")";
        }
      }
    }
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
};
var jp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: yi,
  BubbleController: Ci,
  DoughnutController: gn,
  LineController: xi,
  PolarAreaController: _i,
  PieController: wo,
  RadarController: wi,
  ScatterController: ki
});
function Tt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Pr {
  constructor(t) {
    this.options = t || {};
  }
  init(t) {
  }
  formats() {
    return Tt();
  }
  parse(t, n) {
    return Tt();
  }
  format(t, n) {
    return Tt();
  }
  add(t, n, a) {
    return Tt();
  }
  diff(t, n, a) {
    return Tt();
  }
  startOf(t, n, a) {
    return Tt();
  }
  endOf(t, n) {
    return Tt();
  }
}
Pr.override = function(e) {
  Object.assign(Pr.prototype, e);
};
var zp = {
  _date: Pr
};
function Vp(e, t, n, a) {
  const { controller: i, data: r, _sorted: o } = e, s = i._cachedMeta.iScale;
  if (s && t === s.axis && t !== "r" && o && r.length) {
    const l = s._reversePixels ? Mv : lt;
    if (a) {
      if (i._sharedOptions) {
        const c = r[0], u = typeof c.getRange == "function" && c.getRange(t);
        if (u) {
          const d = l(r, t, n - u), f = l(r, t, n + u);
          return { lo: d.lo, hi: f.hi };
        }
      }
    } else
      return l(r, t, n);
  }
  return { lo: 0, hi: r.length - 1 };
}
function ha(e, t, n, a, i) {
  const r = e.getSortedVisibleDatasetMetas(), o = n[t];
  for (let s = 0, l = r.length; s < l; ++s) {
    const { index: c, data: u } = r[s], { lo: d, hi: f } = Vp(r[s], t, o, i);
    for (let g = d; g <= f; ++g) {
      const m = u[g];
      m.skip || a(m, c, g);
    }
  }
}
function Hp(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, i) {
    const r = t ? Math.abs(a.x - i.x) : 0, o = n ? Math.abs(a.y - i.y) : 0;
    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
  };
}
function er(e, t, n, a, i) {
  const r = [];
  return !i && !e.isPointInArea(t) || ha(e, n, t, function(s, l, c) {
    !i && !ra(s, e.chartArea, 0) || s.inRange(t.x, t.y, a) && r.push({ element: s, datasetIndex: l, index: c });
  }, !0), r;
}
function Wp(e, t, n, a) {
  let i = [];
  function r(o, s, l) {
    const { startAngle: c, endAngle: u } = o.getProps(["startAngle", "endAngle"], a), { angle: d } = Fu(o, { x: t.x, y: t.y });
    ia(d, c, u) && i.push({ element: o, datasetIndex: s, index: l });
  }
  return ha(e, n, t, r), i;
}
function Yp(e, t, n, a, i, r) {
  let o = [];
  const s = Hp(n);
  let l = Number.POSITIVE_INFINITY;
  function c(u, d, f) {
    const g = u.inRange(t.x, t.y, i);
    if (a && !g)
      return;
    const m = u.getCenterPoint(i);
    if (!(!!r || e.isPointInArea(m)) && !g)
      return;
    const p = s(t, m);
    p < l ? (o = [{ element: u, datasetIndex: d, index: f }], l = p) : p === l && o.push({ element: u, datasetIndex: d, index: f });
  }
  return ha(e, n, t, c), o;
}
function tr(e, t, n, a, i, r) {
  return !r && !e.isPointInArea(t) ? [] : n === "r" && !a ? Wp(e, t, n, i) : Yp(e, t, n, a, i, r);
}
function hl(e, t, n, a, i) {
  const r = [], o = n === "x" ? "inXRange" : "inYRange";
  let s = !1;
  return ha(e, n, t, (l, c, u) => {
    l[o](t[n], i) && (r.push({ element: l, datasetIndex: c, index: u }), s = s || l.inRange(t.x, t.y, i));
  }), a && !s ? [] : r;
}
var Up = {
  evaluateInteractionItems: ha,
  modes: {
    index(e, t, n, a) {
      const i = Lt(t, e), r = n.axis || "x", o = n.includeInvisible || !1, s = n.intersect ? er(e, i, r, a, o) : tr(e, i, r, !1, a, o), l = [];
      return s.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = s[0].index, d = c.data[u];
        d && !d.skip && l.push({ element: d, datasetIndex: c.index, index: u });
      }), l) : [];
    },
    dataset(e, t, n, a) {
      const i = Lt(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      let s = n.intersect ? er(e, i, r, a, o) : tr(e, i, r, !1, a, o);
      if (s.length > 0) {
        const l = s[0].datasetIndex, c = e.getDatasetMeta(l).data;
        s = [];
        for (let u = 0; u < c.length; ++u)
          s.push({ element: c[u], datasetIndex: l, index: u });
      }
      return s;
    },
    point(e, t, n, a) {
      const i = Lt(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      return er(e, i, r, a, o);
    },
    nearest(e, t, n, a) {
      const i = Lt(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      return tr(e, i, r, n.intersect, a, o);
    },
    x(e, t, n, a) {
      const i = Lt(t, e);
      return hl(e, i, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const i = Lt(t, e);
      return hl(e, i, "y", n.intersect, a);
    }
  }
};
const hd = ["left", "top", "right", "bottom"];
function Pn(e, t) {
  return e.filter((n) => n.pos === t);
}
function gl(e, t) {
  return e.filter((n) => hd.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Mn(e, t) {
  return e.sort((n, a) => {
    const i = t ? a : n, r = t ? n : a;
    return i.weight === r.weight ? i.index - r.index : i.weight - r.weight;
  });
}
function qp(e) {
  const t = [];
  let n, a, i, r, o, s;
  for (n = 0, a = (e || []).length; n < a; ++n)
    i = e[n], { position: r, options: { stack: o, stackWeight: s = 1 } } = i, t.push({
      index: n,
      box: i,
      pos: r,
      horizontal: i.isHorizontal(),
      weight: i.weight,
      stack: o && r + o,
      stackWeight: s
    });
  return t;
}
function Gp(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: i, stackWeight: r } = n;
    if (!a || !hd.includes(i))
      continue;
    const o = t[a] || (t[a] = { count: 0, placed: 0, weight: 0, size: 0 });
    o.count++, o.weight += r;
  }
  return t;
}
function Kp(e, t) {
  const n = Gp(e), { vBoxMaxWidth: a, hBoxMaxHeight: i } = t;
  let r, o, s;
  for (r = 0, o = e.length; r < o; ++r) {
    s = e[r];
    const { fullSize: l } = s.box, c = n[s.stack], u = c && s.stackWeight / c.weight;
    s.horizontal ? (s.width = u ? u * a : l && t.availableWidth, s.height = i) : (s.width = a, s.height = u ? u * i : l && t.availableHeight);
  }
  return n;
}
function Xp(e) {
  const t = qp(e), n = Mn(t.filter((c) => c.box.fullSize), !0), a = Mn(Pn(t, "left"), !0), i = Mn(Pn(t, "right")), r = Mn(Pn(t, "top"), !0), o = Mn(Pn(t, "bottom")), s = gl(t, "x"), l = gl(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(r),
    rightAndBottom: i.concat(l).concat(o).concat(s),
    chartArea: Pn(t, "chartArea"),
    vertical: a.concat(i).concat(l),
    horizontal: r.concat(o).concat(s)
  };
}
function ml(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function gd(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Zp(e, t, n, a) {
  const { pos: i, box: r } = n, o = e.maxPadding;
  if (!N(i)) {
    n.size && (e[i] -= n.size);
    const d = a[n.stack] || { size: 0, count: 1 };
    d.size = Math.max(d.size, n.horizontal ? r.height : r.width), n.size = d.size / d.count, e[i] += n.size;
  }
  r.getPadding && gd(o, r.getPadding());
  const s = Math.max(0, t.outerWidth - ml(o, e, "left", "right")), l = Math.max(0, t.outerHeight - ml(o, e, "top", "bottom")), c = s !== e.w, u = l !== e.h;
  return e.w = s, e.h = l, n.horizontal ? { same: c, other: u } : { same: u, other: c };
}
function Qp(e) {
  const t = e.maxPadding;
  function n(a) {
    const i = Math.max(t[a] - e[a], 0);
    return e[a] += i, i;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Jp(e, t) {
  const n = t.maxPadding;
  function a(i) {
    const r = { left: 0, top: 0, right: 0, bottom: 0 };
    return i.forEach((o) => {
      r[o] = Math.max(t[o], n[o]);
    }), r;
  }
  return a(e ? ["left", "right"] : ["top", "bottom"]);
}
function En(e, t, n, a) {
  const i = [];
  let r, o, s, l, c, u;
  for (r = 0, o = e.length, c = 0; r < o; ++r) {
    s = e[r], l = s.box, l.update(
      s.width || t.w,
      s.height || t.h,
      Jp(s.horizontal, t)
    );
    const { same: d, other: f } = Zp(t, n, s, a);
    c |= d && i.length, u = u || f, l.fullSize || i.push(s);
  }
  return c && En(i, t, n, a) || u;
}
function Ma(e, t, n, a, i) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + i, e.width = a, e.height = i;
}
function vl(e, t, n, a) {
  const i = n.padding;
  let { x: r, y: o } = t;
  for (const s of e) {
    const l = s.box, c = a[s.stack] || { count: 1, placed: 0, weight: 1 }, u = s.stackWeight / c.weight || 1;
    if (s.horizontal) {
      const d = t.w * u, f = c.size || l.height;
      $e(c.start) && (o = c.start), l.fullSize ? Ma(l, i.left, o, n.outerWidth - i.right - i.left, f) : Ma(l, t.left + c.placed, o, d, f), c.start = o, c.placed += d, o = l.bottom;
    } else {
      const d = t.h * u, f = c.size || l.width;
      $e(c.start) && (r = c.start), l.fullSize ? Ma(l, r, i.top, f, n.outerHeight - i.bottom - i.top) : Ma(l, r, t.top + c.placed, f, d), c.start = r, c.placed += d, r = l.right;
    }
  }
  t.x = r, t.y = o;
}
R.set("layout", {
  autoPadding: !0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
var de = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [{
        z: 0,
        draw(n) {
          t.draw(n);
        }
      }];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, a) {
    if (!e)
      return;
    const i = fe(e.options.layout.padding), r = Math.max(t - i.width, 0), o = Math.max(n - i.height, 0), s = Xp(e.boxes), l = s.vertical, c = s.horizontal;
    W(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const u = l.reduce((v, p) => p.box.options && p.box.options.display === !1 ? v : v + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: i,
      availableWidth: r,
      availableHeight: o,
      vBoxMaxWidth: r / 2 / u,
      hBoxMaxHeight: o / 2
    }), f = Object.assign({}, i);
    gd(f, fe(a));
    const g = Object.assign({
      maxPadding: f,
      w: r,
      h: o,
      x: i.left,
      y: i.top
    }, i), m = Kp(l.concat(c), d);
    En(s.fullSize, g, d, m), En(l, g, d, m), En(c, g, d, m) && En(l, g, d, m), Qp(g), vl(s.leftAndTop, g, d, m), g.x += g.w, g.y += g.h, vl(s.rightAndBottom, g, d, m), e.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, W(s.chartArea, (v) => {
      const p = v.box;
      Object.assign(p, e.chartArea), p.update(g.w, g.h, { left: 0, top: 0, right: 0, bottom: 0 });
    });
  }
};
class md {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, a) {
  }
  removeEventListener(t, n, a) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, a, i) {
    return n = Math.max(0, n || t.width), a = a || t.height, {
      width: n,
      height: Math.max(0, i ? Math.floor(n / i) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class eb extends md {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Na = "$chartjs", tb = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, pl = (e) => e === null || e === "";
function nb(e, t) {
  const n = e.style, a = e.getAttribute("height"), i = e.getAttribute("width");
  if (e[Na] = {
    initial: {
      height: a,
      width: i,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", pl(i)) {
    const r = Ks(e, "width");
    r !== void 0 && (e.width = r);
  }
  if (pl(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const r = Ks(e, "height");
      r !== void 0 && (e.height = r);
    }
  return e;
}
const vd = I0 ? { passive: !0 } : !1;
function ab(e, t, n) {
  e.addEventListener(t, n, vd);
}
function ib(e, t, n) {
  e.canvas.removeEventListener(t, n, vd);
}
function rb(e, t) {
  const n = tb[e.type] || e.type, { x: a, y: i } = Lt(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: i !== void 0 ? i : null
  };
}
function ni(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function ob(e, t, n) {
  const a = e.canvas, i = new MutationObserver((r) => {
    let o = !1;
    for (const s of r)
      o = o || ni(s.addedNodes, a), o = o && !ni(s.removedNodes, a);
    o && n();
  });
  return i.observe(document, { childList: !0, subtree: !0 }), i;
}
function sb(e, t, n) {
  const a = e.canvas, i = new MutationObserver((r) => {
    let o = !1;
    for (const s of r)
      o = o || ni(s.removedNodes, a), o = o && !ni(s.addedNodes, a);
    o && n();
  });
  return i.observe(document, { childList: !0, subtree: !0 }), i;
}
const sa = /* @__PURE__ */ new Map();
let bl = 0;
function pd() {
  const e = window.devicePixelRatio;
  e !== bl && (bl = e, sa.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function lb(e, t) {
  sa.size || window.addEventListener("resize", pd), sa.set(e, t);
}
function cb(e) {
  sa.delete(e), sa.size || window.removeEventListener("resize", pd);
}
function ub(e, t, n) {
  const a = e.canvas, i = a && _o(a);
  if (!i)
    return;
  const r = zu((s, l) => {
    const c = i.clientWidth;
    n(s, l), c < i.clientWidth && n();
  }, window), o = new ResizeObserver((s) => {
    const l = s[0], c = l.contentRect.width, u = l.contentRect.height;
    c === 0 && u === 0 || r(c, u);
  });
  return o.observe(i), lb(e, r), o;
}
function nr(e, t, n) {
  n && n.disconnect(), t === "resize" && cb(e);
}
function db(e, t, n) {
  const a = e.canvas, i = zu((r) => {
    e.ctx !== null && n(rb(r, e));
  }, e, (r) => {
    const o = r[0];
    return [o, o.offsetX, o.offsetY];
  });
  return ab(a, t, i), i;
}
class fb extends md {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (nb(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Na])
      return !1;
    const a = n[Na].initial;
    ["height", "width"].forEach((r) => {
      const o = a[r];
      V(o) ? n.removeAttribute(r) : n.setAttribute(r, o);
    });
    const i = a.style || {};
    return Object.keys(i).forEach((r) => {
      n.style[r] = i[r];
    }), n.width = n.width, delete n[Na], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const i = t.$proxies || (t.$proxies = {}), o = {
      attach: ob,
      detach: sb,
      resize: ub
    }[n] || db;
    i[n] = o(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), i = a[n];
    if (!i)
      return;
    ({
      attach: nr,
      detach: nr,
      resize: nr
    }[n] || ib)(t, n, i), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, i) {
    return E0(t, n, a, i);
  }
  isAttached(t) {
    const n = _o(t);
    return !!(n && n.isConnected);
  }
}
function hb(e) {
  return !ad() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? eb : fb;
}
class gb {
  constructor() {
    this._init = [];
  }
  notify(t, n, a, i) {
    n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const r = i ? this._descriptors(t).filter(i) : this._descriptors(t), o = this._notify(r, t, n, a);
    return n === "afterDestroy" && (this._notify(r, t, "stop"), this._notify(this._init, t, "uninstall")), o;
  }
  _notify(t, n, a, i) {
    i = i || {};
    for (const r of t) {
      const o = r.plugin, s = o[a], l = [n, i, r.options];
      if (U(s, l, o) === !1 && i.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    V(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, i = F(a.options && a.options.plugins, {}), r = mb(a);
    return i === !1 && !n ? [] : pb(t, r, i, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, i = (r, o) => r.filter((s) => !o.some((l) => s.plugin.id === l.plugin.id));
    this._notify(i(n, a), t, "stop"), this._notify(i(a, n), t, "start");
  }
}
function mb(e) {
  const t = {}, n = [], a = Object.keys(qe.plugins.items);
  for (let r = 0; r < a.length; r++)
    n.push(qe.getPlugin(a[r]));
  const i = e.plugins || [];
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    n.indexOf(o) === -1 && (n.push(o), t[o.id] = !0);
  }
  return { plugins: n, localIds: t };
}
function vb(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function pb(e, { plugins: t, localIds: n }, a, i) {
  const r = [], o = e.getContext();
  for (const s of t) {
    const l = s.id, c = vb(a[l], i);
    c !== null && r.push({
      plugin: s,
      options: bb(e.config, { plugin: s, local: n[l] }, c, o)
    });
  }
  return r;
}
function bb(e, { plugin: t, local: n }, a, i) {
  const r = e.pluginScopeKeys(t), o = e.getOptionScopes(a, r);
  return n && t.defaults && o.push(t.defaults), e.createResolver(o, i, [""], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Mr(e, t) {
  const n = R.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function yb(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Cb(e, t) {
  return e === t ? "_index_" : "_value_";
}
function xb(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Tr(e, t) {
  return e === "x" || e === "y" ? e : t.axis || xb(t.position) || e.charAt(0).toLowerCase();
}
function _b(e, t) {
  const n = Vt[e.type] || { scales: {} }, a = t.scales || {}, i = Mr(e.type, t), r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((s) => {
    const l = a[s];
    if (!N(l))
      return console.error(`Invalid scale configuration for scale: ${s}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${s}`);
    const c = Tr(s, l), u = Cb(c, i), d = n.scales || {};
    r[c] = r[c] || s, o[s] = Wn(/* @__PURE__ */ Object.create(null), [{ axis: c }, l, d[c], d[u]]);
  }), e.data.datasets.forEach((s) => {
    const l = s.type || e.type, c = s.indexAxis || Mr(l, t), d = (Vt[l] || {}).scales || {};
    Object.keys(d).forEach((f) => {
      const g = yb(f, c), m = s[g + "AxisID"] || r[g] || g;
      o[m] = o[m] || /* @__PURE__ */ Object.create(null), Wn(o[m], [{ axis: g }, a[m], d[f]]);
    });
  }), Object.keys(o).forEach((s) => {
    const l = o[s];
    Wn(l, [R.scales[l.type], R.scale]);
  }), o;
}
function bd(e) {
  const t = e.options || (e.options = {});
  t.plugins = F(t.plugins, {}), t.scales = _b(e, t);
}
function yd(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function wb(e) {
  return e = e || {}, e.data = yd(e.data), bd(e), e;
}
const yl = /* @__PURE__ */ new Map(), Cd = /* @__PURE__ */ new Set();
function Ta(e, t) {
  let n = yl.get(e);
  return n || (n = t(), yl.set(e, n), Cd.add(n)), n;
}
const Tn = (e, t, n) => {
  const a = xt(t, n);
  a !== void 0 && e.add(a);
};
class Sb {
  constructor(t) {
    this._config = wb(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = yd(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), bd(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Ta(
      t,
      () => [[
        `datasets.${t}`,
        ""
      ]]
    );
  }
  datasetAnimationScopeKeys(t, n) {
    return Ta(
      `${t}.transition.${n}`,
      () => [
        [
          `datasets.${t}.transitions.${n}`,
          `transitions.${n}`
        ],
        [
          `datasets.${t}`,
          ""
        ]
      ]
    );
  }
  datasetElementScopeKeys(t, n) {
    return Ta(
      `${t}-${n}`,
      () => [[
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]]
    );
  }
  pluginScopeKeys(t) {
    const n = t.id, a = this.type;
    return Ta(
      `${a}-plugin-${n}`,
      () => [[
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]]
    );
  }
  _cachedScopes(t, n) {
    const a = this._scopeCache;
    let i = a.get(t);
    return (!i || n) && (i = /* @__PURE__ */ new Map(), a.set(t, i)), i;
  }
  getOptionScopes(t, n, a) {
    const { options: i, type: r } = this, o = this._cachedScopes(t, a), s = o.get(n);
    if (s)
      return s;
    const l = /* @__PURE__ */ new Set();
    n.forEach((u) => {
      t && (l.add(t), u.forEach((d) => Tn(l, t, d))), u.forEach((d) => Tn(l, i, d)), u.forEach((d) => Tn(l, Vt[r] || {}, d)), u.forEach((d) => Tn(l, R, d)), u.forEach((d) => Tn(l, Or, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Cd.has(n) && o.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Vt[n] || {},
      R.datasets[n] || {},
      { type: n },
      R,
      Or
    ];
  }
  resolveNamedOptions(t, n, a, i = [""]) {
    const r = { $shared: !0 }, { resolver: o, subPrefixes: s } = Cl(this._resolverCache, t, i);
    let l = o;
    if (Ob(o, n)) {
      r.$shared = !1, a = _t(a) ? a() : a;
      const c = this.createResolver(t, a, s);
      l = dn(o, a, c);
    }
    for (const c of n)
      r[c] = l[c];
    return r;
  }
  createResolver(t, n, a = [""], i) {
    const { resolver: r } = Cl(this._resolverCache, t, a);
    return N(n) ? dn(r, n, void 0, i) : r;
  }
}
function Cl(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const i = n.join();
  let r = a.get(i);
  return r || (r = {
    resolver: yo(t, n),
    subPrefixes: n.filter((s) => !s.toLowerCase().includes("hover"))
  }, a.set(i, r)), r;
}
const kb = (e) => N(e) && Object.getOwnPropertyNames(e).reduce((t, n) => t || _t(e[n]), !1);
function Ob(e, t) {
  const { isScriptable: n, isIndexable: a } = Zu(e);
  for (const i of t) {
    const r = n(i), o = a(i), s = (o || r) && e[i];
    if (r && (_t(s) || kb(s)) || o && K(s))
      return !0;
  }
  return !1;
}
var Db = "3.9.1";
const Pb = ["top", "bottom", "left", "right", "chartArea"];
function xl(e, t) {
  return e === "top" || e === "bottom" || Pb.indexOf(e) === -1 && t === "x";
}
function _l(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function wl(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), U(n && n.onComplete, [e], t);
}
function Mb(e) {
  const t = e.chart, n = t.options.animation;
  U(n && n.onProgress, [e], t);
}
function xd(e) {
  return ad() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ai = {}, _d = (e) => {
  const t = xd(e);
  return Object.values(ai).filter((n) => n.canvas === t).pop();
};
function Tb(e, t, n) {
  const a = Object.keys(e);
  for (const i of a) {
    const r = +i;
    if (r >= t) {
      const o = e[i];
      delete e[i], (n > 0 || r > t) && (e[r + n] = o);
    }
  }
}
function Ab(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
class Oi {
  constructor(t, n) {
    const a = this.config = new Sb(n), i = xd(t), r = _d(i);
    if (r)
      throw new Error(
        "Canvas is already in use. Chart with ID '" + r.id + "' must be destroyed before the canvas with ID '" + r.canvas.id + "' can be reused."
      );
    const o = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || hb(i))(), this.platform.updateConfig(a);
    const s = this.platform.acquireContext(i, o.aspectRatio), l = s && s.canvas, c = l && l.height, u = l && l.width;
    if (this.id = vv(), this.ctx = s, this.canvas = l, this.width = u, this.height = c, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new gb(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Lv((d) => this.update(d), o.resizeDelay || 0), this._dataChanges = [], ai[this.id] = this, !s || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    at.listen(this, "complete", wl), at.listen(this, "progress", Mb), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: i, _aspectRatio: r } = this;
    return V(t) ? n && r ? r : i ? a / i : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Gs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ys(this.canvas, this.ctx), this;
  }
  stop() {
    return at.stop(this), this;
  }
  resize(t, n) {
    at.running(this) ? this._resizeBeforeDraw = { width: t, height: n } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, i = this.canvas, r = a.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(i, t, n, r), s = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Gs(this, s, !0) && (this.notifyPlugins("resize", { size: o }), U(a.onResize, [this, o], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    W(n, (a, i) => {
      a.id = i;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, i = Object.keys(a).reduce((o, s) => (o[s] = !1, o), {});
    let r = [];
    n && (r = r.concat(
      Object.keys(n).map((o) => {
        const s = n[o], l = Tr(o, s), c = l === "r", u = l === "x";
        return {
          options: s,
          dposition: c ? "chartArea" : u ? "bottom" : "left",
          dtype: c ? "radialLinear" : u ? "category" : "linear"
        };
      })
    )), W(r, (o) => {
      const s = o.options, l = s.id, c = Tr(l, s), u = F(s.type, o.dtype);
      (s.position === void 0 || xl(s.position, c) !== xl(o.dposition)) && (s.position = o.dposition), i[l] = !0;
      let d = null;
      if (l in a && a[l].type === u)
        d = a[l];
      else {
        const f = qe.getScale(u);
        d = new f({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[d.id] = d;
      }
      d.init(s, t);
    }), W(i, (o, s) => {
      o || delete a[s];
    }), W(a, (o) => {
      de.configure(this, o, o.options), de.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((i, r) => i.index - r.index), a > n) {
      for (let i = n; i < a; ++i)
        this._destroyDatasetMeta(i);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(_l("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((a, i) => {
      n.filter((r) => r === a._dataset).length === 0 && this._destroyDatasetMeta(i);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let a, i;
    for (this._removeUnreferencedMetasets(), a = 0, i = n.length; a < i; a++) {
      const r = n[a];
      let o = this.getDatasetMeta(a);
      const s = r.type || this.config.type;
      if (o.type && o.type !== s && (this._destroyDatasetMeta(a), o = this.getDatasetMeta(a)), o.type = s, o.indexAxis = r.indexAxis || Mr(s, this.options), o.order = r.order || 0, o.index = a, o.label = "" + r.label, o.visible = this.isDatasetVisible(a), o.controller)
        o.controller.updateIndex(a), o.controller.linkScales();
      else {
        const l = qe.getController(s), { datasetElementType: c, dataElementType: u } = R.datasets[s];
        Object.assign(l.prototype, {
          dataElementType: qe.getElement(u),
          datasetElementType: c && qe.getElement(c)
        }), o.controller = new l(this, a), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    W(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const a = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), i = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }) === !1)
      return;
    const r = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: d } = this.getDatasetMeta(c), f = !i && r.indexOf(d) === -1;
      d.buildOrUpdateElements(f), o = Math.max(+d.getMaxOverflow(), o);
    }
    o = this._minPadding = a.layout.autoPadding ? o : 0, this._updateLayout(o), i || W(r, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", { mode: t }), this._layers.sort(_l("z", "_idx"));
    const { _active: s, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : s.length && this._updateHoverStyles(s, s, !0), this.render();
  }
  _updateScales() {
    W(this.scales, (t) => {
      de.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!$s(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: i, count: r } of n) {
      const o = a === "_removeElements" ? -r : r;
      Tb(t, i, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (r) => new Set(
      t.filter((o) => o[0] === r).map((o, s) => s + "," + o.splice(1).join(","))
    ), i = a(0);
    for (let r = 1; r < n; r++)
      if (!$s(i, a(r)))
        return;
    return Array.from(i).map((r) => r.split(",")).map((r) => ({ method: r[1], start: +r[2], count: +r[3] }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", { cancelable: !0 }) === !1)
      return;
    de.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], W(this.boxes, (i) => {
      a && i.position === "chartArea" || (i.configure && i.configure(), this._layers.push(...i._layers()));
    }, this), this._layers.forEach((i, r) => {
      i._idx = r;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", { mode: t, cancelable: !0 }) !== !1) {
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this._updateDataset(n, _t(t) ? t({ datasetIndex: n }) : t);
      this.notifyPlugins("afterDatasetsUpdate", { mode: t });
    }
  }
  _updateDataset(t, n) {
    const a = this.getDatasetMeta(t), i = { meta: a, index: t, mode: n, cancelable: !0 };
    this.notifyPlugins("beforeDatasetUpdate", i) !== !1 && (a.controller._update(n), i.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", i));
  }
  render() {
    this.notifyPlugins("beforeRender", { cancelable: !0 }) !== !1 && (at.has(this) ? this.attached && !at.running(this) && at.start(this) : (this.draw(), wl({ chart: this })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: i } = this._resizeBeforeDraw;
      this._resize(a, i), this._resizeBeforeDraw = null;
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", { cancelable: !0 }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, a = [];
    let i, r;
    for (i = 0, r = n.length; i < r; ++i) {
      const o = n[i];
      (!t || o.visible) && a.push(o);
    }
    return a;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, a = t._clip, i = !a.disabled, r = this.chartArea, o = {
      meta: t,
      index: t.index,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetDraw", o) !== !1 && (i && vi(n, {
      left: a.left === !1 ? 0 : r.left - a.left,
      right: a.right === !1 ? this.width : r.right + a.right,
      top: a.top === !1 ? 0 : r.top - a.top,
      bottom: a.bottom === !1 ? this.height : r.bottom + a.bottom
    }), t.controller.draw(), i && pi(n), o.cancelable = !1, this.notifyPlugins("afterDatasetDraw", o));
  }
  isPointInArea(t) {
    return ra(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, i) {
    const r = Up.modes[n];
    return typeof r == "function" ? r(this, t, a, i) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], a = this._metasets;
    let i = a.filter((r) => r && r._dataset === n).pop();
    return i || (i = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, a.push(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = St(null, { chart: this, type: "chart" }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const a = this.getDatasetMeta(t);
    return typeof a.hidden == "boolean" ? !a.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const a = this.getDatasetMeta(t);
    a.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, a) {
    const i = a ? "show" : "hide", r = this.getDatasetMeta(t), o = r.controller._resolveAnimations(void 0, i);
    $e(n) ? (r.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), o.update(r, { visible: a }), this.update((s) => s.datasetIndex === t ? i : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), at.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ys(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), this.notifyPlugins("destroy"), delete ai[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, a = (r, o) => {
      n.addEventListener(this, r, o), t[r] = o;
    }, i = (r, o, s) => {
      r.offsetX = o, r.offsetY = s, this._eventHandler(r);
    };
    W(this.options.events, (r) => a(r, i));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (l, c) => {
      n.addEventListener(this, l, c), t[l] = c;
    }, i = (l, c) => {
      t[l] && (n.removeEventListener(this, l, c), delete t[l]);
    }, r = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let o;
    const s = () => {
      i("attach", s), this.attached = !0, this.resize(), a("resize", r), a("detach", o);
    };
    o = () => {
      this.attached = !1, i("resize", r), this._stop(), this._resize(0, 0), a("attach", s);
    }, n.isAttached(this.canvas) ? s() : o();
  }
  unbindEvents() {
    W(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, W(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const i = a ? "set" : "remove";
    let r, o, s, l;
    for (n === "dataset" && (r = this.getDatasetMeta(t[0].datasetIndex), r.controller["_" + i + "DatasetHoverStyle"]()), s = 0, l = t.length; s < l; ++s) {
      o = t[s];
      const c = o && this.getDatasetMeta(o.datasetIndex).controller;
      c && c[i + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], a = t.map(({ datasetIndex: r, index: o }) => {
      const s = this.getDatasetMeta(r);
      if (!s)
        throw new Error("No dataset found at index " + r);
      return {
        datasetIndex: r,
        element: s.data[o],
        index: o
      };
    });
    !Xa(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  _updateHoverStyles(t, n, a) {
    const i = this.options.hover, r = (l, c) => l.filter((u) => !c.some((d) => u.datasetIndex === d.datasetIndex && u.index === d.index)), o = r(n, t), s = a ? t : r(t, n);
    o.length && this.updateHoverStyle(o, i.mode, !1), s.length && i.mode && this.updateHoverStyle(s, i.mode, !0);
  }
  _eventHandler(t, n) {
    const a = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, i = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, i) === !1)
      return;
    const r = this._handleEvent(t, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, i), (r || a.changed) && this.render(), this;
  }
  _handleEvent(t, n, a) {
    const { _active: i = [], options: r } = this, o = n, s = this._getActiveElements(t, i, a, o), l = _v(t), c = Ab(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, U(r.onHover, [t, s, this], this), l && U(r.onClick, [t, s, this], this));
    const u = !Xa(s, i);
    return (u || n) && (this._active = s, this._updateHoverStyles(s, i, n)), this._lastEvent = c, u;
  }
  _getActiveElements(t, n, a, i) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return n;
    const r = this.options.hover;
    return this.getElementsAtEventForMode(t, r.mode, r, i);
  }
}
const Sl = () => W(Oi.instances, (e) => e._plugins.invalidate()), gt = !0;
Object.defineProperties(Oi, {
  defaults: {
    enumerable: gt,
    value: R
  },
  instances: {
    enumerable: gt,
    value: ai
  },
  overrides: {
    enumerable: gt,
    value: Vt
  },
  registry: {
    enumerable: gt,
    value: qe
  },
  version: {
    enumerable: gt,
    value: Db
  },
  getChart: {
    enumerable: gt,
    value: _d
  },
  register: {
    enumerable: gt,
    value: (...e) => {
      qe.add(...e), Sl();
    }
  },
  unregister: {
    enumerable: gt,
    value: (...e) => {
      qe.remove(...e), Sl();
    }
  }
});
function wd(e, t, n) {
  const { startAngle: a, pixelMargin: i, x: r, y: o, outerRadius: s, innerRadius: l } = t;
  let c = i / s;
  e.beginPath(), e.arc(r, o, s, a - c, n + c), l > i ? (c = i / l, e.arc(r, o, l, n + c, a - c, !0)) : e.arc(r, o, i, n + ee, a - ee), e.closePath(), e.clip();
}
function Lb(e) {
  return bo(e, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
}
function $b(e, t, n, a) {
  const i = Lb(e.options.borderRadius), r = (n - t) / 2, o = Math.min(r, a * t / 2), s = (l) => {
    const c = (n - Math.min(r, l)) * a / 2;
    return re(l, 0, Math.min(r, c));
  };
  return {
    outerStart: s(i.outerStart),
    outerEnd: s(i.outerEnd),
    innerStart: re(i.innerStart, 0, o),
    innerEnd: re(i.innerEnd, 0, o)
  };
}
function Qt(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function Ar(e, t, n, a, i, r) {
  const { x: o, y: s, startAngle: l, pixelMargin: c, innerRadius: u } = t, d = Math.max(t.outerRadius + a + n - c, 0), f = u > 0 ? u + a + n + c : 0;
  let g = 0;
  const m = i - l;
  if (a) {
    const B = u > 0 ? u - a : 0, I = d > 0 ? d - a : 0, z = (B + I) / 2, he = z !== 0 ? m * z / (z + a) : m;
    g = (m - he) / 2;
  }
  const v = Math.max(1e-3, m * d - n / Z) / d, p = (m - v) / 2, b = l + p + g, y = i - p - g, { outerStart: w, outerEnd: x, innerStart: C, innerEnd: k } = $b(t, f, d, y - b), M = d - w, L = d - x, A = b + w / M, $ = y - x / L, D = f + C, _ = f + k, T = b + C / D, P = y - k / _;
  if (e.beginPath(), r) {
    if (e.arc(o, s, d, A, $), x > 0) {
      const z = Qt(L, $, o, s);
      e.arc(z.x, z.y, x, $, y + ee);
    }
    const B = Qt(_, y, o, s);
    if (e.lineTo(B.x, B.y), k > 0) {
      const z = Qt(_, P, o, s);
      e.arc(z.x, z.y, k, y + ee, P + Math.PI);
    }
    if (e.arc(o, s, f, y - k / f, b + C / f, !0), C > 0) {
      const z = Qt(D, T, o, s);
      e.arc(z.x, z.y, C, T + Math.PI, b - ee);
    }
    const I = Qt(M, b, o, s);
    if (e.lineTo(I.x, I.y), w > 0) {
      const z = Qt(M, A, o, s);
      e.arc(z.x, z.y, w, b - ee, A);
    }
  } else {
    e.moveTo(o, s);
    const B = Math.cos(A) * d + o, I = Math.sin(A) * d + s;
    e.lineTo(B, I);
    const z = Math.cos($) * d + o, he = Math.sin($) * d + s;
    e.lineTo(z, he);
  }
  e.closePath();
}
function Bb(e, t, n, a, i) {
  const { fullCircles: r, startAngle: o, circumference: s } = t;
  let l = t.endAngle;
  if (r) {
    Ar(e, t, n, a, o + Y, i);
    for (let c = 0; c < r; ++c)
      e.fill();
    isNaN(s) || (l = o + s % Y, s % Y === 0 && (l += Y));
  }
  return Ar(e, t, n, a, l, i), e.fill(), l;
}
function Eb(e, t, n) {
  const { x: a, y: i, startAngle: r, pixelMargin: o, fullCircles: s } = t, l = Math.max(t.outerRadius - o, 0), c = t.innerRadius + o;
  let u;
  for (n && wd(e, t, r + Y), e.beginPath(), e.arc(a, i, c, r + Y, r, !0), u = 0; u < s; ++u)
    e.stroke();
  for (e.beginPath(), e.arc(a, i, l, r, r + Y), u = 0; u < s; ++u)
    e.stroke();
}
function Ib(e, t, n, a, i, r) {
  const { options: o } = t, { borderWidth: s, borderJoinStyle: l } = o, c = o.borderAlign === "inner";
  s && (c ? (e.lineWidth = s * 2, e.lineJoin = l || "round") : (e.lineWidth = s, e.lineJoin = l || "bevel"), t.fullCircles && Eb(e, t, c), c && wd(e, t, i), Ar(e, t, n, a, i, r), e.stroke());
}
class Di extends ze {
  constructor(t) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t);
  }
  inRange(t, n, a) {
    const i = this.getProps(["x", "y"], a), { angle: r, distance: o } = Fu(i, { x: t, y: n }), { startAngle: s, endAngle: l, innerRadius: c, outerRadius: u, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = this.options.spacing / 2, m = F(d, l - s) >= Y || ia(r, s, l), v = st(o, c + f, u + f);
    return m && v;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: i, endAngle: r, innerRadius: o, outerRadius: s } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], t), { offset: l, spacing: c } = this.options, u = (i + r) / 2, d = (o + s + c + l) / 2;
    return {
      x: n + Math.cos(u) * d,
      y: a + Math.sin(u) * d
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, i = (n.offset || 0) / 2, r = (n.spacing || 0) / 2, o = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Y ? Math.floor(a / Y) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    let s = 0;
    if (i) {
      s = i / 2;
      const c = (this.startAngle + this.endAngle) / 2;
      t.translate(Math.cos(c) * s, Math.sin(c) * s), this.circumference >= Z && (s = i);
    }
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor;
    const l = Bb(t, this, s, r, o);
    Ib(t, this, s, r, l, o), t.restore();
  }
}
Di.id = "arc";
Di.defaults = {
  borderAlign: "center",
  borderColor: "#fff",
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0
};
Di.defaultRoutes = {
  backgroundColor: "backgroundColor"
};
function Sd(e, t, n = t) {
  e.lineCap = F(n.borderCapStyle, t.borderCapStyle), e.setLineDash(F(n.borderDash, t.borderDash)), e.lineDashOffset = F(n.borderDashOffset, t.borderDashOffset), e.lineJoin = F(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = F(n.borderWidth, t.borderWidth), e.strokeStyle = F(n.borderColor, t.borderColor);
}
function Fb(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Rb(e) {
  return e.stepped ? r0 : e.tension || e.cubicInterpolationMode === "monotone" ? o0 : Fb;
}
function kd(e, t, n = {}) {
  const a = e.length, { start: i = 0, end: r = a - 1 } = n, { start: o, end: s } = t, l = Math.max(i, o), c = Math.min(r, s), u = i < o && r < o || i > s && r > s;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: c < l && !u ? a + c - l : c - l
  };
}
function Nb(e, t, n, a) {
  const { points: i, options: r } = t, { count: o, start: s, loop: l, ilen: c } = kd(i, n, a), u = Rb(r);
  let { move: d = !0, reverse: f } = a || {}, g, m, v;
  for (g = 0; g <= c; ++g)
    m = i[(s + (f ? c - g : g)) % o], !m.skip && (d ? (e.moveTo(m.x, m.y), d = !1) : u(e, v, m, f, r.stepped), v = m);
  return l && (m = i[(s + (f ? c : 0)) % o], u(e, v, m, f, r.stepped)), !!l;
}
function jb(e, t, n, a) {
  const i = t.points, { count: r, start: o, ilen: s } = kd(i, n, a), { move: l = !0, reverse: c } = a || {};
  let u = 0, d = 0, f, g, m, v, p, b;
  const y = (x) => (o + (c ? s - x : x)) % r, w = () => {
    v !== p && (e.lineTo(u, p), e.lineTo(u, v), e.lineTo(u, b));
  };
  for (l && (g = i[y(0)], e.moveTo(g.x, g.y)), f = 0; f <= s; ++f) {
    if (g = i[y(f)], g.skip)
      continue;
    const x = g.x, C = g.y, k = x | 0;
    k === m ? (C < v ? v = C : C > p && (p = C), u = (d * u + x) / ++d) : (w(), e.lineTo(x, C), m = k, d = 0, v = p = C), b = C;
  }
  w();
}
function Lr(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? jb : Nb;
}
function zb(e) {
  return e.stepped ? F0 : e.tension || e.cubicInterpolationMode === "monotone" ? R0 : $t;
}
function Vb(e, t, n, a) {
  let i = t._path;
  i || (i = t._path = new Path2D(), t.path(i, n, a) && i.closePath()), Sd(e, t.options), e.stroke(i);
}
function Hb(e, t, n, a) {
  const { segments: i, options: r } = t, o = Lr(t);
  for (const s of i)
    Sd(e, r, s.style), e.beginPath(), o(e, t, s, { start: n, end: n + a - 1 }) && e.closePath(), e.stroke();
}
const Wb = typeof Path2D == "function";
function Yb(e, t, n, a) {
  Wb && !t.options.segment ? Vb(e, t, n, a) : Hb(e, t, n, a);
}
class kt extends ze {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const a = this.options;
    if ((a.tension || a.cubicInterpolationMode === "monotone") && !a.stepped && !this._pointsUpdated) {
      const i = a.spanGaps ? this._loop : this._fullLoop;
      M0(this._points, a, t, i, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Y0(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, a = t.length;
    return a && n[t[a - 1].end];
  }
  interpolate(t, n) {
    const a = this.options, i = t[n], r = this.points, o = ld(this, { property: n, start: i, end: i });
    if (!o.length)
      return;
    const s = [], l = zb(a);
    let c, u;
    for (c = 0, u = o.length; c < u; ++c) {
      const { start: d, end: f } = o[c], g = r[d], m = r[f];
      if (g === m) {
        s.push(g);
        continue;
      }
      const v = Math.abs((i - g[n]) / (m[n] - g[n])), p = l(g, m, v, a.stepped);
      p[n] = t[n], s.push(p);
    }
    return s.length === 1 ? s[0] : s;
  }
  pathSegment(t, n, a) {
    return Lr(this)(t, this, n, a);
  }
  path(t, n, a) {
    const i = this.segments, r = Lr(this);
    let o = this._loop;
    n = n || 0, a = a || this.points.length - n;
    for (const s of i)
      o &= r(t, this, s, { start: n, end: n + a - 1 });
    return !!o;
  }
  draw(t, n, a, i) {
    const r = this.options || {};
    (this.points || []).length && r.borderWidth && (t.save(), Yb(t, this, a, i), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
kt.id = "line";
kt.defaults = {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
};
kt.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
kt.descriptors = {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
};
function kl(e, t, n, a) {
  const i = e.options, { [n]: r } = e.getProps([n], a);
  return Math.abs(t - r) < i.radius + i.hitRadius;
}
class Pi extends ze {
  constructor(t) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
  }
  inRange(t, n, a) {
    const i = this.options, { x: r, y: o } = this.getProps(["x", "y"], a);
    return Math.pow(t - r, 2) + Math.pow(n - o, 2) < Math.pow(i.hitRadius + i.radius, 2);
  }
  inXRange(t, n) {
    return kl(this, t, "x", n);
  }
  inYRange(t, n) {
    return kl(this, t, "y", n);
  }
  getCenterPoint(t) {
    const { x: n, y: a } = this.getProps(["x", "y"], t);
    return { x: n, y: a };
  }
  size(t) {
    t = t || this.options || {};
    let n = t.radius || 0;
    n = Math.max(n, n && t.hoverRadius || 0);
    const a = n && t.borderWidth || 0;
    return (n + a) * 2;
  }
  draw(t, n) {
    const a = this.options;
    this.skip || a.radius < 0.1 || !ra(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Dr(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
Pi.id = "point";
Pi.defaults = {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
};
Pi.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
function Od(e, t) {
  const { x: n, y: a, base: i, width: r, height: o } = e.getProps(["x", "y", "base", "width", "height"], t);
  let s, l, c, u, d;
  return e.horizontal ? (d = o / 2, s = Math.min(n, i), l = Math.max(n, i), c = a - d, u = a + d) : (d = r / 2, s = n - d, l = n + d, c = Math.min(a, i), u = Math.max(a, i)), { left: s, top: c, right: l, bottom: u };
}
function yt(e, t, n, a) {
  return e ? 0 : re(t, n, a);
}
function Ub(e, t, n) {
  const a = e.options.borderWidth, i = e.borderSkipped, r = Xu(a);
  return {
    t: yt(i.top, r.top, 0, n),
    r: yt(i.right, r.right, 0, t),
    b: yt(i.bottom, r.bottom, 0, n),
    l: yt(i.left, r.left, 0, t)
  };
}
function qb(e, t, n) {
  const { enableBorderRadius: a } = e.getProps(["enableBorderRadius"]), i = e.options.borderRadius, r = Ft(i), o = Math.min(t, n), s = e.borderSkipped, l = a || N(i);
  return {
    topLeft: yt(!l || s.top || s.left, r.topLeft, 0, o),
    topRight: yt(!l || s.top || s.right, r.topRight, 0, o),
    bottomLeft: yt(!l || s.bottom || s.left, r.bottomLeft, 0, o),
    bottomRight: yt(!l || s.bottom || s.right, r.bottomRight, 0, o)
  };
}
function Gb(e) {
  const t = Od(e), n = t.right - t.left, a = t.bottom - t.top, i = Ub(e, n / 2, a / 2), r = qb(e, n / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: a,
      radius: r
    },
    inner: {
      x: t.left + i.l,
      y: t.top + i.t,
      w: n - i.l - i.r,
      h: a - i.t - i.b,
      radius: {
        topLeft: Math.max(0, r.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, r.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, r.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, r.bottomRight - Math.max(i.b, i.r))
      }
    }
  };
}
function ar(e, t, n, a) {
  const i = t === null, r = n === null, s = e && !(i && r) && Od(e, a);
  return s && (i || st(t, s.left, s.right)) && (r || st(n, s.top, s.bottom));
}
function Kb(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Xb(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ir(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, i = e.y !== n.y ? -t : 0, r = (e.x + e.w !== n.x + n.w ? t : 0) - a, o = (e.y + e.h !== n.y + n.h ? t : 0) - i;
  return {
    x: e.x + a,
    y: e.y + i,
    w: e.w + r,
    h: e.h + o,
    radius: e.radius
  };
}
class Mi extends ze {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: i } } = this, { inner: r, outer: o } = Gb(this), s = Kb(o.radius) ? oa : Xb;
    t.save(), (o.w !== r.w || o.h !== r.h) && (t.beginPath(), s(t, ir(o, n, r)), t.clip(), s(t, ir(r, -n, o)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), s(t, ir(r, n)), t.fillStyle = i, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return ar(this, t, n, a);
  }
  inXRange(t, n) {
    return ar(this, t, null, n);
  }
  inYRange(t, n) {
    return ar(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: a, base: i, horizontal: r } = this.getProps(["x", "y", "base", "horizontal"], t);
    return {
      x: r ? (n + i) / 2 : n,
      y: r ? a : (a + i) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
Mi.id = "bar";
Mi.defaults = {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
};
Mi.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
var Zb = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Di,
  LineElement: kt,
  PointElement: Pi,
  BarElement: Mi
});
function Qb(e, t, n, a, i) {
  const r = i.samples || a;
  if (r >= n)
    return e.slice(t, t + n);
  const o = [], s = (n - 2) / (r - 2);
  let l = 0;
  const c = t + n - 1;
  let u = t, d, f, g, m, v;
  for (o[l++] = e[u], d = 0; d < r - 2; d++) {
    let p = 0, b = 0, y;
    const w = Math.floor((d + 1) * s) + 1 + t, x = Math.min(Math.floor((d + 2) * s) + 1, n) + t, C = x - w;
    for (y = w; y < x; y++)
      p += e[y].x, b += e[y].y;
    p /= C, b /= C;
    const k = Math.floor(d * s) + 1 + t, M = Math.min(Math.floor((d + 1) * s) + 1, n) + t, { x: L, y: A } = e[u];
    for (g = m = -1, y = k; y < M; y++)
      m = 0.5 * Math.abs(
        (L - p) * (e[y].y - A) - (L - e[y].x) * (b - A)
      ), m > g && (g = m, f = e[y], v = y);
    o[l++] = f, u = v;
  }
  return o[l++] = e[c], o;
}
function Jb(e, t, n, a) {
  let i = 0, r = 0, o, s, l, c, u, d, f, g, m, v;
  const p = [], b = t + n - 1, y = e[t].x, x = e[b].x - y;
  for (o = t; o < t + n; ++o) {
    s = e[o], l = (s.x - y) / x * a, c = s.y;
    const C = l | 0;
    if (C === u)
      c < m ? (m = c, d = o) : c > v && (v = c, f = o), i = (r * i + s.x) / ++r;
    else {
      const k = o - 1;
      if (!V(d) && !V(f)) {
        const M = Math.min(d, f), L = Math.max(d, f);
        M !== g && M !== k && p.push({
          ...e[M],
          x: i
        }), L !== g && L !== k && p.push({
          ...e[L],
          x: i
        });
      }
      o > 0 && k !== g && p.push(e[k]), p.push(s), u = C, r = 0, m = v = c, d = f = g = o;
    }
  }
  return p;
}
function Dd(e) {
  if (e._decimated) {
    const t = e._data;
    delete e._decimated, delete e._data, Object.defineProperty(e, "data", { value: t });
  }
}
function Ol(e) {
  e.data.datasets.forEach((t) => {
    Dd(t);
  });
}
function e2(e, t) {
  const n = t.length;
  let a = 0, i;
  const { iScale: r } = e, { min: o, max: s, minDefined: l, maxDefined: c } = r.getUserBounds();
  return l && (a = re(lt(t, r.axis, o).lo, 0, n - 1)), c ? i = re(lt(t, r.axis, s).hi + 1, a, n) - a : i = n - a, { start: a, count: i };
}
var t2 = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (e, t, n) => {
    if (!n.enabled) {
      Ol(e);
      return;
    }
    const a = e.width;
    e.data.datasets.forEach((i, r) => {
      const { _data: o, indexAxis: s } = i, l = e.getDatasetMeta(r), c = o || i.data;
      if (Bn([s, e.options.indexAxis]) === "y" || !l.controller.supportsDecimation)
        return;
      const u = e.scales[l.xAxisID];
      if (u.type !== "linear" && u.type !== "time" || e.options.parsing)
        return;
      let { start: d, count: f } = e2(l, c);
      const g = n.threshold || 4 * a;
      if (f <= g) {
        Dd(i);
        return;
      }
      V(o) && (i._data = c, delete i.data, Object.defineProperty(i, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(v) {
          this._data = v;
        }
      }));
      let m;
      switch (n.algorithm) {
        case "lttb":
          m = Qb(c, d, f, a, n);
          break;
        case "min-max":
          m = Jb(c, d, f, a);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`);
      }
      i._decimated = m;
    });
  },
  destroy(e) {
    Ol(e);
  }
};
function n2(e, t, n) {
  const a = e.segments, i = e.points, r = t.points, o = [];
  for (const s of a) {
    let { start: l, end: c } = s;
    c = So(l, c, i);
    const u = $r(n, i[l], i[c], s.loop);
    if (!t.segments) {
      o.push({
        source: s,
        target: u,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const d = ld(t, u);
    for (const f of d) {
      const g = $r(n, r[f.start], r[f.end], f.loop), m = sd(s, i, g);
      for (const v of m)
        o.push({
          source: v,
          target: f,
          start: {
            [n]: Dl(u, g, "start", Math.max)
          },
          end: {
            [n]: Dl(u, g, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function $r(e, t, n, a) {
  if (a)
    return;
  let i = t[e], r = n[e];
  return e === "angle" && (i = ye(i), r = ye(r)), { property: e, start: i, end: r };
}
function a2(e, t) {
  const { x: n = null, y: a = null } = e || {}, i = t.points, r = [];
  return t.segments.forEach(({ start: o, end: s }) => {
    s = So(o, s, i);
    const l = i[o], c = i[s];
    a !== null ? (r.push({ x: l.x, y: a }), r.push({ x: c.x, y: a })) : n !== null && (r.push({ x: n, y: l.y }), r.push({ x: n, y: c.y }));
  }), r;
}
function So(e, t, n) {
  for (; t > e; t--) {
    const a = n[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function Dl(e, t, n, a) {
  return e && t ? a(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function Pd(e, t) {
  let n = [], a = !1;
  return K(e) ? (a = !0, n = e) : n = a2(e, t), n.length ? new kt({
    points: n,
    options: { tension: 0 },
    _loop: a,
    _fullLoop: a
  }) : null;
}
function Pl(e) {
  return e && e.fill !== !1;
}
function i2(e, t, n) {
  let i = e[t].fill;
  const r = [t];
  let o;
  if (!n)
    return i;
  for (; i !== !1 && r.indexOf(i) === -1; ) {
    if (!ne(i))
      return i;
    if (o = e[i], !o)
      return !1;
    if (o.visible)
      return i;
    r.push(i), i = o.fill;
  }
  return !1;
}
function r2(e, t, n) {
  const a = c2(e);
  if (N(a))
    return isNaN(a.value) ? !1 : a;
  let i = parseFloat(a);
  return ne(i) && Math.floor(i) === i ? o2(a[0], t, i, n) : ["origin", "start", "end", "stack", "shape"].indexOf(a) >= 0 && a;
}
function o2(e, t, n, a) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= a ? !1 : n;
}
function s2(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : N(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function l2(e, t, n) {
  let a;
  return e === "start" ? a = n : e === "end" ? a = t.options.reverse ? t.min : t.max : N(e) ? a = e.value : a = t.getBaseValue(), a;
}
function c2(e) {
  const t = e.options, n = t.fill;
  let a = F(n && n.target, n);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function u2(e) {
  const { scale: t, index: n, line: a } = e, i = [], r = a.segments, o = a.points, s = d2(t, n);
  s.push(Pd({ x: null, y: t.bottom }, a));
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    for (let u = c.start; u <= c.end; u++)
      f2(i, o[u], s);
  }
  return new kt({ points: i, options: {} });
}
function d2(e, t) {
  const n = [], a = e.getMatchingVisibleMetas("line");
  for (let i = 0; i < a.length; i++) {
    const r = a[i];
    if (r.index === t)
      break;
    r.hidden || n.unshift(r.dataset);
  }
  return n;
}
function f2(e, t, n) {
  const a = [];
  for (let i = 0; i < n.length; i++) {
    const r = n[i], { first: o, last: s, point: l } = h2(r, t, "x");
    if (!(!l || o && s)) {
      if (o)
        a.unshift(l);
      else if (e.push(l), !s)
        break;
    }
  }
  e.push(...a);
}
function h2(e, t, n) {
  const a = e.interpolate(t, n);
  if (!a)
    return {};
  const i = a[n], r = e.segments, o = e.points;
  let s = !1, l = !1;
  for (let c = 0; c < r.length; c++) {
    const u = r[c], d = o[u.start][n], f = o[u.end][n];
    if (st(i, d, f)) {
      s = i === d, l = i === f;
      break;
    }
  }
  return { first: s, last: l, point: a };
}
class Md {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, n, a) {
    const { x: i, y: r, radius: o } = this;
    return n = n || { start: 0, end: Y }, t.arc(i, r, o, n.end, n.start, !0), !a.bounds;
  }
  interpolate(t) {
    const { x: n, y: a, radius: i } = this, r = t.angle;
    return {
      x: n + Math.cos(r) * i,
      y: a + Math.sin(r) * i,
      angle: r
    };
  }
}
function g2(e) {
  const { chart: t, fill: n, line: a } = e;
  if (ne(n))
    return m2(t, n);
  if (n === "stack")
    return u2(e);
  if (n === "shape")
    return !0;
  const i = v2(e);
  return i instanceof Md ? i : Pd(i, a);
}
function m2(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function v2(e) {
  return (e.scale || {}).getPointPositionForValue ? b2(e) : p2(e);
}
function p2(e) {
  const { scale: t = {}, fill: n } = e, a = s2(n, t);
  if (ne(a)) {
    const i = t.isHorizontal();
    return {
      x: i ? a : null,
      y: i ? null : a
    };
  }
  return null;
}
function b2(e) {
  const { scale: t, fill: n } = e, a = t.options, i = t.getLabels().length, r = a.reverse ? t.max : t.min, o = l2(n, t, r), s = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, r);
    return new Md({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < i; ++l)
    s.push(t.getPointPositionForValue(l, o));
  return s;
}
function rr(e, t, n) {
  const a = g2(t), { line: i, scale: r, axis: o } = t, s = i.options, l = s.fill, c = s.backgroundColor, { above: u = c, below: d = c } = l || {};
  a && i.points.length && (vi(e, n), y2(e, { line: i, target: a, above: u, below: d, area: n, scale: r, axis: o }), pi(e));
}
function y2(e, t) {
  const { line: n, target: a, above: i, below: r, area: o, scale: s } = t, l = n._loop ? "angle" : t.axis;
  e.save(), l === "x" && r !== i && (Ml(e, a, o.top), Tl(e, { line: n, target: a, color: i, scale: s, property: l }), e.restore(), e.save(), Ml(e, a, o.bottom)), Tl(e, { line: n, target: a, color: r, scale: s, property: l }), e.restore();
}
function Ml(e, t, n) {
  const { segments: a, points: i } = t;
  let r = !0, o = !1;
  e.beginPath();
  for (const s of a) {
    const { start: l, end: c } = s, u = i[l], d = i[So(l, c, i)];
    r ? (e.moveTo(u.x, u.y), r = !1) : (e.lineTo(u.x, n), e.lineTo(u.x, u.y)), o = !!t.pathSegment(e, s, { move: o }), o ? e.closePath() : e.lineTo(d.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function Tl(e, t) {
  const { line: n, target: a, property: i, color: r, scale: o } = t, s = n2(n, a, i);
  for (const { source: l, target: c, start: u, end: d } of s) {
    const { style: { backgroundColor: f = r } = {} } = l, g = a !== !0;
    e.save(), e.fillStyle = f, C2(e, o, g && $r(i, u, d)), e.beginPath();
    const m = !!n.pathSegment(e, l);
    let v;
    if (g) {
      m ? e.closePath() : Al(e, a, d, i);
      const p = !!a.pathSegment(e, c, { move: m, reverse: !0 });
      v = m && p, v || Al(e, a, u, i);
    }
    e.closePath(), e.fill(v ? "evenodd" : "nonzero"), e.restore();
  }
}
function C2(e, t, n) {
  const { top: a, bottom: i } = t.chart.chartArea, { property: r, start: o, end: s } = n || {};
  r === "x" && (e.beginPath(), e.rect(o, a, s - o, i - a), e.clip());
}
function Al(e, t, n, a) {
  const i = t.interpolate(n, a);
  i && e.lineTo(i.x, i.y);
}
var x2 = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const a = (e.data.datasets || []).length, i = [];
    let r, o, s, l;
    for (o = 0; o < a; ++o)
      r = e.getDatasetMeta(o), s = r.dataset, l = null, s && s.options && s instanceof kt && (l = {
        visible: e.isDatasetVisible(o),
        index: o,
        fill: r2(s, o, a),
        chart: e,
        axis: r.controller.options.indexAxis,
        scale: r.vScale,
        line: s
      }), r.$filler = l, i.push(l);
    for (o = 0; o < a; ++o)
      l = i[o], !(!l || l.fill === !1) && (l.fill = i2(i, o, n.propagate));
  },
  beforeDraw(e, t, n) {
    const a = n.drawTime === "beforeDraw", i = e.getSortedVisibleDatasetMetas(), r = e.chartArea;
    for (let o = i.length - 1; o >= 0; --o) {
      const s = i[o].$filler;
      s && (s.line.updateControlPoints(r, s.axis), a && s.fill && rr(e.ctx, s, r));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let i = a.length - 1; i >= 0; --i) {
      const r = a[i].$filler;
      Pl(r) && rr(e.ctx, r, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const a = t.meta.$filler;
    !Pl(a) || n.drawTime !== "beforeDatasetDraw" || rr(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Ll = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, _2 = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class $l extends ze {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n, a) {
    this.maxWidth = t, this.maxHeight = n, this._margins = a, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let n = U(t.generateLabels, [this.chart], this) || [];
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, i) => t.sort(a, i, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, i = ie(a.font), r = i.size, o = this._computeTitleHeight(), { boxWidth: s, itemHeight: l } = Ll(a, r);
    let c, u;
    n.font = i.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(o, r, s, l) + 10) : (u = this.maxHeight, c = this._fitCols(o, r, s, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, i) {
    const { ctx: r, maxWidth: o, options: { labels: { padding: s } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [0], u = i + s;
    let d = t;
    r.textAlign = "left", r.textBaseline = "middle";
    let f = -1, g = -u;
    return this.legendItems.forEach((m, v) => {
      const p = a + n / 2 + r.measureText(m.text).width;
      (v === 0 || c[c.length - 1] + p + 2 * s > o) && (d += u, c[c.length - (v > 0 ? 0 : 1)] = 0, g += u, f++), l[v] = { left: 0, top: g, row: f, width: p, height: i }, c[c.length - 1] += p + s;
    }), d;
  }
  _fitCols(t, n, a, i) {
    const { ctx: r, maxHeight: o, options: { labels: { padding: s } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], u = o - t;
    let d = s, f = 0, g = 0, m = 0, v = 0;
    return this.legendItems.forEach((p, b) => {
      const y = a + n / 2 + r.measureText(p.text).width;
      b > 0 && g + i + 2 * s > u && (d += f + s, c.push({ width: f, height: g }), m += f + s, v++, f = g = 0), l[b] = { left: m, top: g, col: v, width: y, height: i }, f = Math.max(f, y), g += i + s;
    }), d += f, c.push({ width: f, height: g }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: i }, rtl: r } } = this, o = tn(r, this.left, this.width);
    if (this.isHorizontal()) {
      let s = 0, l = ce(a, this.left + i, this.right - this.lineWidths[s]);
      for (const c of n)
        s !== c.row && (s = c.row, l = ce(a, this.left + i, this.right - this.lineWidths[s])), c.top += this.top + t + i, c.left = o.leftForLtr(o.x(l), c.width), l += c.width + i;
    } else {
      let s = 0, l = ce(a, this.top + t + i, this.bottom - this.columnSizes[s].height);
      for (const c of n)
        c.col !== s && (s = c.col, l = ce(a, this.top + t + i, this.bottom - this.columnSizes[s].height)), c.top = l, c.left += this.left + i, c.left = o.leftForLtr(o.x(c.left), c.width), l += c.height + i;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      vi(t, this), this._draw(), pi(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: i } = this, { align: r, labels: o } = t, s = R.color, l = tn(t.rtl, this.left, this.width), c = ie(o.font), { color: u, padding: d } = o, f = c.size, g = f / 2;
    let m;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: v, boxHeight: p, itemHeight: b } = Ll(o, f), y = function(M, L, A) {
      if (isNaN(v) || v <= 0 || isNaN(p) || p < 0)
        return;
      i.save();
      const $ = F(A.lineWidth, 1);
      if (i.fillStyle = F(A.fillStyle, s), i.lineCap = F(A.lineCap, "butt"), i.lineDashOffset = F(A.lineDashOffset, 0), i.lineJoin = F(A.lineJoin, "miter"), i.lineWidth = $, i.strokeStyle = F(A.strokeStyle, s), i.setLineDash(F(A.lineDash, [])), o.usePointStyle) {
        const D = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: $
        }, _ = l.xPlus(M, v / 2), T = L + g;
        Ku(i, D, _, T, o.pointStyleWidth && v);
      } else {
        const D = L + Math.max((f - p) / 2, 0), _ = l.leftForLtr(M, v), T = Ft(A.borderRadius);
        i.beginPath(), Object.values(T).some((P) => P !== 0) ? oa(i, {
          x: _,
          y: D,
          w: v,
          h: p,
          radius: T
        }) : i.rect(_, D, v, p), i.fill(), $ !== 0 && i.stroke();
      }
      i.restore();
    }, w = function(M, L, A) {
      Ht(i, A.text, M, L + b / 2, c, {
        strikethrough: A.hidden,
        textAlign: l.textAlign(A.textAlign)
      });
    }, x = this.isHorizontal(), C = this._computeTitleHeight();
    x ? m = {
      x: ce(r, this.left + d, this.right - a[0]),
      y: this.top + d + C,
      line: 0
    } : m = {
      x: this.left + d,
      y: ce(r, this.top + C + d, this.bottom - n[0].height),
      line: 0
    }, id(this.ctx, t.textDirection);
    const k = b + d;
    this.legendItems.forEach((M, L) => {
      i.strokeStyle = M.fontColor || u, i.fillStyle = M.fontColor || u;
      const A = i.measureText(M.text).width, $ = l.textAlign(M.textAlign || (M.textAlign = o.textAlign)), D = v + g + A;
      let _ = m.x, T = m.y;
      l.setWidth(this.width), x ? L > 0 && _ + D + d > this.right && (T = m.y += k, m.line++, _ = m.x = ce(r, this.left + d, this.right - a[m.line])) : L > 0 && T + k > this.bottom && (_ = m.x = _ + n[m.line].width + d, m.line++, T = m.y = ce(r, this.top + C + d, this.bottom - n[m.line].height));
      const P = l.x(_);
      y(P, T, M), _ = $v($, _ + v + g, x ? _ + D : this.right, t.rtl), w(l.x(_), T, M), x ? m.x += D + d : m.y += k;
    }), rd(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = ie(n.font), i = fe(n.padding);
    if (!n.display)
      return;
    const r = tn(t.rtl, this.left, this.width), o = this.ctx, s = n.position, l = a.size / 2, c = i.top + l;
    let u, d = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), u = this.top + c, d = ce(t.align, d, this.right - f);
    else {
      const m = this.columnSizes.reduce((v, p) => Math.max(v, p.height), 0);
      u = c + ce(t.align, this.top, this.bottom - m - t.labels.padding - this._computeTitleHeight());
    }
    const g = ce(s, d, d + f);
    o.textAlign = r.textAlign(go(s)), o.textBaseline = "middle", o.strokeStyle = n.color, o.fillStyle = n.color, o.font = a.string, Ht(o, n.text, g, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = ie(t.font), a = fe(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, i, r;
    if (st(t, this.left, this.right) && st(n, this.top, this.bottom)) {
      for (r = this.legendHitBoxes, a = 0; a < r.length; ++a)
        if (i = r[a], st(t, i.left, i.left + i.width) && st(n, i.top, i.top + i.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!w2(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const i = this._hoveredItem, r = _2(i, a);
      i && !r && U(n.onLeave, [t, i, this], this), this._hoveredItem = a, a && !r && U(n.onHover, [t, a, this], this);
    } else
      a && U(n.onClick, [t, a, this], this);
  }
}
function w2(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var S2 = {
  id: "legend",
  _element: $l,
  start(e, t, n) {
    const a = e.legend = new $l({ ctx: e.ctx, options: n, chart: e });
    de.configure(e, a, n), de.addBox(e, a);
  },
  stop(e) {
    de.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    de.configure(e, a, n), a.options = n;
  },
  afterUpdate(e) {
    const t = e.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(e, t) {
    t.replay || e.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(e, t, n) {
      const a = t.datasetIndex, i = n.chart;
      i.isDatasetVisible(a) ? (i.hide(a), t.hidden = !0) : (i.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: a, textAlign: i, color: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((o) => {
          const s = o.controller.getStyle(n ? 0 : void 0), l = fe(s.borderWidth);
          return {
            text: t[o.index].label,
            fillStyle: s.backgroundColor,
            fontColor: r,
            hidden: !o.visible,
            lineCap: s.borderCapStyle,
            lineDash: s.borderDash,
            lineDashOffset: s.borderDashOffset,
            lineJoin: s.borderJoinStyle,
            lineWidth: (l.width + l.height) / 4,
            strokeStyle: s.borderColor,
            pointStyle: a || s.pointStyle,
            rotation: s.rotation,
            textAlign: i || s.textAlign,
            borderRadius: 0,
            datasetIndex: o.index
          };
        }, this);
      }
    },
    title: {
      color: (e) => e.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (e) => !e.startsWith("on"),
    labels: {
      _scriptable: (e) => !["generateLabels", "filter", "sort"].includes(e)
    }
  }
};
class ko extends ze {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n) {
    const a = this.options;
    if (this.left = 0, this.top = 0, !a.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = n;
    const i = K(a.text) ? a.text.length : 1;
    this._padding = fe(a.padding);
    const r = i * ie(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = r : this.width = r;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: i, right: r, options: o } = this, s = o.align;
    let l = 0, c, u, d;
    return this.isHorizontal() ? (u = ce(s, a, r), d = n + t, c = r - a) : (o.position === "left" ? (u = a + t, d = ce(s, i, n), l = Z * -0.5) : (u = r - t, d = ce(s, n, i), l = Z * 0.5), c = i - n), { titleX: u, titleY: d, maxWidth: c, rotation: l };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = ie(n.font), r = a.lineHeight / 2 + this._padding.top, { titleX: o, titleY: s, maxWidth: l, rotation: c } = this._drawArgs(r);
    Ht(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: l,
      rotation: c,
      textAlign: go(n.align),
      textBaseline: "middle",
      translation: [o, s]
    });
  }
}
function k2(e, t) {
  const n = new ko({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  de.configure(e, n, t), de.addBox(e, n), e.titleBlock = n;
}
var O2 = {
  id: "title",
  _element: ko,
  start(e, t, n) {
    k2(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    de.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    de.configure(e, a, n), a.options = n;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const Aa = /* @__PURE__ */ new WeakMap();
var D2 = {
  id: "subtitle",
  start(e, t, n) {
    const a = new ko({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    de.configure(e, a, n), de.addBox(e, a), Aa.set(e, a);
  },
  stop(e) {
    de.removeBox(e, Aa.get(e)), Aa.delete(e);
  },
  beforeUpdate(e, t, n) {
    const a = Aa.get(e);
    de.configure(e, a, n), a.options = n;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const Gn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = 0, i = 0, r = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const o = e[t].element;
      if (o && o.hasValue()) {
        const s = o.tooltipPosition();
        a += s.x, i += s.y, ++r;
      }
    }
    return {
      x: a / r,
      y: i / r
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, i = Number.POSITIVE_INFINITY, r, o, s;
    for (r = 0, o = e.length; r < o; ++r) {
      const l = e[r].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), u = Sr(t, c);
        u < i && (i = u, s = l);
      }
    }
    if (s) {
      const l = s.tooltipPosition();
      n = l.x, a = l.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function Ye(e, t) {
  return t && (K(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function it(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function P2(e, t) {
  const { element: n, datasetIndex: a, index: i } = t, r = e.getDatasetMeta(a).controller, { label: o, value: s } = r.getLabelAndValue(i);
  return {
    chart: e,
    label: o,
    parsed: r.getParsed(i),
    raw: e.data.datasets[a].data[i],
    formattedValue: s,
    dataset: r.getDataset(),
    dataIndex: i,
    datasetIndex: a,
    element: n
  };
}
function Bl(e, t) {
  const n = e.chart.ctx, { body: a, footer: i, title: r } = e, { boxWidth: o, boxHeight: s } = t, l = ie(t.bodyFont), c = ie(t.titleFont), u = ie(t.footerFont), d = r.length, f = i.length, g = a.length, m = fe(t.padding);
  let v = m.height, p = 0, b = a.reduce((x, C) => x + C.before.length + C.lines.length + C.after.length, 0);
  if (b += e.beforeBody.length + e.afterBody.length, d && (v += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const x = t.displayColors ? Math.max(s, l.lineHeight) : l.lineHeight;
    v += g * x + (b - g) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  f && (v += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
  let y = 0;
  const w = function(x) {
    p = Math.max(p, n.measureText(x).width + y);
  };
  return n.save(), n.font = c.string, W(e.title, w), n.font = l.string, W(e.beforeBody.concat(e.afterBody), w), y = t.displayColors ? o + 2 + t.boxPadding : 0, W(a, (x) => {
    W(x.before, w), W(x.lines, w), W(x.after, w);
  }), y = 0, n.font = u.string, W(e.footer, w), n.restore(), p += m.width, { width: p, height: v };
}
function M2(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function T2(e, t, n, a) {
  const { x: i, width: r } = a, o = n.caretSize + n.caretPadding;
  if (e === "left" && i + r + o > t.width || e === "right" && i - r - o < 0)
    return !0;
}
function A2(e, t, n, a) {
  const { x: i, width: r } = n, { width: o, chartArea: { left: s, right: l } } = e;
  let c = "center";
  return a === "center" ? c = i <= (s + l) / 2 ? "left" : "right" : i <= r / 2 ? c = "left" : i >= o - r / 2 && (c = "right"), T2(c, e, t, n) && (c = "center"), c;
}
function El(e, t, n) {
  const a = n.yAlign || t.yAlign || M2(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || A2(e, t, n, a),
    yAlign: a
  };
}
function L2(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function $2(e, t, n) {
  let { y: a, height: i } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= i + n : a -= i / 2, a;
}
function Il(e, t, n, a) {
  const { caretSize: i, caretPadding: r, cornerRadius: o } = e, { xAlign: s, yAlign: l } = n, c = i + r, { topLeft: u, topRight: d, bottomLeft: f, bottomRight: g } = Ft(o);
  let m = L2(t, s);
  const v = $2(t, l, c);
  return l === "center" ? s === "left" ? m += c : s === "right" && (m -= c) : s === "left" ? m -= Math.max(u, f) + i : s === "right" && (m += Math.max(d, g) + i), {
    x: re(m, 0, a.width - t.width),
    y: re(v, 0, a.height - t.height)
  };
}
function La(e, t, n) {
  const a = fe(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Fl(e) {
  return Ye([], it(e));
}
function B2(e, t, n) {
  return St(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Rl(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
class Br extends ze {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart || t._chart, this._chart = this.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const n = this.chart, a = this.options.setContext(this.getContext()), i = a.enabled && n.options.animation && a.animations, r = new cd(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = B2(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, i = a.beforeTitle.apply(this, [t]), r = a.title.apply(this, [t]), o = a.afterTitle.apply(this, [t]);
    let s = [];
    return s = Ye(s, it(i)), s = Ye(s, it(r)), s = Ye(s, it(o)), s;
  }
  getBeforeBody(t, n) {
    return Fl(n.callbacks.beforeBody.apply(this, [t]));
  }
  getBody(t, n) {
    const { callbacks: a } = n, i = [];
    return W(t, (r) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, s = Rl(a, r);
      Ye(o.before, it(s.beforeLabel.call(this, r))), Ye(o.lines, s.label.call(this, r)), Ye(o.after, it(s.afterLabel.call(this, r))), i.push(o);
    }), i;
  }
  getAfterBody(t, n) {
    return Fl(n.callbacks.afterBody.apply(this, [t]));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, i = a.beforeFooter.apply(this, [t]), r = a.footer.apply(this, [t]), o = a.afterFooter.apply(this, [t]);
    let s = [];
    return s = Ye(s, it(i)), s = Ye(s, it(r)), s = Ye(s, it(o)), s;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, i = [], r = [], o = [];
    let s = [], l, c;
    for (l = 0, c = n.length; l < c; ++l)
      s.push(P2(this.chart, n[l]));
    return t.filter && (s = s.filter((u, d, f) => t.filter(u, d, f, a))), t.itemSort && (s = s.sort((u, d) => t.itemSort(u, d, a))), W(s, (u) => {
      const d = Rl(t.callbacks, u);
      i.push(d.labelColor.call(this, u)), r.push(d.labelPointStyle.call(this, u)), o.push(d.labelTextColor.call(this, u));
    }), this.labelColors = i, this.labelPointStyles = r, this.labelTextColors = o, this.dataPoints = s, s;
  }
  update(t, n) {
    const a = this.options.setContext(this.getContext()), i = this._active;
    let r, o = [];
    if (!i.length)
      this.opacity !== 0 && (r = {
        opacity: 0
      });
    else {
      const s = Gn[a.position].call(this, i, this._eventPosition);
      o = this._createItems(a), this.title = this.getTitle(o, a), this.beforeBody = this.getBeforeBody(o, a), this.body = this.getBody(o, a), this.afterBody = this.getAfterBody(o, a), this.footer = this.getFooter(o, a);
      const l = this._size = Bl(this, a), c = Object.assign({}, s, l), u = El(this.chart, a, c), d = Il(a, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, r = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: s.x,
        caretY: s.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, r && this._resolveAnimations().update(this, r), t && a.external && a.external.call(this, { chart: this.chart, tooltip: this, replay: n });
  }
  drawCaret(t, n, a, i) {
    const r = this.getCaretPosition(t, a, i);
    n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3);
  }
  getCaretPosition(t, n, a) {
    const { xAlign: i, yAlign: r } = this, { caretSize: o, cornerRadius: s } = a, { topLeft: l, topRight: c, bottomLeft: u, bottomRight: d } = Ft(s), { x: f, y: g } = t, { width: m, height: v } = n;
    let p, b, y, w, x, C;
    return r === "center" ? (x = g + v / 2, i === "left" ? (p = f, b = p - o, w = x + o, C = x - o) : (p = f + m, b = p + o, w = x - o, C = x + o), y = p) : (i === "left" ? b = f + Math.max(l, u) + o : i === "right" ? b = f + m - Math.max(c, d) - o : b = this.caretX, r === "top" ? (w = g, x = w - o, p = b - o, y = b + o) : (w = g + v, x = w + o, p = b + o, y = b - o), C = w), { x1: p, x2: b, x3: y, y1: w, y2: x, y3: C };
  }
  drawTitle(t, n, a) {
    const i = this.title, r = i.length;
    let o, s, l;
    if (r) {
      const c = tn(a.rtl, this.x, this.width);
      for (t.x = La(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", o = ie(a.titleFont), s = a.titleSpacing, n.fillStyle = a.titleColor, n.font = o.string, l = 0; l < r; ++l)
        n.fillText(i[l], c.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + s, l + 1 === r && (t.y += a.titleMarginBottom - s);
    }
  }
  _drawColorBox(t, n, a, i, r) {
    const o = this.labelColors[a], s = this.labelPointStyles[a], { boxHeight: l, boxWidth: c, boxPadding: u } = r, d = ie(r.bodyFont), f = La(this, "left", r), g = i.x(f), m = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, v = n.y + m;
    if (r.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: s.pointStyle,
        rotation: s.rotation,
        borderWidth: 1
      }, b = i.leftForLtr(g, c) + c / 2, y = v + l / 2;
      t.strokeStyle = r.multiKeyBackground, t.fillStyle = r.multiKeyBackground, Dr(t, p, b, y), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Dr(t, p, b, y);
    } else {
      t.lineWidth = N(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const p = i.leftForLtr(g, c - u), b = i.leftForLtr(i.xPlus(g, 1), c - u - 2), y = Ft(o.borderRadius);
      Object.values(y).some((w) => w !== 0) ? (t.beginPath(), t.fillStyle = r.multiKeyBackground, oa(t, {
        x: p,
        y: v,
        w: c,
        h: l,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), oa(t, {
        x: b,
        y: v + 1,
        w: c - 2,
        h: l - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = r.multiKeyBackground, t.fillRect(p, v, c, l), t.strokeRect(p, v, c, l), t.fillStyle = o.backgroundColor, t.fillRect(b, v + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: i } = this, { bodySpacing: r, bodyAlign: o, displayColors: s, boxHeight: l, boxWidth: c, boxPadding: u } = a, d = ie(a.bodyFont);
    let f = d.lineHeight, g = 0;
    const m = tn(a.rtl, this.x, this.width), v = function(L) {
      n.fillText(L, m.x(t.x + g), t.y + f / 2), t.y += f + r;
    }, p = m.textAlign(o);
    let b, y, w, x, C, k, M;
    for (n.textAlign = o, n.textBaseline = "middle", n.font = d.string, t.x = La(this, p, a), n.fillStyle = a.bodyColor, W(this.beforeBody, v), g = s && p !== "right" ? o === "center" ? c / 2 + u : c + 2 + u : 0, x = 0, k = i.length; x < k; ++x) {
      for (b = i[x], y = this.labelTextColors[x], n.fillStyle = y, W(b.before, v), w = b.lines, s && w.length && (this._drawColorBox(n, t, x, m, a), f = Math.max(d.lineHeight, l)), C = 0, M = w.length; C < M; ++C)
        v(w[C]), f = d.lineHeight;
      W(b.after, v);
    }
    g = 0, f = d.lineHeight, W(this.afterBody, v), t.y -= r;
  }
  drawFooter(t, n, a) {
    const i = this.footer, r = i.length;
    let o, s;
    if (r) {
      const l = tn(a.rtl, this.x, this.width);
      for (t.x = La(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = l.textAlign(a.footerAlign), n.textBaseline = "middle", o = ie(a.footerFont), n.fillStyle = a.footerColor, n.font = o.string, s = 0; s < r; ++s)
        n.fillText(i[s], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, i) {
    const { xAlign: r, yAlign: o } = this, { x: s, y: l } = t, { width: c, height: u } = a, { topLeft: d, topRight: f, bottomLeft: g, bottomRight: m } = Ft(i.cornerRadius);
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, n.lineWidth = i.borderWidth, n.beginPath(), n.moveTo(s + d, l), o === "top" && this.drawCaret(t, n, a, i), n.lineTo(s + c - f, l), n.quadraticCurveTo(s + c, l, s + c, l + f), o === "center" && r === "right" && this.drawCaret(t, n, a, i), n.lineTo(s + c, l + u - m), n.quadraticCurveTo(s + c, l + u, s + c - m, l + u), o === "bottom" && this.drawCaret(t, n, a, i), n.lineTo(s + g, l + u), n.quadraticCurveTo(s, l + u, s, l + u - g), o === "center" && r === "left" && this.drawCaret(t, n, a, i), n.lineTo(s, l + d), n.quadraticCurveTo(s, l, s + d, l), n.closePath(), n.fill(), i.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, i = a && a.x, r = a && a.y;
    if (i || r) {
      const o = Gn[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const s = this._size = Bl(this, t), l = Object.assign({}, o, this._size), c = El(n, t, l), u = Il(t, l, c, n);
      (i._to !== u.x || r._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = s.width, this.height = s.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const n = this.options.setContext(this.getContext());
    let a = this.opacity;
    if (!a)
      return;
    this._updateAnimationTarget(n);
    const i = {
      width: this.width,
      height: this.height
    }, r = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const o = fe(n.padding), s = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && s && (t.save(), t.globalAlpha = a, this.drawBackground(r, t, i, n), id(t, n.textDirection), r.y += o.top, this.drawTitle(r, t, n), this.drawBody(r, t, n), this.drawFooter(r, t, n), rd(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, i = t.map(({ datasetIndex: s, index: l }) => {
      const c = this.chart.getDatasetMeta(s);
      if (!c)
        throw new Error("Cannot find a dataset at index " + s);
      return {
        datasetIndex: s,
        element: c.data[l],
        index: l
      };
    }), r = !Xa(a, i), o = this._positionChanged(i, n);
    (r || o) && (this._active = i, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, r = this._active || [], o = this._getActiveElements(t, r, n, a), s = this._positionChanged(o, t), l = n || !Xa(o, r) || s;
    return l && (this._active = o, (i.enabled || i.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), l;
  }
  _getActiveElements(t, n, a, i) {
    const r = this.options;
    if (t.type === "mouseout")
      return [];
    if (!i)
      return n;
    const o = this.chart.getElementsAtEventForMode(t, r.mode, r, a);
    return r.reverse && o.reverse(), o;
  }
  _positionChanged(t, n) {
    const { caretX: a, caretY: i, options: r } = this, o = Gn[r.position].call(this, t, n);
    return o !== !1 && (a !== o.x || i !== o.y);
  }
}
Br.positioners = Gn;
var E2 = {
  id: "tooltip",
  _element: Br,
  positioners: Gn,
  afterInit(e, t, n) {
    n && (e.tooltip = new Br({ chart: e, options: n }));
  },
  beforeUpdate(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  reset(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const n = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", n) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const n = t.replay;
      e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (e, t) => t.bodyFont.size,
    boxWidth: (e, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: ["x", "y", "width", "height", "caretX", "caretY"]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: {
      beforeTitle: nt,
      title(e) {
        if (e.length > 0) {
          const t = e[0], n = t.chart.data.labels, a = n ? n.length : 0;
          if (this && this.options && this.options.mode === "dataset")
            return t.dataset.label || "";
          if (t.label)
            return t.label;
          if (a > 0 && t.dataIndex < a)
            return n[t.dataIndex];
        }
        return "";
      },
      afterTitle: nt,
      beforeBody: nt,
      beforeLabel: nt,
      label(e) {
        if (this && this.options && this.options.mode === "dataset")
          return e.label + ": " + e.formattedValue || e.formattedValue;
        let t = e.dataset.label || "";
        t && (t += ": ");
        const n = e.formattedValue;
        return V(n) || (t += n), t;
      },
      labelColor(e) {
        const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
        return {
          borderColor: n.borderColor,
          backgroundColor: n.backgroundColor,
          borderWidth: n.borderWidth,
          borderDash: n.borderDash,
          borderDashOffset: n.borderDashOffset,
          borderRadius: 0
        };
      },
      labelTextColor() {
        return this.options.bodyColor;
      },
      labelPointStyle(e) {
        const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
        return {
          pointStyle: n.pointStyle,
          rotation: n.rotation
        };
      },
      afterLabel: nt,
      afterBody: nt,
      beforeFooter: nt,
      footer: nt,
      afterFooter: nt
    }
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (e) => e !== "filter" && e !== "itemSort" && e !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: ["interaction"]
}, I2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Decimation: t2,
  Filler: x2,
  Legend: S2,
  SubTitle: D2,
  Title: O2,
  Tooltip: E2
});
const F2 = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({ index: n, label: t })) : isNaN(t) && (n = null), n);
function R2(e, t, n, a) {
  const i = e.indexOf(t);
  if (i === -1)
    return F2(e, t, n, a);
  const r = e.lastIndexOf(t);
  return i !== r ? n : i;
}
const N2 = (e, t) => e === null ? null : re(Math.round(e), 0, t);
class ii extends qt {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const a = this.getLabels();
      for (const { index: i, label: r } of n)
        a[i] === r && a.splice(i, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (V(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : R2(a, t, F(n, t), this._addedLabels), N2(n, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: a, max: i } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), n || (i = this.getLabels().length - 1)), this.min = a, this.max = i;
  }
  buildTicks() {
    const t = this.min, n = this.max, a = this.options.offset, i = [];
    let r = this.getLabels();
    r = t === 0 && n === r.length - 1 ? r : r.slice(t, n + 1), this._valueRange = Math.max(r.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let o = t; o <= n; o++)
      i.push({ value: o });
    return i;
  }
  getLabelForValue(t) {
    const n = this.getLabels();
    return t >= 0 && t < n.length ? n[t] : t;
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
ii.id = "category";
ii.defaults = {
  ticks: {
    callback: ii.prototype.getLabelForValue
  }
};
function j2(e, t) {
  const n = [], { bounds: i, step: r, min: o, max: s, precision: l, count: c, maxTicks: u, maxDigits: d, includeBounds: f } = e, g = r || 1, m = u - 1, { min: v, max: p } = t, b = !V(o), y = !V(s), w = !V(c), x = (p - v) / (d + 1);
  let C = Es((p - v) / m / g) * g, k, M, L, A;
  if (C < 1e-14 && !b && !y)
    return [{ value: v }, { value: p }];
  A = Math.ceil(p / C) - Math.floor(v / C), A > m && (C = Es(A * C / m / g) * g), V(l) || (k = Math.pow(10, l), C = Math.ceil(C * k) / k), i === "ticks" ? (M = Math.floor(v / C) * C, L = Math.ceil(p / C) * C) : (M = v, L = p), b && y && r && Ov((s - o) / r, C / 1e3) ? (A = Math.round(Math.min((s - o) / C, u)), C = (s - o) / A, M = o, L = s) : w ? (M = b ? o : M, L = y ? s : L, A = c - 1, C = (L - M) / A) : (A = (L - M) / C, Yn(A, Math.round(A), C / 1e3) ? A = Math.round(A) : A = Math.ceil(A));
  const $ = Math.max(
    Is(C),
    Is(M)
  );
  k = Math.pow(10, V(l) ? $ : l), M = Math.round(M * k) / k, L = Math.round(L * k) / k;
  let D = 0;
  for (b && (f && M !== o ? (n.push({ value: o }), M < o && D++, Yn(Math.round((M + D * C) * k) / k, o, Nl(o, x, e)) && D++) : M < o && D++); D < A; ++D)
    n.push({ value: Math.round((M + D * C) * k) / k });
  return y && f && L !== s ? n.length && Yn(n[n.length - 1].value, s, Nl(s, x, e)) ? n[n.length - 1].value = s : n.push({ value: s }) : (!y || L === s) && n.push({ value: L }), n;
}
function Nl(e, t, { horizontal: n, minRotation: a }) {
  const i = Fe(a), r = (n ? Math.sin(i) : Math.cos(i)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / r, o);
}
class ri extends qt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return V(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: i, max: r } = this;
    const o = (l) => i = n ? i : l, s = (l) => r = a ? r : l;
    if (t) {
      const l = Xe(i), c = Xe(r);
      l < 0 && c < 0 ? s(0) : l > 0 && c > 0 && o(0);
    }
    if (i === r) {
      let l = 1;
      (r >= Number.MAX_SAFE_INTEGER || i <= Number.MIN_SAFE_INTEGER) && (l = Math.abs(r * 0.05)), s(r + l), t || o(i - l);
    }
    this.min = i, this.max = r;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: a } = t, i;
    return a ? (i = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, i > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${i} ticks. Limiting to 1000.`), i = 1e3)) : (i = this.computeTickLimit(), n = n || 11), n && (i = Math.min(n, i)), i;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const i = {
      maxTicks: a,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, r = this._range || this, o = j2(i, r);
    return t.bounds === "ticks" && Iu(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const i = (a - n) / Math.max(t.length - 1, 1) / 2;
      n -= i, a += i;
    }
    this._startValue = n, this._endValue = a, this._valueRange = a - n;
  }
  getLabelForValue(t) {
    return fa(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Oo extends ri {
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ne(t) ? t : 0, this.max = ne(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Fe(this.options.ticks.minRotation), i = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, r = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, r.lineHeight / i));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
Oo.id = "linear";
Oo.defaults = {
  ticks: {
    callback: Si.formatters.numeric
  }
};
function jl(e) {
  return e / Math.pow(10, Math.floor(De(e))) === 1;
}
function z2(e, t) {
  const n = Math.floor(De(t.max)), a = Math.ceil(t.max / Math.pow(10, n)), i = [];
  let r = Oe(e.min, Math.pow(10, Math.floor(De(t.min)))), o = Math.floor(De(r)), s = Math.floor(r / Math.pow(10, o)), l = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  do
    i.push({ value: r, major: jl(r) }), ++s, s === 10 && (s = 1, ++o, l = o >= 0 ? 1 : l), r = Math.round(s * Math.pow(10, o) * l) / l;
  while (o < n || o === n && s < a);
  const c = Oe(e.max, r);
  return i.push({ value: c, major: jl(r) }), i;
}
class Do extends qt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    const a = ri.prototype.parse.apply(this, [t, n]);
    if (a === 0) {
      this._zero = !0;
      return;
    }
    return ne(a) && a > 0 ? a : null;
  }
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ne(t) ? Math.max(0, t) : null, this.max = ne(n) ? Math.max(0, n) : null, this.options.beginAtZero && (this._zero = !0), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let a = this.min, i = this.max;
    const r = (l) => a = t ? a : l, o = (l) => i = n ? i : l, s = (l, c) => Math.pow(10, Math.floor(De(l)) + c);
    a === i && (a <= 0 ? (r(1), o(10)) : (r(s(a, -1)), o(s(i, 1)))), a <= 0 && r(s(i, -1)), i <= 0 && o(s(a, 1)), this._zero && this.min !== this._suggestedMin && a === s(this.min, 0) && r(s(a, -1)), this.min = a, this.max = i;
  }
  buildTicks() {
    const t = this.options, n = {
      min: this._userMin,
      max: this._userMax
    }, a = z2(n, this);
    return t.bounds === "ticks" && Iu(a, this, "value"), t.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : fa(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = De(t), this._valueRange = De(this.max) - De(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (De(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const n = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + n * this._valueRange);
  }
}
Do.id = "logarithmic";
Do.defaults = {
  ticks: {
    callback: Si.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
};
function Er(e) {
  const t = e.ticks;
  if (t.display && e.display) {
    const n = fe(t.backdropPadding);
    return F(t.font && t.font.size, R.font.size) + n.height;
  }
  return 0;
}
function V2(e, t, n) {
  return n = K(n) ? n : [n], {
    w: i0(e, t.string, n),
    h: n.length * t.lineHeight
  };
}
function zl(e, t, n, a, i) {
  return e === a || e === i ? {
    start: t - n / 2,
    end: t + n / 2
  } : e < a || e > i ? {
    start: t - n,
    end: t
  } : {
    start: t,
    end: t + n
  };
}
function H2(e) {
  const t = {
    l: e.left + e._padding.left,
    r: e.right - e._padding.right,
    t: e.top + e._padding.top,
    b: e.bottom - e._padding.bottom
  }, n = Object.assign({}, t), a = [], i = [], r = e._pointLabels.length, o = e.options.pointLabels, s = o.centerPointLabels ? Z / r : 0;
  for (let l = 0; l < r; l++) {
    const c = o.setContext(e.getPointLabelContext(l));
    i[l] = c.padding;
    const u = e.getPointPosition(l, e.drawingArea + i[l], s), d = ie(c.font), f = V2(e.ctx, d, e._pointLabels[l]);
    a[l] = f;
    const g = ye(e.getIndexAngle(l) + s), m = Math.round(fo(g)), v = zl(m, u.x, f.w, 0, 180), p = zl(m, u.y, f.h, 90, 270);
    W2(n, t, g, v, p);
  }
  e.setCenterPoint(
    t.l - n.l,
    n.r - t.r,
    t.t - n.t,
    n.b - t.b
  ), e._pointLabelItems = Y2(e, a, i);
}
function W2(e, t, n, a, i) {
  const r = Math.abs(Math.sin(n)), o = Math.abs(Math.cos(n));
  let s = 0, l = 0;
  a.start < t.l ? (s = (t.l - a.start) / r, e.l = Math.min(e.l, t.l - s)) : a.end > t.r && (s = (a.end - t.r) / r, e.r = Math.max(e.r, t.r + s)), i.start < t.t ? (l = (t.t - i.start) / o, e.t = Math.min(e.t, t.t - l)) : i.end > t.b && (l = (i.end - t.b) / o, e.b = Math.max(e.b, t.b + l));
}
function Y2(e, t, n) {
  const a = [], i = e._pointLabels.length, r = e.options, o = Er(r) / 2, s = e.drawingArea, l = r.pointLabels.centerPointLabels ? Z / i : 0;
  for (let c = 0; c < i; c++) {
    const u = e.getPointPosition(c, s + o + n[c], l), d = Math.round(fo(ye(u.angle + ee))), f = t[c], g = G2(u.y, f.h, d), m = U2(d), v = q2(u.x, f.w, m);
    a.push({
      x: u.x,
      y: g,
      textAlign: m,
      left: v,
      top: g,
      right: v + f.w,
      bottom: g + f.h
    });
  }
  return a;
}
function U2(e) {
  return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right";
}
function q2(e, t, n) {
  return n === "right" ? e -= t : n === "center" && (e -= t / 2), e;
}
function G2(e, t, n) {
  return n === 90 || n === 270 ? e -= t / 2 : (n > 270 || n < 90) && (e -= t), e;
}
function K2(e, t) {
  const { ctx: n, options: { pointLabels: a } } = e;
  for (let i = t - 1; i >= 0; i--) {
    const r = a.setContext(e.getPointLabelContext(i)), o = ie(r.font), { x: s, y: l, textAlign: c, left: u, top: d, right: f, bottom: g } = e._pointLabelItems[i], { backdropColor: m } = r;
    if (!V(m)) {
      const v = Ft(r.borderRadius), p = fe(r.backdropPadding);
      n.fillStyle = m;
      const b = u - p.left, y = d - p.top, w = f - u + p.width, x = g - d + p.height;
      Object.values(v).some((C) => C !== 0) ? (n.beginPath(), oa(n, {
        x: b,
        y,
        w,
        h: x,
        radius: v
      }), n.fill()) : n.fillRect(b, y, w, x);
    }
    Ht(
      n,
      e._pointLabels[i],
      s,
      l + o.lineHeight / 2,
      o,
      {
        color: r.color,
        textAlign: c,
        textBaseline: "middle"
      }
    );
  }
}
function Td(e, t, n, a) {
  const { ctx: i } = e;
  if (n)
    i.arc(e.xCenter, e.yCenter, t, 0, Y);
  else {
    let r = e.getPointPosition(0, t);
    i.moveTo(r.x, r.y);
    for (let o = 1; o < a; o++)
      r = e.getPointPosition(o, t), i.lineTo(r.x, r.y);
  }
}
function X2(e, t, n, a) {
  const i = e.ctx, r = t.circular, { color: o, lineWidth: s } = t;
  !r && !a || !o || !s || n < 0 || (i.save(), i.strokeStyle = o, i.lineWidth = s, i.setLineDash(t.borderDash), i.lineDashOffset = t.borderDashOffset, i.beginPath(), Td(e, n, r, a), i.closePath(), i.stroke(), i.restore());
}
function Z2(e, t, n) {
  return St(e, {
    label: n,
    index: t,
    type: "pointLabel"
  });
}
class ga extends ri {
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = fe(Er(this.options) / 2), n = this.width = this.maxWidth - t.width, a = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + n / 2 + t.left), this.yCenter = Math.floor(this.top + a / 2 + t.top), this.drawingArea = Math.floor(Math.min(n, a) / 2);
  }
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!1);
    this.min = ne(t) && !isNaN(t) ? t : 0, this.max = ne(n) && !isNaN(n) ? n : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Er(this.options));
  }
  generateTickLabels(t) {
    ri.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((n, a) => {
      const i = U(this.options.pointLabels.callback, [n, a], this);
      return i || i === 0 ? i : "";
    }).filter((n, a) => this.chart.getDataVisibility(a));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? H2(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, n, a, i) {
    this.xCenter += Math.floor((t - n) / 2), this.yCenter += Math.floor((a - i) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, n, a, i));
  }
  getIndexAngle(t) {
    const n = Y / (this._pointLabels.length || 1), a = this.options.startAngle || 0;
    return ye(t * n + Fe(a));
  }
  getDistanceFromCenterForValue(t) {
    if (V(t))
      return NaN;
    const n = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * n : (t - this.min) * n;
  }
  getValueForDistanceFromCenter(t) {
    if (V(t))
      return NaN;
    const n = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - n : this.min + n;
  }
  getPointLabelContext(t) {
    const n = this._pointLabels || [];
    if (t >= 0 && t < n.length) {
      const a = n[t];
      return Z2(this.getContext(), t, a);
    }
  }
  getPointPosition(t, n, a = 0) {
    const i = this.getIndexAngle(t) - ee + a;
    return {
      x: Math.cos(i) * n + this.xCenter,
      y: Math.sin(i) * n + this.yCenter,
      angle: i
    };
  }
  getPointPositionForValue(t, n) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(n));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: n, top: a, right: i, bottom: r } = this._pointLabelItems[t];
    return {
      left: n,
      top: a,
      right: i,
      bottom: r
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: n } } = this.options;
    if (t) {
      const a = this.ctx;
      a.save(), a.beginPath(), Td(this, this.getDistanceFromCenterForValue(this._endValue), n, this._pointLabels.length), a.closePath(), a.fillStyle = t, a.fill(), a.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, n = this.options, { angleLines: a, grid: i } = n, r = this._pointLabels.length;
    let o, s, l;
    if (n.pointLabels.display && K2(this, r), i.display && this.ticks.forEach((c, u) => {
      if (u !== 0) {
        s = this.getDistanceFromCenterForValue(c.value);
        const d = i.setContext(this.getContext(u - 1));
        X2(this, d, s, r);
      }
    }), a.display) {
      for (t.save(), o = r - 1; o >= 0; o--) {
        const c = a.setContext(this.getPointLabelContext(o)), { color: u, lineWidth: d } = c;
        !d || !u || (t.lineWidth = d, t.strokeStyle = u, t.setLineDash(c.borderDash), t.lineDashOffset = c.borderDashOffset, s = this.getDistanceFromCenterForValue(n.ticks.reverse ? this.min : this.max), l = this.getPointPosition(o, s), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(l.x, l.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, n = this.options, a = n.ticks;
    if (!a.display)
      return;
    const i = this.getIndexAngle(0);
    let r, o;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(i), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((s, l) => {
      if (l === 0 && !n.reverse)
        return;
      const c = a.setContext(this.getContext(l)), u = ie(c.font);
      if (r = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        t.font = u.string, o = t.measureText(s.label).width, t.fillStyle = c.backdropColor;
        const d = fe(c.backdropPadding);
        t.fillRect(
          -o / 2 - d.left,
          -r - u.size / 2 - d.top,
          o + d.width,
          u.size + d.height
        );
      }
      Ht(t, s.label, 0, -r, u, {
        color: c.color
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
ga.id = "radialLinear";
ga.defaults = {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: Si.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(e) {
      return e;
    },
    padding: 5,
    centerPointLabels: !1
  }
};
ga.defaultRoutes = {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
};
ga.descriptors = {
  angleLines: {
    _fallback: "grid"
  }
};
const Ti = {
  millisecond: { common: !0, size: 1, steps: 1e3 },
  second: { common: !0, size: 1e3, steps: 60 },
  minute: { common: !0, size: 6e4, steps: 60 },
  hour: { common: !0, size: 36e5, steps: 24 },
  day: { common: !0, size: 864e5, steps: 30 },
  week: { common: !1, size: 6048e5, steps: 4 },
  month: { common: !0, size: 2628e6, steps: 12 },
  quarter: { common: !1, size: 7884e6, steps: 4 },
  year: { common: !0, size: 3154e7 }
}, me = Object.keys(Ti);
function Q2(e, t) {
  return e - t;
}
function Vl(e, t) {
  if (V(t))
    return null;
  const n = e._adapter, { parser: a, round: i, isoWeekday: r } = e._parseOpts;
  let o = t;
  return typeof a == "function" && (o = a(o)), ne(o) || (o = typeof a == "string" ? n.parse(o, a) : n.parse(o)), o === null ? null : (i && (o = i === "week" && (un(r) || r === !0) ? n.startOf(o, "isoWeek", r) : n.startOf(o, i)), +o);
}
function Hl(e, t, n, a) {
  const i = me.length;
  for (let r = me.indexOf(e); r < i - 1; ++r) {
    const o = Ti[me[r]], s = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((n - t) / (s * o.size)) <= a)
      return me[r];
  }
  return me[i - 1];
}
function J2(e, t, n, a, i) {
  for (let r = me.length - 1; r >= me.indexOf(n); r--) {
    const o = me[r];
    if (Ti[o].common && e._adapter.diff(i, a, o) >= t - 1)
      return o;
  }
  return me[n ? me.indexOf(n) : 0];
}
function e3(e) {
  for (let t = me.indexOf(e) + 1, n = me.length; t < n; ++t)
    if (Ti[me[t]].common)
      return me[t];
}
function Wl(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: i } = ho(n, t), r = n[a] >= t ? n[a] : n[i];
    e[r] = !0;
  }
}
function t3(e, t, n, a) {
  const i = e._adapter, r = +i.startOf(t[0].value, a), o = t[t.length - 1].value;
  let s, l;
  for (s = r; s <= o; s = +i.add(s, 1, a))
    l = n[s], l >= 0 && (t[l].major = !0);
  return t;
}
function Yl(e, t, n) {
  const a = [], i = {}, r = t.length;
  let o, s;
  for (o = 0; o < r; ++o)
    s = t[o], i[s] = o, a.push({
      value: s,
      major: !1
    });
  return r === 0 || !n ? a : t3(e, a, i, n);
}
class ma extends qt {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n) {
    const a = t.time || (t.time = {}), i = this._adapter = new zp._date(t.adapters.date);
    i.init(n), Wn(a.displayFormats, i.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Vl(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, a = t.time.unit || "day";
    let { min: i, max: r, minDefined: o, maxDefined: s } = this.getUserBounds();
    function l(c) {
      !o && !isNaN(c.min) && (i = Math.min(i, c.min)), !s && !isNaN(c.max) && (r = Math.max(r, c.max));
    }
    (!o || !s) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), i = ne(i) && !isNaN(i) ? i : +n.startOf(Date.now(), a), r = ne(r) && !isNaN(r) ? r : +n.endOf(Date.now(), a) + 1, this.min = Math.min(i, r - 1), this.max = Math.max(i + 1, r);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], a = t[t.length - 1]), { min: n, max: a };
  }
  buildTicks() {
    const t = this.options, n = t.time, a = t.ticks, i = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && i.length && (this.min = this._userMin || i[0], this.max = this._userMax || i[i.length - 1]);
    const r = this.min, o = this.max, s = Tv(i, r, o);
    return this._unit = n.unit || (a.autoSkip ? Hl(n.minUnit, this.min, this.max, this._getLabelCapacity(r)) : J2(this, s.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : e3(this._unit), this.initOffsets(i), t.reverse && s.reverse(), Yl(this, s, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t) {
    let n = 0, a = 0, i, r;
    this.options.offset && t.length && (i = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - i : n = (this.getDecimalForValue(t[1]) - i) / 2, r = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = r : a = (r - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    n = re(n, 0, o), a = re(a, 0, o), this._offsets = { start: n, end: a, factor: 1 / (n + 1 + a) };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, i = this.options, r = i.time, o = r.unit || Hl(r.minUnit, n, a, this._getLabelCapacity(n)), s = F(r.stepSize, 1), l = o === "week" ? r.isoWeekday : !1, c = un(l) || l === !0, u = {};
    let d = n, f, g;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : o), t.diff(a, n, o) > 1e5 * s)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + s + " " + o);
    const m = i.ticks.source === "data" && this.getDataTimestamps();
    for (f = d, g = 0; f < a; f = +t.add(f, s, o), g++)
      Wl(u, f, m);
    return (f === a || i.bounds === "ticks" || g === 1) && Wl(u, f, m), Object.keys(u).sort((v, p) => v - p).map((v) => +v);
  }
  getLabelForValue(t) {
    const n = this._adapter, a = this.options.time;
    return a.tooltipFormat ? n.format(t, a.tooltipFormat) : n.format(t, a.displayFormats.datetime);
  }
  _tickFormatFunction(t, n, a, i) {
    const r = this.options, o = r.time.displayFormats, s = this._unit, l = this._majorUnit, c = s && o[s], u = l && o[l], d = a[n], f = l && u && d && d.major, g = this._adapter.format(t, i || (f ? u : c)), m = r.ticks.callback;
    return m ? U(m, [g, n, a], this) : g;
  }
  generateTickLabels(t) {
    let n, a, i;
    for (n = 0, a = t.length; n < a; ++n)
      i = t[n], i.label = this._tickFormatFunction(i.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, a = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + a) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + a * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, a = this.ctx.measureText(t).width, i = Fe(this.isHorizontal() ? n.maxRotation : n.minRotation), r = Math.cos(i), o = Math.sin(i), s = this._resolveTickFontOptions(0).size;
    return {
      w: a * r + s * o,
      h: a * o + s * r
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, i = a[n.unit] || a.millisecond, r = this._tickFormatFunction(t, 0, Yl(this, [t], this._majorUnit), i), o = this._getLabelSize(r), s = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return s > 0 ? s : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, a;
    if (t.length)
      return t;
    const i = this.getMatchingVisibleMetas();
    if (this._normalized && i.length)
      return this._cache.data = i[0].controller.getAllParsedValues(this);
    for (n = 0, a = i.length; n < a; ++n)
      t = t.concat(i[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, a;
    if (t.length)
      return t;
    const i = this.getLabels();
    for (n = 0, a = i.length; n < a; ++n)
      t.push(Vl(this, i[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Nu(t.sort(Q2));
  }
}
ma.id = "time";
ma.defaults = {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    major: {
      enabled: !1
    }
  }
};
function $a(e, t, n) {
  let a = 0, i = e.length - 1, r, o, s, l;
  n ? (t >= e[a].pos && t <= e[i].pos && ({ lo: a, hi: i } = lt(e, "pos", t)), { pos: r, time: s } = e[a], { pos: o, time: l } = e[i]) : (t >= e[a].time && t <= e[i].time && ({ lo: a, hi: i } = lt(e, "time", t)), { time: r, pos: s } = e[a], { time: o, pos: l } = e[i]);
  const c = o - r;
  return c ? s + (l - s) * (t - r) / c : s;
}
class Po extends ma {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = $a(n, this.min), this._tableRange = $a(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, i = [], r = [];
    let o, s, l, c, u;
    for (o = 0, s = t.length; o < s; ++o)
      c = t[o], c >= n && c <= a && i.push(c);
    if (i.length < 2)
      return [
        { time: n, pos: 0 },
        { time: a, pos: 1 }
      ];
    for (o = 0, s = i.length; o < s; ++o)
      u = i[o + 1], l = i[o - 1], c = i[o], Math.round((u + l) / 2) !== c && r.push({ time: c, pos: o / (s - 1) });
    return r;
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return n.length && a.length ? t = this.normalize(n.concat(a)) : t = n.length ? n : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return ($a(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return $a(this._table, a * this._tableRange + this._minPos, !0);
  }
}
Po.id = "timeseries";
Po.defaults = ma.defaults;
var n3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: ii,
  LinearScale: Oo,
  LogarithmicScale: Do,
  RadialLinearScale: ga,
  TimeScale: ma,
  TimeSeriesScale: Po
});
const a3 = [
  jp,
  Zb,
  I2,
  n3
];
Oi.register(...a3);
/*!
  * CoreUI Plugins - Chart.js for CoreUI v5 v3.1.2 (https://coreui.io)
  * Copyright 2023 creativeLabs Łukasz Holeczek
  * Licensed under MIT (https://github.com/coreui/coreui-chartjs/blob/main/LICENSE)
  */
const In = {
  TOOLTIP: "chartjs-tooltip",
  TOOLTIP_BODY: "chartjs-tooltip-body",
  TOOLTIP_BODY_ITEM: "chartjs-tooltip-body-item",
  TOOLTIP_HEADER: "chartjs-tooltip-header",
  TOOLTIP_HEADER_ITEM: "chartjs-tooltip-header-item"
}, i3 = (e) => {
  let t = e.canvas.parentNode.querySelector("div");
  if (!t) {
    t = document.createElement("div"), t.classList.add(In.TOOLTIP);
    const n = document.createElement("table");
    n.style.margin = "0px", t.appendChild(n), e.canvas.parentNode.appendChild(t);
  }
  return t;
}, r3 = (e) => {
  const {
    chart: t,
    tooltip: n
  } = e, a = i3(t);
  if (n.opacity === 0) {
    a.style.opacity = 0;
    return;
  }
  if (n.body) {
    const o = n.title || [], s = n.body.map((d) => d.lines), l = document.createElement("thead");
    l.classList.add(In.TOOLTIP_HEADER), o.forEach((d) => {
      const f = document.createElement("tr");
      f.style.borderWidth = 0, f.classList.add(In.TOOLTIP_HEADER_ITEM);
      const g = document.createElement("th");
      g.style.borderWidth = 0;
      const m = document.createTextNode(d);
      g.appendChild(m), f.appendChild(g), l.appendChild(f);
    });
    const c = document.createElement("tbody");
    c.classList.add(In.TOOLTIP_BODY), s.forEach((d, f) => {
      const g = n.labelColors[f], m = document.createElement("span");
      m.style.background = g.backgroundColor, m.style.borderColor = g.borderColor, m.style.borderWidth = "2px", m.style.marginRight = "10px", m.style.height = "10px", m.style.width = "10px", m.style.display = "inline-block";
      const v = document.createElement("tr");
      v.classList.add(In.TOOLTIP_BODY_ITEM);
      const p = document.createElement("td");
      p.style.borderWidth = 0;
      const b = document.createTextNode(d);
      p.appendChild(m), p.appendChild(b), v.appendChild(p), c.appendChild(v);
    });
    const u = a.querySelector("table");
    for (; u.firstChild; )
      u.firstChild.remove();
    u.appendChild(l), u.appendChild(c);
  }
  const {
    offsetLeft: i,
    offsetTop: r
  } = t.canvas;
  a.style.opacity = 1, a.style.left = i + n.caretX + "px", a.style.top = r + n.caretY + "px", a.style.font = n.options.bodyFont.string, a.style.padding = n.padding + "px " + n.padding + "px";
};
var Ba = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Mo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var o3 = typeof Ba == "object" && Ba && Ba.Object === Object && Ba, Ad = o3, s3 = Ad, l3 = typeof self == "object" && self && self.Object === Object && self, c3 = s3 || l3 || Function("return this")(), et = c3, u3 = et, d3 = u3.Symbol, Ai = d3, Ul = Ai, Ld = Object.prototype, f3 = Ld.hasOwnProperty, h3 = Ld.toString, An = Ul ? Ul.toStringTag : void 0;
function g3(e) {
  var t = f3.call(e, An), n = e[An];
  try {
    e[An] = void 0;
    var a = !0;
  } catch {
  }
  var i = h3.call(e);
  return a && (t ? e[An] = n : delete e[An]), i;
}
var m3 = g3, v3 = Object.prototype, p3 = v3.toString;
function b3(e) {
  return p3.call(e);
}
var y3 = b3, ql = Ai, C3 = m3, x3 = y3, _3 = "[object Null]", w3 = "[object Undefined]", Gl = ql ? ql.toStringTag : void 0;
function S3(e) {
  return e == null ? e === void 0 ? w3 : _3 : Gl && Gl in Object(e) ? C3(e) : x3(e);
}
var mn = S3;
function k3(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var ut = k3, O3 = mn, D3 = ut, P3 = "[object AsyncFunction]", M3 = "[object Function]", T3 = "[object GeneratorFunction]", A3 = "[object Proxy]";
function L3(e) {
  if (!D3(e))
    return !1;
  var t = O3(e);
  return t == M3 || t == T3 || t == P3 || t == A3;
}
var To = L3, $3 = et, B3 = $3["__core-js_shared__"], E3 = B3, or = E3, Kl = function() {
  var e = /[^.]+$/.exec(or && or.keys && or.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function I3(e) {
  return !!Kl && Kl in e;
}
var F3 = I3, R3 = Function.prototype, N3 = R3.toString;
function j3(e) {
  if (e != null) {
    try {
      return N3.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var $d = j3, z3 = To, V3 = F3, H3 = ut, W3 = $d, Y3 = /[\\^$.*+?()[\]{}|]/g, U3 = /^\[object .+?Constructor\]$/, q3 = Function.prototype, G3 = Object.prototype, K3 = q3.toString, X3 = G3.hasOwnProperty, Z3 = RegExp(
  "^" + K3.call(X3).replace(Y3, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Q3(e) {
  if (!H3(e) || V3(e))
    return !1;
  var t = z3(e) ? Z3 : U3;
  return t.test(W3(e));
}
var J3 = Q3;
function e4(e, t) {
  return e == null ? void 0 : e[t];
}
var t4 = e4, n4 = J3, a4 = t4;
function i4(e, t) {
  var n = a4(e, t);
  return n4(n) ? n : void 0;
}
var Gt = i4, r4 = Gt, o4 = function() {
  try {
    var e = r4(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Bd = o4, Xl = Bd;
function s4(e, t, n) {
  t == "__proto__" && Xl ? Xl(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var Ao = s4;
function l4(e, t) {
  return e === t || e !== e && t !== t;
}
var va = l4, c4 = Ao, u4 = va, d4 = Object.prototype, f4 = d4.hasOwnProperty;
function h4(e, t, n) {
  var a = e[t];
  (!(f4.call(e, t) && u4(a, n)) || n === void 0 && !(t in e)) && c4(e, t, n);
}
var Ed = h4, g4 = Ed, m4 = Ao;
function v4(e, t, n, a) {
  var i = !n;
  n || (n = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var s = t[r], l = a ? a(n[s], e[s], s, n, e) : void 0;
    l === void 0 && (l = e[s]), i ? m4(n, s, l) : g4(n, s, l);
  }
  return n;
}
var Id = v4;
function p4(e) {
  return e;
}
var Lo = p4;
function b4(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
var y4 = b4, C4 = y4, Zl = Math.max;
function x4(e, t, n) {
  return t = Zl(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var a = arguments, i = -1, r = Zl(a.length - t, 0), o = Array(r); ++i < r; )
      o[i] = a[t + i];
    i = -1;
    for (var s = Array(t + 1); ++i < t; )
      s[i] = a[i];
    return s[t] = n(o), C4(e, this, s);
  };
}
var _4 = x4;
function w4(e) {
  return function() {
    return e;
  };
}
var S4 = w4, k4 = S4, Ql = Bd, O4 = Lo, D4 = Ql ? function(e, t) {
  return Ql(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: k4(t),
    writable: !0
  });
} : O4, P4 = D4, M4 = 800, T4 = 16, A4 = Date.now;
function L4(e) {
  var t = 0, n = 0;
  return function() {
    var a = A4(), i = T4 - (a - n);
    if (n = a, i > 0) {
      if (++t >= M4)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var $4 = L4, B4 = P4, E4 = $4, I4 = E4(B4), F4 = I4, R4 = Lo, N4 = _4, j4 = F4;
function z4(e, t) {
  return j4(N4(e, t, R4), e + "");
}
var V4 = z4, H4 = 9007199254740991;
function W4(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= H4;
}
var $o = W4, Y4 = To, U4 = $o;
function q4(e) {
  return e != null && U4(e.length) && !Y4(e);
}
var vn = q4, G4 = 9007199254740991, K4 = /^(?:0|[1-9]\d*)$/;
function X4(e, t) {
  var n = typeof e;
  return t = t ?? G4, !!t && (n == "number" || n != "symbol" && K4.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Bo = X4, Z4 = va, Q4 = vn, J4 = Bo, ey = ut;
function ty(e, t, n) {
  if (!ey(n))
    return !1;
  var a = typeof t;
  return (a == "number" ? Q4(n) && J4(t, n.length) : a == "string" && t in n) ? Z4(n[t], e) : !1;
}
var ny = ty, ay = V4, iy = ny;
function ry(e) {
  return ay(function(t, n) {
    var a = -1, i = n.length, r = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && iy(n[0], n[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++a < i; ) {
      var s = n[a];
      s && e(t, s, a, r);
    }
    return t;
  });
}
var Fd = ry, oy = Object.prototype;
function sy(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || oy;
  return e === n;
}
var Li = sy;
function ly(e, t) {
  for (var n = -1, a = Array(e); ++n < e; )
    a[n] = t(n);
  return a;
}
var cy = ly;
function uy(e) {
  return e != null && typeof e == "object";
}
var Kt = uy, dy = mn, fy = Kt, hy = "[object Arguments]";
function gy(e) {
  return fy(e) && dy(e) == hy;
}
var my = gy, Jl = my, vy = Kt, Rd = Object.prototype, py = Rd.hasOwnProperty, by = Rd.propertyIsEnumerable, yy = Jl(/* @__PURE__ */ function() {
  return arguments;
}()) ? Jl : function(e) {
  return vy(e) && py.call(e, "callee") && !by.call(e, "callee");
}, Eo = yy, Cy = Array.isArray, dt = Cy, oi = { exports: {} };
function xy() {
  return !1;
}
var _y = xy;
oi.exports;
(function(e, t) {
  var n = et, a = _y, i = t && !t.nodeType && t, r = i && !0 && e && !e.nodeType && e, o = r && r.exports === i, s = o ? n.Buffer : void 0, l = s ? s.isBuffer : void 0, c = l || a;
  e.exports = c;
})(oi, oi.exports);
var Io = oi.exports, wy = mn, Sy = $o, ky = Kt, Oy = "[object Arguments]", Dy = "[object Array]", Py = "[object Boolean]", My = "[object Date]", Ty = "[object Error]", Ay = "[object Function]", Ly = "[object Map]", $y = "[object Number]", By = "[object Object]", Ey = "[object RegExp]", Iy = "[object Set]", Fy = "[object String]", Ry = "[object WeakMap]", Ny = "[object ArrayBuffer]", jy = "[object DataView]", zy = "[object Float32Array]", Vy = "[object Float64Array]", Hy = "[object Int8Array]", Wy = "[object Int16Array]", Yy = "[object Int32Array]", Uy = "[object Uint8Array]", qy = "[object Uint8ClampedArray]", Gy = "[object Uint16Array]", Ky = "[object Uint32Array]", G = {};
G[zy] = G[Vy] = G[Hy] = G[Wy] = G[Yy] = G[Uy] = G[qy] = G[Gy] = G[Ky] = !0;
G[Oy] = G[Dy] = G[Ny] = G[Py] = G[jy] = G[My] = G[Ty] = G[Ay] = G[Ly] = G[$y] = G[By] = G[Ey] = G[Iy] = G[Fy] = G[Ry] = !1;
function Xy(e) {
  return ky(e) && Sy(e.length) && !!G[wy(e)];
}
var Zy = Xy;
function Qy(e) {
  return function(t) {
    return e(t);
  };
}
var Jy = Qy, si = { exports: {} };
si.exports;
(function(e, t) {
  var n = Ad, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, r = i && i.exports === a, o = r && n.process, s = function() {
    try {
      var l = i && i.require && i.require("util").types;
      return l || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(si, si.exports);
var e5 = si.exports, t5 = Zy, n5 = Jy, ec = e5, tc = ec && ec.isTypedArray, a5 = tc ? n5(tc) : t5, Fo = a5, i5 = cy, r5 = Eo, o5 = dt, s5 = Io, l5 = Bo, c5 = Fo, u5 = Object.prototype, d5 = u5.hasOwnProperty;
function f5(e, t) {
  var n = o5(e), a = !n && r5(e), i = !n && !a && s5(e), r = !n && !a && !i && c5(e), o = n || a || i || r, s = o ? i5(e.length, String) : [], l = s.length;
  for (var c in e)
    (t || d5.call(e, c)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    l5(c, l))) && s.push(c);
  return s;
}
var Nd = f5;
function h5(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var jd = h5, g5 = jd, m5 = g5(Object.keys, Object), v5 = m5, p5 = Li, b5 = v5, y5 = Object.prototype, C5 = y5.hasOwnProperty;
function x5(e) {
  if (!p5(e))
    return b5(e);
  var t = [];
  for (var n in Object(e))
    C5.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var _5 = x5, w5 = Nd, S5 = _5, k5 = vn;
function O5(e) {
  return k5(e) ? w5(e) : S5(e);
}
var $i = O5, D5 = Ed, P5 = Id, M5 = Fd, T5 = vn, A5 = Li, L5 = $i, $5 = Object.prototype, B5 = $5.hasOwnProperty, E5 = M5(function(e, t) {
  if (A5(t) || T5(t)) {
    P5(t, L5(t), e);
    return;
  }
  for (var n in t)
    B5.call(t, n) && D5(e, n, t[n]);
}), I5 = E5, nc = /* @__PURE__ */ Mo(I5);
function F5() {
  this.__data__ = [], this.size = 0;
}
var R5 = F5, N5 = va;
function j5(e, t) {
  for (var n = e.length; n--; )
    if (N5(e[n][0], t))
      return n;
  return -1;
}
var Bi = j5, z5 = Bi, V5 = Array.prototype, H5 = V5.splice;
function W5(e) {
  var t = this.__data__, n = z5(t, e);
  if (n < 0)
    return !1;
  var a = t.length - 1;
  return n == a ? t.pop() : H5.call(t, n, 1), --this.size, !0;
}
var Y5 = W5, U5 = Bi;
function q5(e) {
  var t = this.__data__, n = U5(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var G5 = q5, K5 = Bi;
function X5(e) {
  return K5(this.__data__, e) > -1;
}
var Z5 = X5, Q5 = Bi;
function J5(e, t) {
  var n = this.__data__, a = Q5(n, e);
  return a < 0 ? (++this.size, n.push([e, t])) : n[a][1] = t, this;
}
var e6 = J5, t6 = R5, n6 = Y5, a6 = G5, i6 = Z5, r6 = e6;
function pn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
pn.prototype.clear = t6;
pn.prototype.delete = n6;
pn.prototype.get = a6;
pn.prototype.has = i6;
pn.prototype.set = r6;
var Ei = pn, o6 = Ei;
function s6() {
  this.__data__ = new o6(), this.size = 0;
}
var l6 = s6;
function c6(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var u6 = c6;
function d6(e) {
  return this.__data__.get(e);
}
var f6 = d6;
function h6(e) {
  return this.__data__.has(e);
}
var g6 = h6, m6 = Gt, v6 = et, p6 = m6(v6, "Map"), Ro = p6, b6 = Gt, y6 = b6(Object, "create"), Ii = y6, ac = Ii;
function C6() {
  this.__data__ = ac ? ac(null) : {}, this.size = 0;
}
var x6 = C6;
function _6(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var w6 = _6, S6 = Ii, k6 = "__lodash_hash_undefined__", O6 = Object.prototype, D6 = O6.hasOwnProperty;
function P6(e) {
  var t = this.__data__;
  if (S6) {
    var n = t[e];
    return n === k6 ? void 0 : n;
  }
  return D6.call(t, e) ? t[e] : void 0;
}
var M6 = P6, T6 = Ii, A6 = Object.prototype, L6 = A6.hasOwnProperty;
function $6(e) {
  var t = this.__data__;
  return T6 ? t[e] !== void 0 : L6.call(t, e);
}
var B6 = $6, E6 = Ii, I6 = "__lodash_hash_undefined__";
function F6(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = E6 && t === void 0 ? I6 : t, this;
}
var R6 = F6, N6 = x6, j6 = w6, z6 = M6, V6 = B6, H6 = R6;
function bn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
bn.prototype.clear = N6;
bn.prototype.delete = j6;
bn.prototype.get = z6;
bn.prototype.has = V6;
bn.prototype.set = H6;
var W6 = bn, ic = W6, Y6 = Ei, U6 = Ro;
function q6() {
  this.size = 0, this.__data__ = {
    hash: new ic(),
    map: new (U6 || Y6)(),
    string: new ic()
  };
}
var G6 = q6;
function K6(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var X6 = K6, Z6 = X6;
function Q6(e, t) {
  var n = e.__data__;
  return Z6(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var Fi = Q6, J6 = Fi;
function e7(e) {
  var t = J6(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var t7 = e7, n7 = Fi;
function a7(e) {
  return n7(this, e).get(e);
}
var i7 = a7, r7 = Fi;
function o7(e) {
  return r7(this, e).has(e);
}
var s7 = o7, l7 = Fi;
function c7(e, t) {
  var n = l7(this, e), a = n.size;
  return n.set(e, t), this.size += n.size == a ? 0 : 1, this;
}
var u7 = c7, d7 = G6, f7 = t7, h7 = i7, g7 = s7, m7 = u7;
function yn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
yn.prototype.clear = d7;
yn.prototype.delete = f7;
yn.prototype.get = h7;
yn.prototype.has = g7;
yn.prototype.set = m7;
var No = yn, v7 = Ei, p7 = Ro, b7 = No, y7 = 200;
function C7(e, t) {
  var n = this.__data__;
  if (n instanceof v7) {
    var a = n.__data__;
    if (!p7 || a.length < y7 - 1)
      return a.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new b7(a);
  }
  return n.set(e, t), this.size = n.size, this;
}
var x7 = C7, _7 = Ei, w7 = l6, S7 = u6, k7 = f6, O7 = g6, D7 = x7;
function Cn(e) {
  var t = this.__data__ = new _7(e);
  this.size = t.size;
}
Cn.prototype.clear = w7;
Cn.prototype.delete = S7;
Cn.prototype.get = k7;
Cn.prototype.has = O7;
Cn.prototype.set = D7;
var jo = Cn, P7 = "__lodash_hash_undefined__";
function M7(e) {
  return this.__data__.set(e, P7), this;
}
var T7 = M7;
function A7(e) {
  return this.__data__.has(e);
}
var L7 = A7, $7 = No, B7 = T7, E7 = L7;
function li(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new $7(); ++t < n; )
    this.add(e[t]);
}
li.prototype.add = li.prototype.push = B7;
li.prototype.has = E7;
var I7 = li;
function F7(e, t) {
  for (var n = -1, a = e == null ? 0 : e.length; ++n < a; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
var R7 = F7;
function N7(e, t) {
  return e.has(t);
}
var j7 = N7, z7 = I7, V7 = R7, H7 = j7, W7 = 1, Y7 = 2;
function U7(e, t, n, a, i, r) {
  var o = n & W7, s = e.length, l = t.length;
  if (s != l && !(o && l > s))
    return !1;
  var c = r.get(e), u = r.get(t);
  if (c && u)
    return c == t && u == e;
  var d = -1, f = !0, g = n & Y7 ? new z7() : void 0;
  for (r.set(e, t), r.set(t, e); ++d < s; ) {
    var m = e[d], v = t[d];
    if (a)
      var p = o ? a(v, m, d, t, e, r) : a(m, v, d, e, t, r);
    if (p !== void 0) {
      if (p)
        continue;
      f = !1;
      break;
    }
    if (g) {
      if (!V7(t, function(b, y) {
        if (!H7(g, y) && (m === b || i(m, b, n, a, r)))
          return g.push(y);
      })) {
        f = !1;
        break;
      }
    } else if (!(m === v || i(m, v, n, a, r))) {
      f = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), f;
}
var zd = U7, q7 = et, G7 = q7.Uint8Array, Vd = G7;
function K7(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(a, i) {
    n[++t] = [i, a];
  }), n;
}
var X7 = K7;
function Z7(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(a) {
    n[++t] = a;
  }), n;
}
var Q7 = Z7, rc = Ai, oc = Vd, J7 = va, e8 = zd, t8 = X7, n8 = Q7, a8 = 1, i8 = 2, r8 = "[object Boolean]", o8 = "[object Date]", s8 = "[object Error]", l8 = "[object Map]", c8 = "[object Number]", u8 = "[object RegExp]", d8 = "[object Set]", f8 = "[object String]", h8 = "[object Symbol]", g8 = "[object ArrayBuffer]", m8 = "[object DataView]", sc = rc ? rc.prototype : void 0, sr = sc ? sc.valueOf : void 0;
function v8(e, t, n, a, i, r, o) {
  switch (n) {
    case m8:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case g8:
      return !(e.byteLength != t.byteLength || !r(new oc(e), new oc(t)));
    case r8:
    case o8:
    case c8:
      return J7(+e, +t);
    case s8:
      return e.name == t.name && e.message == t.message;
    case u8:
    case f8:
      return e == t + "";
    case l8:
      var s = t8;
    case d8:
      var l = a & a8;
      if (s || (s = n8), e.size != t.size && !l)
        return !1;
      var c = o.get(e);
      if (c)
        return c == t;
      a |= i8, o.set(e, t);
      var u = e8(s(e), s(t), a, i, r, o);
      return o.delete(e), u;
    case h8:
      if (sr)
        return sr.call(e) == sr.call(t);
  }
  return !1;
}
var p8 = v8;
function b8(e, t) {
  for (var n = -1, a = t.length, i = e.length; ++n < a; )
    e[i + n] = t[n];
  return e;
}
var y8 = b8, C8 = y8, x8 = dt;
function _8(e, t, n) {
  var a = t(e);
  return x8(e) ? a : C8(a, n(e));
}
var w8 = _8;
function S8(e, t) {
  for (var n = -1, a = e == null ? 0 : e.length, i = 0, r = []; ++n < a; ) {
    var o = e[n];
    t(o, n, e) && (r[i++] = o);
  }
  return r;
}
var k8 = S8;
function O8() {
  return [];
}
var D8 = O8, P8 = k8, M8 = D8, T8 = Object.prototype, A8 = T8.propertyIsEnumerable, lc = Object.getOwnPropertySymbols, L8 = lc ? function(e) {
  return e == null ? [] : (e = Object(e), P8(lc(e), function(t) {
    return A8.call(e, t);
  }));
} : M8, $8 = L8, B8 = w8, E8 = $8, I8 = $i;
function F8(e) {
  return B8(e, I8, E8);
}
var R8 = F8, cc = R8, N8 = 1, j8 = Object.prototype, z8 = j8.hasOwnProperty;
function V8(e, t, n, a, i, r) {
  var o = n & N8, s = cc(e), l = s.length, c = cc(t), u = c.length;
  if (l != u && !o)
    return !1;
  for (var d = l; d--; ) {
    var f = s[d];
    if (!(o ? f in t : z8.call(t, f)))
      return !1;
  }
  var g = r.get(e), m = r.get(t);
  if (g && m)
    return g == t && m == e;
  var v = !0;
  r.set(e, t), r.set(t, e);
  for (var p = o; ++d < l; ) {
    f = s[d];
    var b = e[f], y = t[f];
    if (a)
      var w = o ? a(y, b, f, t, e, r) : a(b, y, f, e, t, r);
    if (!(w === void 0 ? b === y || i(b, y, n, a, r) : w)) {
      v = !1;
      break;
    }
    p || (p = f == "constructor");
  }
  if (v && !p) {
    var x = e.constructor, C = t.constructor;
    x != C && "constructor" in e && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof C == "function" && C instanceof C) && (v = !1);
  }
  return r.delete(e), r.delete(t), v;
}
var H8 = V8, W8 = Gt, Y8 = et, U8 = W8(Y8, "DataView"), q8 = U8, G8 = Gt, K8 = et, X8 = G8(K8, "Promise"), Z8 = X8, Q8 = Gt, J8 = et, e9 = Q8(J8, "Set"), t9 = e9, n9 = Gt, a9 = et, i9 = n9(a9, "WeakMap"), r9 = i9, Ir = q8, Fr = Ro, Rr = Z8, Nr = t9, jr = r9, Hd = mn, xn = $d, uc = "[object Map]", o9 = "[object Object]", dc = "[object Promise]", fc = "[object Set]", hc = "[object WeakMap]", gc = "[object DataView]", s9 = xn(Ir), l9 = xn(Fr), c9 = xn(Rr), u9 = xn(Nr), d9 = xn(jr), Bt = Hd;
(Ir && Bt(new Ir(new ArrayBuffer(1))) != gc || Fr && Bt(new Fr()) != uc || Rr && Bt(Rr.resolve()) != dc || Nr && Bt(new Nr()) != fc || jr && Bt(new jr()) != hc) && (Bt = function(e) {
  var t = Hd(e), n = t == o9 ? e.constructor : void 0, a = n ? xn(n) : "";
  if (a)
    switch (a) {
      case s9:
        return gc;
      case l9:
        return uc;
      case c9:
        return dc;
      case u9:
        return fc;
      case d9:
        return hc;
    }
  return t;
});
var f9 = Bt, lr = jo, h9 = zd, g9 = p8, m9 = H8, mc = f9, vc = dt, pc = Io, v9 = Fo, p9 = 1, bc = "[object Arguments]", yc = "[object Array]", Ea = "[object Object]", b9 = Object.prototype, Cc = b9.hasOwnProperty;
function y9(e, t, n, a, i, r) {
  var o = vc(e), s = vc(t), l = o ? yc : mc(e), c = s ? yc : mc(t);
  l = l == bc ? Ea : l, c = c == bc ? Ea : c;
  var u = l == Ea, d = c == Ea, f = l == c;
  if (f && pc(e)) {
    if (!pc(t))
      return !1;
    o = !0, u = !1;
  }
  if (f && !u)
    return r || (r = new lr()), o || v9(e) ? h9(e, t, n, a, i, r) : g9(e, t, l, n, a, i, r);
  if (!(n & p9)) {
    var g = u && Cc.call(e, "__wrapped__"), m = d && Cc.call(t, "__wrapped__");
    if (g || m) {
      var v = g ? e.value() : e, p = m ? t.value() : t;
      return r || (r = new lr()), i(v, p, n, a, r);
    }
  }
  return f ? (r || (r = new lr()), m9(e, t, n, a, i, r)) : !1;
}
var C9 = y9, x9 = C9, xc = Kt;
function Wd(e, t, n, a, i) {
  return e === t ? !0 : e == null || t == null || !xc(e) && !xc(t) ? e !== e && t !== t : x9(e, t, n, a, Wd, i);
}
var Yd = Wd, _9 = jo, w9 = Yd, S9 = 1, k9 = 2;
function O9(e, t, n, a) {
  var i = n.length, r = i, o = !a;
  if (e == null)
    return !r;
  for (e = Object(e); i--; ) {
    var s = n[i];
    if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e))
      return !1;
  }
  for (; ++i < r; ) {
    s = n[i];
    var l = s[0], c = e[l], u = s[1];
    if (o && s[2]) {
      if (c === void 0 && !(l in e))
        return !1;
    } else {
      var d = new _9();
      if (a)
        var f = a(c, u, l, e, t, d);
      if (!(f === void 0 ? w9(u, c, S9 | k9, a, d) : f))
        return !1;
    }
  }
  return !0;
}
var D9 = O9, P9 = ut;
function M9(e) {
  return e === e && !P9(e);
}
var Ud = M9, T9 = Ud, A9 = $i;
function L9(e) {
  for (var t = A9(e), n = t.length; n--; ) {
    var a = t[n], i = e[a];
    t[n] = [a, i, T9(i)];
  }
  return t;
}
var $9 = L9;
function B9(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
var qd = B9, E9 = D9, I9 = $9, F9 = qd;
function R9(e) {
  var t = I9(e);
  return t.length == 1 && t[0][2] ? F9(t[0][0], t[0][1]) : function(n) {
    return n === e || E9(n, e, t);
  };
}
var N9 = R9, j9 = mn, z9 = Kt, V9 = "[object Symbol]";
function H9(e) {
  return typeof e == "symbol" || z9(e) && j9(e) == V9;
}
var Ri = H9, W9 = dt, Y9 = Ri, U9 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, q9 = /^\w*$/;
function G9(e, t) {
  if (W9(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || Y9(e) ? !0 : q9.test(e) || !U9.test(e) || t != null && e in Object(t);
}
var zo = G9, Gd = No, K9 = "Expected a function";
function Vo(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(K9);
  var n = function() {
    var a = arguments, i = t ? t.apply(this, a) : a[0], r = n.cache;
    if (r.has(i))
      return r.get(i);
    var o = e.apply(this, a);
    return n.cache = r.set(i, o) || r, o;
  };
  return n.cache = new (Vo.Cache || Gd)(), n;
}
Vo.Cache = Gd;
var X9 = Vo, Z9 = X9, Q9 = 500;
function J9(e) {
  var t = Z9(e, function(a) {
    return n.size === Q9 && n.clear(), a;
  }), n = t.cache;
  return t;
}
var eC = J9, tC = eC, nC = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, aC = /\\(\\)?/g, iC = tC(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(nC, function(n, a, i, r) {
    t.push(i ? r.replace(aC, "$1") : a || n);
  }), t;
}), rC = iC;
function oC(e, t) {
  for (var n = -1, a = e == null ? 0 : e.length, i = Array(a); ++n < a; )
    i[n] = t(e[n], n, e);
  return i;
}
var sC = oC, _c = Ai, lC = sC, cC = dt, uC = Ri, dC = 1 / 0, wc = _c ? _c.prototype : void 0, Sc = wc ? wc.toString : void 0;
function Kd(e) {
  if (typeof e == "string")
    return e;
  if (cC(e))
    return lC(e, Kd) + "";
  if (uC(e))
    return Sc ? Sc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -dC ? "-0" : t;
}
var fC = Kd, hC = fC;
function gC(e) {
  return e == null ? "" : hC(e);
}
var mC = gC, vC = dt, pC = zo, bC = rC, yC = mC;
function CC(e, t) {
  return vC(e) ? e : pC(e, t) ? [e] : bC(yC(e));
}
var Xd = CC, xC = Ri, _C = 1 / 0;
function wC(e) {
  if (typeof e == "string" || xC(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -_C ? "-0" : t;
}
var Ni = wC, SC = Xd, kC = Ni;
function OC(e, t) {
  t = SC(t, e);
  for (var n = 0, a = t.length; e != null && n < a; )
    e = e[kC(t[n++])];
  return n && n == a ? e : void 0;
}
var Zd = OC, DC = Zd;
function PC(e, t, n) {
  var a = e == null ? void 0 : DC(e, t);
  return a === void 0 ? n : a;
}
var MC = PC;
function TC(e, t) {
  return e != null && t in Object(e);
}
var AC = TC, LC = Xd, $C = Eo, BC = dt, EC = Bo, IC = $o, FC = Ni;
function RC(e, t, n) {
  t = LC(t, e);
  for (var a = -1, i = t.length, r = !1; ++a < i; ) {
    var o = FC(t[a]);
    if (!(r = e != null && n(e, o)))
      break;
    e = e[o];
  }
  return r || ++a != i ? r : (i = e == null ? 0 : e.length, !!i && IC(i) && EC(o, i) && (BC(e) || $C(e)));
}
var NC = RC, jC = AC, zC = NC;
function VC(e, t) {
  return e != null && zC(e, t, jC);
}
var HC = VC, WC = Yd, YC = MC, UC = HC, qC = zo, GC = Ud, KC = qd, XC = Ni, ZC = 1, QC = 2;
function JC(e, t) {
  return qC(e) && GC(t) ? KC(XC(e), t) : function(n) {
    var a = YC(n, e);
    return a === void 0 && a === t ? UC(n, e) : WC(t, a, ZC | QC);
  };
}
var ex = JC;
function tx(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var nx = tx, ax = Zd;
function ix(e) {
  return function(t) {
    return ax(t, e);
  };
}
var rx = ix, ox = nx, sx = rx, lx = zo, cx = Ni;
function ux(e) {
  return lx(e) ? ox(cx(e)) : sx(e);
}
var dx = ux, fx = N9, hx = ex, gx = Lo, mx = dt, vx = dx;
function px(e) {
  return typeof e == "function" ? e : e == null ? gx : typeof e == "object" ? mx(e) ? hx(e[0], e[1]) : fx(e) : vx(e);
}
var Qd = px, bx = Qd, yx = vn, Cx = $i;
function xx(e) {
  return function(t, n, a) {
    var i = Object(t);
    if (!yx(t)) {
      var r = bx(n);
      t = Cx(t), n = function(s) {
        return r(i[s], s, i);
      };
    }
    var o = e(t, n, a);
    return o > -1 ? i[r ? t[o] : o] : void 0;
  };
}
var _x = xx;
function wx(e, t, n, a) {
  for (var i = e.length, r = n + (a ? 1 : -1); a ? r-- : ++r < i; )
    if (t(e[r], r, e))
      return r;
  return -1;
}
var Sx = wx, kx = /\s/;
function Ox(e) {
  for (var t = e.length; t-- && kx.test(e.charAt(t)); )
    ;
  return t;
}
var Dx = Ox, Px = Dx, Mx = /^\s+/;
function Tx(e) {
  return e && e.slice(0, Px(e) + 1).replace(Mx, "");
}
var Ax = Tx, Lx = Ax, kc = ut, $x = Ri, Oc = NaN, Bx = /^[-+]0x[0-9a-f]+$/i, Ex = /^0b[01]+$/i, Ix = /^0o[0-7]+$/i, Fx = parseInt;
function Rx(e) {
  if (typeof e == "number")
    return e;
  if ($x(e))
    return Oc;
  if (kc(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = kc(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Lx(e);
  var n = Ex.test(e);
  return n || Ix.test(e) ? Fx(e.slice(2), n ? 2 : 8) : Bx.test(e) ? Oc : +e;
}
var Nx = Rx, jx = Nx, Dc = 1 / 0, zx = 17976931348623157e292;
function Vx(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = jx(e), e === Dc || e === -Dc) {
    var t = e < 0 ? -1 : 1;
    return t * zx;
  }
  return e === e ? e : 0;
}
var Hx = Vx, Wx = Hx;
function Yx(e) {
  var t = Wx(e), n = t % 1;
  return t === t ? n ? t - n : t : 0;
}
var Ux = Yx, qx = Sx, Gx = Qd, Kx = Ux, Xx = Math.max;
function Zx(e, t, n) {
  var a = e == null ? 0 : e.length;
  if (!a)
    return -1;
  var i = n == null ? 0 : Kx(n);
  return i < 0 && (i = Xx(a + i, 0)), qx(e, Gx(t), i);
}
var Qx = Zx, Jx = _x, e_ = Qx, t_ = Jx(e_), n_ = t_, a_ = /* @__PURE__ */ Mo(n_), i_ = Ao, r_ = va;
function o_(e, t, n) {
  (n !== void 0 && !r_(e[t], n) || n === void 0 && !(t in e)) && i_(e, t, n);
}
var Jd = o_;
function s_(e) {
  return function(t, n, a) {
    for (var i = -1, r = Object(t), o = a(t), s = o.length; s--; ) {
      var l = o[e ? s : ++i];
      if (n(r[l], l, r) === !1)
        break;
    }
    return t;
  };
}
var l_ = s_, c_ = l_, u_ = c_(), d_ = u_, ci = { exports: {} };
ci.exports;
(function(e, t) {
  var n = et, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, r = i && i.exports === a, o = r ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function l(c, u) {
    if (u)
      return c.slice();
    var d = c.length, f = s ? s(d) : new c.constructor(d);
    return c.copy(f), f;
  }
  e.exports = l;
})(ci, ci.exports);
var f_ = ci.exports, Pc = Vd;
function h_(e) {
  var t = new e.constructor(e.byteLength);
  return new Pc(t).set(new Pc(e)), t;
}
var g_ = h_, m_ = g_;
function v_(e, t) {
  var n = t ? m_(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var p_ = v_;
function b_(e, t) {
  var n = -1, a = e.length;
  for (t || (t = Array(a)); ++n < a; )
    t[n] = e[n];
  return t;
}
var y_ = b_, C_ = ut, Mc = Object.create, x_ = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!C_(t))
      return {};
    if (Mc)
      return Mc(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), __ = x_, w_ = jd, S_ = w_(Object.getPrototypeOf, Object), ef = S_, k_ = __, O_ = ef, D_ = Li;
function P_(e) {
  return typeof e.constructor == "function" && !D_(e) ? k_(O_(e)) : {};
}
var M_ = P_, T_ = vn, A_ = Kt;
function L_(e) {
  return A_(e) && T_(e);
}
var $_ = L_, B_ = mn, E_ = ef, I_ = Kt, F_ = "[object Object]", R_ = Function.prototype, N_ = Object.prototype, tf = R_.toString, j_ = N_.hasOwnProperty, z_ = tf.call(Object);
function V_(e) {
  if (!I_(e) || B_(e) != F_)
    return !1;
  var t = E_(e);
  if (t === null)
    return !0;
  var n = j_.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && tf.call(n) == z_;
}
var H_ = V_;
function W_(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var nf = W_;
function Y_(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var U_ = Y_, q_ = ut, G_ = Li, K_ = U_, X_ = Object.prototype, Z_ = X_.hasOwnProperty;
function Q_(e) {
  if (!q_(e))
    return K_(e);
  var t = G_(e), n = [];
  for (var a in e)
    a == "constructor" && (t || !Z_.call(e, a)) || n.push(a);
  return n;
}
var J_ = Q_, ew = Nd, tw = J_, nw = vn;
function aw(e) {
  return nw(e) ? ew(e, !0) : tw(e);
}
var af = aw, iw = Id, rw = af;
function ow(e) {
  return iw(e, rw(e));
}
var sw = ow, Tc = Jd, lw = f_, cw = p_, uw = y_, dw = M_, Ac = Eo, Lc = dt, fw = $_, hw = Io, gw = To, mw = ut, vw = H_, pw = Fo, $c = nf, bw = sw;
function yw(e, t, n, a, i, r, o) {
  var s = $c(e, n), l = $c(t, n), c = o.get(l);
  if (c) {
    Tc(e, n, c);
    return;
  }
  var u = r ? r(s, l, n + "", e, t, o) : void 0, d = u === void 0;
  if (d) {
    var f = Lc(l), g = !f && hw(l), m = !f && !g && pw(l);
    u = l, f || g || m ? Lc(s) ? u = s : fw(s) ? u = uw(s) : g ? (d = !1, u = lw(l, !0)) : m ? (d = !1, u = cw(l, !0)) : u = [] : vw(l) || Ac(l) ? (u = s, Ac(s) ? u = bw(s) : (!mw(s) || gw(s)) && (u = dw(l))) : d = !1;
  }
  d && (o.set(l, u), i(u, l, a, r, o), o.delete(l)), Tc(e, n, u);
}
var Cw = yw, xw = jo, _w = Jd, ww = d_, Sw = Cw, kw = ut, Ow = af, Dw = nf;
function rf(e, t, n, a, i) {
  e !== t && ww(t, function(r, o) {
    if (i || (i = new xw()), kw(r))
      Sw(e, t, o, n, rf, a, i);
    else {
      var s = a ? a(Dw(e, o), r, o + "", e, t, i) : void 0;
      s === void 0 && (s = r), _w(e, o, s);
    }
  }, Ow);
}
var Pw = rf, Mw = Pw, Tw = Fd, Aw = Tw(function(e, t, n) {
  Mw(e, t, n);
}), Lw = Aw, $w = /* @__PURE__ */ Mo(Lw);
const le = S({
  name: "CChart",
  props: {
    /**
     * Enables custom html based tooltips instead of standard tooltips.
     *
     * @default true
     */
    customTooltips: {
      type: Boolean,
      default: !0
    },
    /**
     * The data object that is passed into the Chart.js chart (more info).
     */
    data: {
      type: [Object, Function],
      required: !0
    },
    /**
     * Height attribute applied to the rendered canvas.
     *
     * @default 150
     */
    height: {
      type: Number,
      default: 150
    },
    /**
     * ID attribute applied to the rendered canvas.
     */
    id: {
      type: String
    },
    /**
     * The options object that is passed into the Chart.js chartRef.value.
     *
     * {@link https://www.chartjs.org/docs/latest/general/options.html More Info}
     */
    options: {
      type: Object
    },
    /**
     * The plugins array that is passed into the Chart.js chart (more info)
     *
     * {@link https://www.chartjs.org/docs/latest/developers/plugins.html More Info}
     */
    plugins: {
      type: Array
    },
    /**
     * If true, will tear down and redraw chart on all updates.
     */
    redraw: Boolean,
    /**
     * Chart.js chart type.
     *
     * @type 'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter'
     */
    type: {
      type: String,
      default: "bar"
    },
    /**
     * Width attribute applied to the rendered canvas.
     *
     * @default 300
     */
    width: {
      type: Number,
      default: 300
    },
    /**
     * Put the chart into the wrapper div element.
     *
     * @default true
     */
    wrapper: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    /**
     * Proxy for Chart.js getDatasetAtEvent. Calls with dataset and triggering event.
     */
    "getDatasetAtEvent",
    /**
     * Proxy for Chart.js getElementAtEvent. Calls with single element array and triggering event.
     */
    "getElementAtEvent",
    /**
     * Proxy for Chart.js getElementsAtEvent. Calls with element array and triggering event.
     */
    "getElementsAtEvent"
  ],
  setup(e, { expose: t, emit: n, slots: a }) {
    const i = O(null), r = vf(null), o = j(() => typeof e.data == "function" ? i.value ? e.data(i.value) : { datasets: [] } : $w({}, e.data)), s = () => {
      i.value && (e.customTooltips && (R.plugins.tooltip.enabled = !1, R.plugins.tooltip.mode = "index", R.plugins.tooltip.position = "nearest", R.plugins.tooltip.external = r3), r.value = new Oi(i.value, {
        type: e.type,
        data: o.value,
        options: e.options,
        plugins: e.plugins
      }));
    }, l = (f) => {
      r.value && (n("getDatasetAtEvent", r.value.getElementsAtEventForMode(f, "dataset", { intersect: !0 }, !1), f), n("getElementAtEvent", r.value.getElementsAtEventForMode(f, "nearest", { intersect: !0 }, !1), f), n("getElementsAtEvent", r.value.getElementsAtEventForMode(f, "index", { intersect: !0 }, !1), f));
    }, c = () => {
      if (!r.value)
        return;
      if (e.options && (r.value.options = { ...e.options }), !r.value.config.data) {
        r.value.config.data = o.value, r.value.update();
        return;
      }
      const { datasets: f = [], ...g } = o.value, { datasets: m = [] } = r.value.config.data;
      nc(r.value.config.data, g), r.value.config.data.datasets = f.map((v) => {
        const p = a_(m, (b) => b.label === v.label && b.type === v.type);
        return !p || !v.data ? v : (p.data ? p.data.length = v.data.length : p.data = [], nc(p.data, v.data), {
          ...p,
          ...v,
          data: p.data
        });
      }), r.value && r.value.update();
    }, u = () => {
      r.value && r.value.destroy();
    };
    _e(() => {
      s();
    }), Nc(() => {
      u();
    }), zr(() => {
      e.redraw ? (u(), setTimeout(() => {
        s();
      }, 0)) : c();
    });
    const d = (f) => h("canvas", {
      id: e.id,
      height: e.height,
      width: e.width,
      onClick: (g) => l(g),
      role: "img",
      ref: f
    }, {
      fallbackContent: () => a.fallback && a.fallback()
    });
    return t({ chart: r }), () => e.wrapper ? h("div", { class: "chart-wrapper" }, d(i)) : d(i);
  }
});
S({
  name: "CChartBar",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "bar" });
  }
});
S({
  name: "CChartBubble",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "bubble" });
  }
});
S({
  name: "CChartDoughnut",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "doughnut" });
  }
});
S({
  name: "CChartLine",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "line" });
  }
});
S({
  name: "CChartPie",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "pie" });
  }
});
S({
  name: "CChartPolarArea",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "polarArea" });
  }
});
S({
  name: "CChartRadar",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "radar" });
  }
});
S({
  name: "CChartScatter",
  extends: le,
  setup(e) {
    return () => h(le, { ...e, type: "scatter" });
  }
});
const Ot = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, i] of t)
    n[a] = i;
  return n;
}, Bw = {
  name: "ReAppBreadcrumb",
  components: { CBreadcrumb: Wc, CBreadcrumbItem: Hc },
  props: {
    router: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = O([]), n = () => e.router.currentRoute.value.matched.map((a) => ({
      active: a.path === e.router.currentRoute.value.fullPath,
      name: a.name,
      path: `${e.router.options.history.base}${a.path}`
    }));
    return E(
      () => e.router.currentRoute.value,
      () => {
        t.value = n();
      },
      { immediate: !0 }
    ), _e(() => {
      t.value = n();
    }), {
      breadcrumbs: t
    };
  }
};
function Ew(e, t, n, a, i, r) {
  const o = X("CBreadcrumbItem"), s = X("CBreadcrumb");
  return J(), Re(s, { class: "d-md-down-none me-auto mb-0" }, {
    default: Q(() => [
      (J(!0), Ie(Rn, null, ja(a.breadcrumbs, (l) => (J(), Re(o, {
        key: l.path,
        href: l.active ? "" : l.path,
        active: l.active,
        class: "text-high-emphasis"
      }, {
        default: Q(() => [
          Kn(Ue(l.name), 1)
        ]),
        _: 2
      }, 1032, ["href", "active"]))), 128))
    ]),
    _: 1
  });
}
const Iw = /* @__PURE__ */ Ot(Bw, [["render", Ew]]), Fw = {
  name: "ReAppFooter",
  components: { CCol: Vn, CFooter: lu },
  props: {
    appName: { type: String, default: "" },
    group: { type: String, default: "" },
    version: { type: String, default: "" }
  }
}, Rw = { key: 0 }, Nw = /* @__PURE__ */ Pe("div", { class: "mx-2" }, null, -1), jw = { key: 0 }, zw = /* @__PURE__ */ Pe("div", { class: "mx-2" }, null, -1), Vw = { key: 0 };
function Hw(e, t, n, a, i, r) {
  const o = X("CCol"), s = X("CFooter");
  return J(), Re(s, { class: "bg-secondary bg-opacity-10" }, {
    default: Q(() => [
      se(o, {
        class: "ms-1 h-100 mb-auto",
        size: "4"
      }, {
        default: Q(() => [
          n.appName ? (J(), Ie("small", Rw, Ue(n.appName) + " © " + Ue((/* @__PURE__ */ new Date()).getFullYear()) + " Red Energy.", 1)) : Nn("", !0)
        ]),
        _: 1
      }),
      Nw,
      se(o, {
        size: "4",
        class: "text-center h-100 mb-auto"
      }, {
        default: Q(() => [
          n.group ? (J(), Ie("small", jw, "User Group/Role: " + Ue(n.group), 1)) : Nn("", !0)
        ]),
        _: 1
      }),
      zw,
      se(o, {
        class: "me-1 text-end h-100 mb-auto",
        size: "4"
      }, {
        default: Q(() => [
          n.version ? (J(), Ie("small", Vw, "Version: " + Ue(n.version), 1)) : Nn("", !0)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Ww = /* @__PURE__ */ Ot(Fw, [["render", Hw]]), Yw = {
  name: "ReAppHeader",
  components: {
    CIcon: Ka,
    CCardTitle: Ur,
    CContainer: cu,
    CHeaderToggler: uu
  },
  props: {
    toggleSidebar: {
      type: Function,
      required: !0
    },
    appName: {
      type: String,
      required: !0
    }
  }
}, Uw = { class: "header-container" }, qw = /* @__PURE__ */ Pe("div", { class: "header bg-re-red" }, null, -1), Gw = { class: "overlay-container px-2 pt-2" }, Kw = { class: "container-content" }, Xw = /* @__PURE__ */ Pe("div", null, null, -1);
function Zw(e, t, n, a, i, r) {
  const o = X("CIcon"), s = X("CHeaderToggler"), l = X("CCardTitle"), c = X("CContainer");
  return J(), Ie("div", Uw, [
    qw,
    Pe("div", Gw, [
      se(c, { fluid: "" }, {
        default: Q(() => [
          Pe("div", Kw, [
            Pe("div", null, [
              se(s, {
                class: "ps-1 text-light",
                onClick: n.toggleSidebar
              }, {
                default: Q(() => [
                  se(o, {
                    icon: "cil-menu",
                    size: "lg"
                  })
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            Pe("div", null, [
              se(l, { class: "text-white" }, {
                default: Q(() => [
                  Kn(Ue(n.appName), 1)
                ]),
                _: 1
              })
            ]),
            Xw
          ])
        ]),
        _: 1
      })
    ])
  ]);
}
const Qw = /* @__PURE__ */ Ot(Yw, [["render", Zw]]), Bc = (e) => decodeURI(e).replace(/#.*$/, "").replace(/(index)?\.(html)$/, ""), Jw = (e, t) => {
  if (t === void 0)
    return !1;
  if (e.hash === t)
    return !0;
  const n = Bc(e.path), a = Bc(t);
  return n === a;
}, of = (e, t) => Jw(e, t.to) ? !0 : t.items ? t.items.some((n) => of(e, n)) : !1, eS = S({
  name: "ReAppSidebarNav",
  components: {
    CNavItem: ao,
    CNavGroup: Cr,
    CNavTitle: fu
  },
  props: {
    appNav: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = wf(), n = O(!0);
    _e(() => {
      n.value = !1;
    });
    const a = (i) => i.items ? h(
      Cr,
      {
        ...n.value && {
          visible: i.items.some((r) => of(t, r))
        }
      },
      {
        togglerContent: () => [
          h(Ka, {
            class: "text-primary",
            customClassName: "nav-icon",
            name: i.icon
          }),
          i.name
        ],
        default: () => i.items.map((r) => a(r))
      }
    ) : i.to ? h(
      Sf,
      {
        to: i.to,
        custom: !0
      },
      {
        default: (r) => h(
          X(i.component),
          {
            active: r.isActive,
            href: r.href,
            onClick: () => r.navigate()
          },
          {
            default: () => [
              i.icon && h(Ka, {
                class: "text-primary",
                customClassName: "nav-icon",
                name: i.icon
              }),
              i.name,
              i.badge && h(
                Vc,
                {
                  class: "ms-auto",
                  color: i.badge.color
                },
                {
                  default: () => i.badge.text
                }
              )
            ]
          }
        )
      }
    ) : h(
      X(i.component),
      {},
      {
        default: () => i.name
      }
    );
    return () => h(
      mu,
      {},
      {
        default: () => e.appNav.map((i) => a(i))
      }
    );
  }
}), tS = {
  name: "AppSidebar",
  components: {
    CSidebar: gu,
    ReAppSidebarNav: eS
  },
  props: {
    appNav: {
      type: Object,
      required: !0
    }
  },
  setup() {
    const e = _f();
    return {
      sidebarUnfoldable: j(() => e.state.sidebarUnfoldable),
      sidebarVisible: j(() => e.state.sidebarVisible)
    };
  }
};
function nS(e, t, n, a, i, r) {
  const o = X("ReAppSidebarNav"), s = X("CSidebar");
  return J(), Re(s, {
    "color-scheme": "light",
    class: "bg-white sidebar-below-header",
    position: "fixed",
    unfoldable: a.sidebarUnfoldable,
    visible: a.sidebarVisible,
    onVisibleChange: t[0] || (t[0] = (l) => e.$store.commit({
      type: "updateSidebarVisible",
      value: l
    }))
  }, {
    default: Q(() => [
      se(o, {
        class: "mt-3",
        "app-nav": n.appNav
      }, null, 8, ["app-nav"])
    ]),
    _: 1
  }, 8, ["unfoldable", "visible"]);
}
const aS = /* @__PURE__ */ Ot(tS, [["render", nS]]), iS = {
  name: "ReCardHeader",
  components: {
    CCardTitle: Ur,
    CCardSubtitle: Uc,
    CCardHeader: Yr
  },
  props: {
    id: { type: String, default: "ReCardHeader" },
    heading: { type: String, default: "ReCardHeader" },
    subHeading: { type: String, default: "" }
  }
};
function rS(e, t, n, a, i, r) {
  const o = X("CCardTitle"), s = X("CCardSubtitle"), l = X("CCardHeader");
  return J(), Re(l, null, {
    default: Q(() => [
      se(o, null, {
        default: Q(() => [
          Kn(Ue(n.heading), 1)
        ]),
        _: 1
      }),
      n.subHeading ? (J(), Re(s, { key: 0 }, {
        default: Q(() => [
          Kn(Ue(n.subHeading), 1)
        ]),
        _: 1
      })) : Nn("", !0)
    ]),
    _: 1
  });
}
const oS = /* @__PURE__ */ Ot(iS, [["render", rS]]), sS = {}, lS = {
  class: "red-logo",
  viewBox: "0 0 138 67",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, cS = /* @__PURE__ */ pf('<path d="M75.6172 7.39551V7.83569H76.3304V10.1524H76.8596V7.83569H77.5958V7.39551H75.6172Z" fill="white"></path><path d="M80.2173 10.1524V7.74302L79.4581 10.1524H79.205L78.4458 7.74302V10.1524H78.0547V7.39551H78.8139L79.3891 9.17938L79.9412 7.39551H80.7235V10.1524H80.2173Z" fill="white"></path><path d="M90.2504 47.7973C90.1123 47.7509 89.8362 47.7046 89.4221 47.7046C89.169 47.7046 88.962 47.7046 88.8009 47.7278C88.6399 47.7509 88.5018 47.7741 88.4098 47.7973C88.3178 47.8436 88.2488 47.8899 88.1797 47.9363C88.1337 47.9826 88.0877 48.0521 88.0877 48.1216C87.8116 49.0483 87.4895 49.9518 87.1674 50.8553C86.8454 51.7589 86.4772 52.6392 86.1091 53.5196C85.718 54.3999 85.3039 55.2571 84.8438 56.1143C84.3836 56.9715 83.8775 57.8055 83.3023 58.6395H83.2793L81.6688 48.1679C81.6688 48.0753 81.6458 47.9826 81.5998 47.9363C81.5768 47.8668 81.5078 47.8204 81.4388 47.7741C81.3697 47.7509 81.2547 47.7278 81.1167 47.7046C80.9786 47.6814 80.7716 47.6814 80.5415 47.6814C80.3114 47.6814 80.1274 47.6814 79.9893 47.7046C79.8283 47.7278 79.7132 47.7509 79.6212 47.7973C79.5292 47.8436 79.4602 47.8899 79.4372 47.9594C79.4141 48.0289 79.3911 48.1216 79.3911 48.2374C79.3911 48.3069 79.3911 48.3765 79.4141 48.4691C79.4141 48.5618 79.4372 48.6776 79.4602 48.7935L81.5078 61.3269L78.1488 65.7982C78.0567 65.9372 77.9877 66.053 77.9877 66.1457C77.9877 66.2384 78.0107 66.3079 78.1028 66.3774C78.1948 66.4237 78.3098 66.47 78.4709 66.4932C78.6319 66.5164 78.839 66.5395 79.0921 66.5395C79.3221 66.5395 79.5292 66.5164 79.6902 66.5164C79.8513 66.4932 80.0123 66.47 80.1274 66.4237C80.2424 66.3774 80.3574 66.331 80.4265 66.2847C80.5185 66.2384 80.5875 66.1689 80.6335 66.0762L84.1766 61.0489C85.0508 59.8211 85.81 58.6627 86.4542 57.5507C87.0984 56.4386 87.6506 55.3729 88.1107 54.3536C88.5939 53.3342 89.008 52.3612 89.3531 51.4114C89.7212 50.4847 90.0433 49.5811 90.3424 48.7008C90.3884 48.6081 90.4114 48.4923 90.4344 48.3996C90.4574 48.2838 90.4574 48.1911 90.4574 48.0753C90.4574 47.9363 90.3884 47.8668 90.2504 47.7973ZM74.0536 53.8671C73.8925 54.7011 73.6394 55.4656 73.2943 56.1606C72.9492 56.8557 72.5581 57.458 72.121 57.9677C71.6839 58.4774 71.2007 58.8944 70.6946 59.1724C70.1884 59.4504 69.6823 59.6125 69.1761 59.6125C68.831 59.6125 68.5319 59.543 68.3019 59.404C68.0488 59.265 67.8647 59.0797 67.7037 58.8249C67.5426 58.5932 67.4506 58.292 67.3816 57.9445C67.3126 57.597 67.2896 57.2263 67.2896 56.8093C67.2896 56.3923 67.3356 55.9058 67.3816 55.3729C67.4506 54.8401 67.5656 54.3073 67.7037 53.7744C67.8417 53.2416 68.0258 52.7087 68.2558 52.199C68.4859 51.6894 68.762 51.226 69.0611 50.8322C69.3602 50.4383 69.7283 50.114 70.1194 49.8823C70.5105 49.6506 70.9476 49.5348 71.4538 49.5348C72.075 49.5348 72.6271 49.697 73.1333 50.0213C73.6394 50.3457 74.0996 50.8322 74.5367 51.504L74.0536 53.8671ZM77.4126 48.1448C77.4126 48.0753 77.4126 48.0058 77.3895 47.9594C77.3665 47.8899 77.3205 47.8436 77.2515 47.8204C77.1825 47.7741 77.0905 47.7509 76.9524 47.7509C76.8374 47.7278 76.6763 47.7278 76.4923 47.7278C76.1242 47.7278 75.8481 47.7509 75.687 47.8204C75.503 47.8899 75.411 48.0058 75.365 48.1448L75.1119 49.4421C74.6517 48.8398 74.1456 48.3765 73.5474 48.0289C72.9722 47.6814 72.282 47.5193 71.4538 47.5193C70.6486 47.5193 69.9353 47.6814 69.2911 47.9826C68.647 48.3069 68.0948 48.724 67.6116 49.2336C67.1285 49.7433 66.7144 50.3457 66.3693 50.9943C66.0242 51.6662 65.7481 52.338 65.518 53.0331C65.288 53.7281 65.1499 54.4231 65.0349 55.1181C64.9429 55.8131 64.8738 56.4386 64.8738 56.9715C64.8738 57.6202 64.9429 58.2457 65.0579 58.8017C65.1959 59.3577 65.403 59.8674 65.6791 60.2612C65.9552 60.6782 66.3463 61.0026 66.8294 61.2343C67.3126 61.4659 67.8877 61.5818 68.5779 61.5818C69.1071 61.5818 69.6132 61.4891 70.1194 61.3038C70.6255 61.1184 71.0857 60.8867 71.4998 60.5856C71.9139 60.2844 72.282 59.9601 72.6041 59.5894C72.9262 59.2419 73.1563 58.8712 73.2943 58.5237C73.2023 58.8249 73.0643 59.2882 72.9032 59.8442C72.7422 60.4234 72.5811 61.1416 72.4431 61.9988C72.3511 62.4389 72.213 62.8328 72.029 63.1571C71.8449 63.4815 71.5918 63.7363 71.2927 63.968C70.9937 64.1765 70.6486 64.3387 70.2574 64.4313C69.8663 64.5472 69.4062 64.5935 68.923 64.5935C68.3249 64.5935 67.8187 64.5472 67.4276 64.4313C67.0135 64.3387 66.6914 64.2228 66.4153 64.0838C66.1392 63.968 65.9322 63.8521 65.7481 63.7595C65.587 63.6668 65.449 63.5973 65.334 63.5973C65.242 63.5973 65.1729 63.6205 65.1039 63.6668C65.0349 63.7131 64.9659 63.7826 64.9199 63.8753C64.8738 63.968 64.8278 64.0606 64.8048 64.1765C64.7818 64.2923 64.7358 64.4082 64.7128 64.5008C64.6898 64.6167 64.6668 64.7093 64.6668 64.8252C64.6668 64.9178 64.6668 65.0105 64.6668 65.0568C64.6668 65.1958 64.6898 65.3117 64.7358 65.4044C64.7818 65.497 64.8738 65.5897 65.0119 65.6824C65.38 65.8909 65.8861 66.0994 66.5073 66.2384C67.1285 66.4005 67.8187 66.47 68.5779 66.47C69.4522 66.47 70.2344 66.3774 70.9246 66.192C71.6148 66.0067 72.213 65.7055 72.7192 65.3348C73.2253 64.9642 73.6394 64.4777 73.9615 63.9217C74.2836 63.3425 74.5137 62.6938 74.6747 61.9293L77.4126 48.1448ZM64.9889 47.8899C64.9429 47.8436 64.8508 47.7741 64.7588 47.7509C64.6438 47.7046 64.5287 47.6814 64.3907 47.6351C64.2527 47.6119 64.1146 47.5656 63.9536 47.5424C63.7925 47.5193 63.6315 47.4961 63.4704 47.4961C63.1253 47.4961 62.7572 47.5888 62.3891 47.7278C62.021 47.8899 61.6529 48.0984 61.3308 48.3765C60.9857 48.6545 60.6866 48.9556 60.3875 49.3263C60.0884 49.697 59.8583 50.0677 59.6513 50.4615L60.1114 48.1216C60.1114 48.0521 60.1114 47.9826 60.0884 47.9363C60.0654 47.8668 60.0194 47.8204 59.9504 47.7973C59.8814 47.7509 59.7893 47.7278 59.6513 47.7278C59.5363 47.7046 59.3752 47.7046 59.1681 47.7046C58.9841 47.7046 58.823 47.7046 58.685 47.7278C58.547 47.7509 58.4319 47.7741 58.3399 47.7973C58.2479 47.8436 58.1789 47.8899 58.1328 47.9363C58.0868 47.9826 58.0638 48.0521 58.0408 48.1216L55.5791 60.9794C55.5561 61.0489 55.5561 61.1184 55.5791 61.1647C55.6021 61.2111 55.6481 61.2574 55.7401 61.3038C55.8092 61.3501 55.9242 61.3733 56.0622 61.3964C56.2003 61.4196 56.3843 61.4196 56.6144 61.4196C56.8445 61.4196 57.0285 61.4196 57.1666 61.3964C57.3276 61.3733 57.4426 61.3501 57.5347 61.3038C57.6267 61.2574 57.6957 61.2111 57.7417 61.1647C57.7877 61.1184 57.8107 61.0489 57.8338 60.9794L58.9151 55.2571C59.0761 54.4694 59.3062 53.7281 59.6283 53.0562C59.9504 52.3844 60.3185 51.8052 60.7096 51.2955C61.1007 50.809 61.5148 50.4152 61.906 50.1372C62.3201 49.8592 62.6652 49.7201 62.9873 49.7201C63.1713 49.7201 63.3324 49.7433 63.4704 49.7665C63.6085 49.7897 63.7235 49.836 63.8385 49.8823C63.9536 49.9287 64.0456 49.975 64.1376 49.9982C64.2296 50.0213 64.2987 50.0445 64.3677 50.0445C64.4367 50.0445 64.5057 49.9982 64.5747 49.9055C64.6438 49.8128 64.6898 49.7201 64.7358 49.5811C64.7818 49.4653 64.8278 49.3031 64.8738 49.1641C64.9199 49.002 64.9429 48.863 64.9659 48.724C64.9889 48.585 65.0119 48.446 65.0119 48.3533C65.0349 48.2374 65.0349 48.1679 65.0349 48.1216C65.0809 48.0521 65.0579 47.9594 64.9889 47.8899ZM52.013 51.8979C51.852 52.1759 51.5759 52.4307 51.1848 52.6392C50.7937 52.8477 50.2875 53.0099 49.6433 53.1489C48.9991 53.2647 48.1939 53.3342 47.2276 53.3342H45.8242C45.9852 52.8014 46.1923 52.2917 46.4454 51.8052C46.6985 51.3187 46.9975 50.9017 47.3426 50.5542C47.6877 50.1835 48.1019 49.9055 48.562 49.697C49.0221 49.4885 49.5513 49.3726 50.1495 49.3726C50.8167 49.3726 51.3458 49.5116 51.7139 49.8128C52.082 50.114 52.2661 50.5078 52.2661 50.9943C52.2431 51.3187 52.1511 51.6199 52.013 51.8979ZM54.3367 49.6275C54.1757 49.2336 53.9226 48.8861 53.6005 48.585C53.2554 48.2606 52.8183 48.0058 52.2891 47.8204C51.7599 47.6119 51.0928 47.5193 50.3335 47.5193C49.4363 47.5193 48.631 47.6583 47.9178 47.9594C47.2046 48.2606 46.5834 48.6545 46.0313 49.1178C45.4791 49.6043 45.019 50.1603 44.6278 50.809C44.2367 51.4577 43.9146 52.1064 43.6616 52.8014C43.4085 53.4964 43.2244 54.1914 43.1094 54.9096C42.9944 55.6278 42.9483 56.2765 42.9483 56.902C42.9483 57.7128 43.0404 58.3847 43.2474 58.987C43.4545 59.5662 43.7536 60.0759 44.1677 60.4697C44.5818 60.8636 45.088 61.1648 45.7092 61.3501C46.3303 61.5354 47.0436 61.6281 47.8488 61.6281C48.3089 61.6281 48.7691 61.6049 49.2292 61.5354C49.6893 61.4891 50.1035 61.3964 50.4946 61.3269C50.8857 61.2343 51.2078 61.1416 51.4839 61.0258C51.7599 60.9099 51.967 60.7941 52.059 60.6782C52.1281 60.5856 52.1971 60.4929 52.2661 60.3771C52.3351 60.2612 52.3811 60.1222 52.4041 59.9832C52.4502 59.8442 52.4732 59.7052 52.4962 59.5662C52.5192 59.4272 52.5192 59.3114 52.5192 59.2187C52.5192 59.1029 52.4962 59.0102 52.4502 58.9639C52.4041 58.8944 52.3581 58.8712 52.2661 58.8712C52.1741 58.8712 52.036 58.9175 51.806 59.0102C51.5759 59.1029 51.2998 59.1955 50.9547 59.3114C50.6096 59.4272 50.2185 59.5199 49.7354 59.6125C49.2752 59.7052 48.7461 59.7516 48.1479 59.7516C47.1356 59.7516 46.3994 59.4967 45.9392 58.987C45.4791 58.4774 45.249 57.7592 45.249 56.8093C45.249 56.5545 45.272 56.2765 45.272 55.9753C45.295 55.6741 45.341 55.3729 45.4101 55.0718H46.8595C48.2169 55.0718 49.3672 54.9791 50.3335 54.7706C51.2998 54.5621 52.1051 54.2841 52.7262 53.9134C53.3474 53.5427 53.8076 53.1026 54.1066 52.5697C54.4057 52.0369 54.5438 51.4577 54.5438 50.809C54.5668 50.392 54.4748 50.0213 54.3367 49.6275ZM40.7627 49.697C40.6477 49.28 40.4636 48.9093 40.2105 48.585C39.9575 48.2606 39.6124 48.0058 39.1982 47.8204C38.7841 47.6351 38.278 47.5193 37.6568 47.5193C37.1046 47.5193 36.5524 47.6119 36.0463 47.8204C35.5171 48.0289 35.057 48.2606 34.6199 48.585C34.1827 48.8861 33.8146 49.2105 33.5155 49.5811C33.1934 49.9518 32.9864 50.2762 32.8483 50.6005L33.3085 48.1448C33.3085 48.0753 33.3085 48.0058 33.2855 47.9594C33.2625 47.8899 33.2165 47.8436 33.1474 47.8204C33.0784 47.7741 32.9864 47.7509 32.8483 47.7509C32.7333 47.7278 32.5723 47.7278 32.3652 47.7278C32.1811 47.7278 32.0201 47.7278 31.8821 47.7509C31.744 47.7741 31.652 47.7973 31.56 47.8204C31.4679 47.8668 31.3989 47.9131 31.3759 47.9594C31.3299 48.0058 31.3069 48.0753 31.3069 48.1448L28.8222 61.0026C28.7991 61.0721 28.7991 61.1416 28.8222 61.1879C28.8452 61.2343 28.8912 61.2806 28.9832 61.3269C29.0522 61.3733 29.1673 61.3964 29.3053 61.4196C29.4433 61.4428 29.6274 61.4428 29.8575 61.4428C30.0875 61.4428 30.2716 61.4428 30.4096 61.4196C30.5707 61.3964 30.6857 61.3733 30.7777 61.3269C30.8698 61.2806 30.9388 61.2343 30.9848 61.1879C31.0308 61.1416 31.0538 61.0721 31.0768 61.0026L32.1811 55.2571C32.3422 54.4463 32.5953 53.6817 32.9404 52.9867C33.2855 52.2917 33.6766 51.6894 34.1137 51.1797C34.5508 50.67 35.011 50.2762 35.5171 49.975C36.0233 49.697 36.5294 49.5348 37.0126 49.5348C37.5647 49.5348 37.9789 49.7201 38.2089 50.0677C38.439 50.4152 38.554 50.9017 38.554 51.4809C38.554 51.6894 38.531 51.921 38.531 52.199C38.508 52.477 38.462 52.7551 38.393 53.0562L36.8745 60.9794C36.8745 61.0489 36.8745 61.1184 36.8975 61.1647C36.9206 61.2111 36.9666 61.2574 37.0586 61.3038C37.1276 61.3501 37.2426 61.3733 37.3807 61.3964C37.5187 61.4196 37.7028 61.4196 37.9329 61.4196C38.1629 61.4196 38.347 61.4196 38.485 61.3964C38.6231 61.3733 38.7611 61.3501 38.8531 61.3038C38.9452 61.2574 39.0142 61.2111 39.0602 61.1647C39.1062 61.1184 39.1292 61.0489 39.1522 60.9794L40.7167 52.9636C40.7857 52.616 40.8317 52.2917 40.8777 51.9674C40.9237 51.643 40.9237 51.3187 40.9237 50.9712C40.9237 50.531 40.8777 50.114 40.7627 49.697ZM25.2561 51.8979C25.095 52.1759 24.819 52.4307 24.4278 52.6392C24.0367 52.8477 23.5306 53.0099 22.8864 53.1489C22.2422 53.2647 21.437 53.3342 20.4707 53.3342H19.0673C19.2283 52.8014 19.4354 52.2917 19.6884 51.8052C19.9415 51.3187 20.2406 50.9017 20.5857 50.5542C20.9308 50.1835 21.3449 49.9055 21.8051 49.697C22.2652 49.4885 22.7944 49.3726 23.3925 49.3726C24.0597 49.3726 24.5889 49.5116 24.957 49.8128C25.3251 50.114 25.5092 50.5078 25.5092 50.9943C25.4862 51.3187 25.4171 51.6199 25.2561 51.8979ZM27.5798 49.6275C27.4187 49.2336 27.1657 48.8861 26.8436 48.585C26.4985 48.2606 26.0613 48.0058 25.5322 47.8204C25.003 47.6119 24.3358 47.5193 23.5766 47.5193C22.6793 47.5193 21.8741 47.6583 21.1609 47.9594C20.4477 48.2606 19.8265 48.6545 19.2743 49.1178C18.7222 49.6043 18.262 50.1603 17.8709 50.809C17.4798 51.4577 17.1577 52.1064 16.9046 52.8014C16.6515 53.4964 16.4675 54.1914 16.3525 54.9096C16.2374 55.6278 16.1914 56.2765 16.1914 56.902C16.1914 57.7128 16.2834 58.3847 16.4905 58.987C16.6976 59.5662 16.9966 60.0759 17.4108 60.4697C17.8249 60.8636 18.331 61.1648 18.9522 61.3501C19.5734 61.5354 20.2866 61.6281 21.0919 61.6281C21.552 61.6281 22.0121 61.6049 22.4723 61.5354C22.9324 61.4891 23.3465 61.3964 23.7376 61.3269C24.1288 61.2343 24.4509 61.1416 24.7269 61.0258C25.003 60.9099 25.2101 60.7941 25.3021 60.6782C25.3711 60.5856 25.4401 60.4929 25.5092 60.3771C25.5782 60.2612 25.6242 60.1222 25.6472 59.9832C25.6932 59.8442 25.7162 59.7052 25.7392 59.5662C25.7622 59.4272 25.7622 59.3114 25.7622 59.2187C25.7622 59.1029 25.7392 59.0102 25.6932 58.9639C25.6472 58.8944 25.6012 58.8712 25.5092 58.8712C25.4171 58.8712 25.2791 58.9175 25.049 59.0102C24.819 59.1029 24.5429 59.1955 24.1978 59.3114C23.8527 59.4272 23.4616 59.5199 22.9784 59.6125C22.5183 59.7052 21.9891 59.7516 21.3909 59.7516C20.3786 59.7516 19.6424 59.4967 19.1823 58.987C18.7222 58.4774 18.4921 57.7592 18.4921 56.8093C18.4921 56.5545 18.5151 56.2765 18.5151 55.9753C18.5381 55.6741 18.5841 55.3729 18.6531 55.0718H20.1026C21.46 55.0718 22.6103 54.9791 23.5766 54.7706C24.5429 54.5621 25.3481 54.2841 25.9693 53.9134C26.5905 53.5427 27.0506 53.1026 27.3497 52.5697C27.6488 52.0369 27.7868 51.4577 27.7868 50.809C27.8099 50.392 27.7408 50.0213 27.5798 49.6275Z" fill="white"></path><path d="M16.053 13.6931C16.053 13.6931 15.2937 13.6931 14.7646 14.1796C14.2584 14.6429 13.3612 16.4732 13.3612 16.4732C13.3612 16.4732 13.4072 15.5233 13.3612 15.199C13.3151 14.8978 13.2231 14.0638 12.786 13.8553C12.5099 13.7163 11.9347 13.6699 11.5666 13.6699H6.13702L0.0402066 39.7562C-0.166855 41.0304 0.477337 41.4011 0.799433 41.4011H1.39761H1.94977H7.0803C7.0803 41.4011 11.7047 22.0101 11.8427 21.2919C12.0038 20.5737 12.5099 19.9714 12.832 19.7861C13.3151 19.4154 14.0284 19.2301 14.9716 19.2301H20.6773C20.6773 19.2301 21.4596 19.2532 22.0807 18.535C22.3568 18.1875 22.4489 18.0022 22.6789 17.284L23.6222 13.6699H16.053V13.6931Z" fill="white"></path><path d="M61.1919 34.6344C59.6735 35.5379 57.1657 35.4452 57.1657 35.4452C56.0844 35.4452 55.1412 35.2367 54.3359 34.8429C51.5521 33.2675 52.9555 29.5376 53.5307 27.9391L55.2792 23.4215C55.9694 21.9388 56.6366 20.9889 57.2808 20.5487C57.925 20.1085 58.6842 19.8769 59.5355 19.8769H60.3177H61.0539H65.4252L61.1919 34.6344ZM74.2828 7.52875C73.9377 7.20441 73.5466 7.04224 73.1095 7.04224H68.6001L66.8516 14.2241H58.4771C58.4771 14.2241 55.0491 13.9692 52.4954 15.6836C51.184 16.564 49.6425 19.0429 48.009 23.4446C46.3756 27.8232 45.5703 31.5763 45.5703 34.6807C45.5703 35.8159 45.6393 36.8584 46.1225 38.3411C47.4339 41.3297 50.5628 41.4455 51.207 41.4455H56.2685C57.6489 41.4455 58.4771 40.2872 58.4771 40.2872L60.8008 36.6963L59.9956 39.7775C59.8575 40.3799 60.2257 41.0054 60.4327 41.1907C60.6398 41.376 60.8698 41.4687 61.1689 41.4687H62.5033H66.4835L74.858 8.94195C74.812 8.31643 74.6279 7.85309 74.2828 7.52875Z" fill="white"></path><path d="M44.695 16.7315C43.9818 15.2256 43.1995 14.7622 42.5784 14.5074C41.9342 14.2294 39.4494 13.7197 34.9171 13.7197C30.3847 13.7197 28.2681 14.0441 26.4966 15.0171C24.7711 15.9669 23.7358 17.7277 22.2633 21.7124C20.7909 25.6972 20.0547 29.6124 20.0547 33.4582L20.1927 35.6591L20.5378 37.5125C20.975 38.7635 21.5041 39.6207 22.1253 40.1535C22.7465 40.6864 23.4597 41.0107 24.2649 41.196C25.0702 41.3582 25.9904 41.4509 27.0948 41.4509H37.5399C39.4954 41.4509 40.3007 39.5048 40.3697 39.2963L41.405 35.0799H30.2007C27.3478 35.0799 26.8877 34.13 27.0258 33.018C27.1638 31.8828 27.693 28.4772 27.693 28.4772H41.8882C43.2916 28.4772 43.6827 28.2456 43.9818 27.5737C44.4189 26.4617 45.0631 20.5772 45.0631 20.5772C45.1781 19.3725 45.3392 18.1215 44.695 16.7315ZM38.5062 24.006H28.7283C29.6945 19.6737 32.5704 18.7933 33.1916 18.6543C33.9048 18.4922 36.1365 18.1447 37.6549 19.2104C39.6105 20.5772 38.5062 24.006 38.5062 24.006Z" fill="white"></path><path d="M137.51 40.2195C137.51 40.2195 137.487 40.1964 137.464 40.1269C137.418 40.0574 137.349 39.9647 137.234 39.8257C137.027 39.5709 136.705 39.2234 136.199 38.8758C135.209 38.1345 133.622 37.37 130.999 36.9993L130.907 36.9761C130.769 36.953 130.7 36.7676 130.723 36.6286C130.746 36.4896 130.884 36.3738 131.022 36.3969C131.252 36.1653 131.804 36.5128 132.149 36.5823C136.636 37.509 137.947 39.8952 137.97 39.9415C138.039 40.0805 137.993 40.2427 137.855 40.3122C137.809 40.3354 137.763 40.3354 137.74 40.3354C137.671 40.3585 137.579 40.3122 137.51 40.2195Z" fill="white"></path><path d="M106.863 50.2982C106.656 40.4753 103.458 31.2316 101.916 21.6172C101.87 21.2697 101.318 21.2697 101.295 21.6403C100.398 32.8301 101.456 44.6454 106.265 54.9085C106.403 55.1865 106.84 55.117 106.863 54.7926C107.369 45.5952 103.941 37.0234 102.146 28.1503C102.008 27.409 100.605 19.9491 101.456 24.3972C101.87 26.6445 102.077 28.9148 102.261 31.1852C102.768 36.9539 102.561 42.792 102.261 48.5606C102.238 48.9313 102.745 49.0472 102.883 48.6996C106.311 40.1278 114.869 35.8187 122.047 30.8841C122.3 30.6987 122.07 30.2585 121.771 30.328C112.73 32.2973 104.056 35.5175 95.0603 37.6952C94.8072 37.7647 89.3086 39.4791 92.6676 38.4134C94.7152 37.7647 96.8088 37.3477 98.9025 36.977C103.527 36.1198 108.289 35.9808 112.983 36.3979C113.328 36.421 109.969 37.9269 109.923 37.9501C107.438 38.9231 104.746 39.4096 102.146 39.8729C100.03 40.2436 97.8902 40.429 95.7505 40.6375C94.8533 40.7301 90.8041 41.8421 93.3808 40.7765C100.237 37.9269 108.473 34.058 115.951 36.5137C121.449 38.2976 112.016 42.653 110.36 43.0005C106.012 43.9272 100.858 42.792 98.6034 38.6451C95.5665 33.0618 100.881 28.521 105.022 25.9494C109.094 23.4242 102.837 36.8612 102.215 37.9501C101.939 38.4366 101.663 38.9231 101.387 39.4096C100.237 40.3594 100.145 40.9155 101.157 41.0545C102.008 39.4328 102.745 37.7647 103.481 36.1199C105.62 31.3706 107.53 26.575 110.268 22.1269C109.463 23.4474 109.164 25.8799 108.657 27.3626C107.898 29.5867 106.932 31.7412 105.989 33.8726C104.079 38.2049 102.008 42.4445 100.237 46.8463C100.099 47.1938 100.582 47.4023 100.789 47.1474C104.424 42.8615 107.254 38.0196 110.544 33.4788C111.326 32.3899 116.641 25.4861 114.915 29.4014C113.443 32.7143 111.142 35.6565 108.887 38.4134C104.884 43.3712 100.168 47.7035 95.8656 52.3832C99.2936 48.6765 102.376 42.5603 106.403 38.4134C108.519 36.2357 110.958 34.4055 113.535 32.8301C113.627 32.7838 116.894 31.1621 116.779 31.6254C116.342 33.4093 114.777 35.031 113.535 36.2357C111.119 38.6219 107.852 40.1509 104.677 41.124C104.631 41.1471 100.95 41.819 101.318 41.1703C102.123 39.7339 103.481 38.6682 104.838 37.8111C112.361 32.9691 123.911 36.1198 132.124 37.2087C132.492 37.255 132.584 36.7222 132.262 36.5832C120.023 31.0926 104.861 24.6521 91.1952 28.0808C90.9651 28.1272 90.8501 28.4052 91.0111 28.6137C97.9592 37.0465 111.211 38.1817 121.357 38.2512C121.702 38.2512 121.863 37.7416 121.495 37.6257C111.487 34.7067 101.111 32.7143 90.712 34.2433C90.3439 34.2896 90.3899 34.8225 90.735 34.8688C99.4086 35.9808 108.45 36.6295 116.986 34.3128C117.285 34.2433 117.354 33.8031 117.032 33.6873C111.602 31.8108 106.725 33.502 101.755 35.9345C100.26 36.6527 98.8104 37.4867 97.338 38.2744C96.0726 38.9463 93.3118 41.4946 94.2091 37.6257C95.1293 33.6873 96.6018 29.8415 98.0512 26.0653C99.2706 22.8682 100.605 19.7175 101.847 16.5204C101.939 16.2887 102.561 20.2271 102.561 20.343C102.86 23.3547 102.791 26.4128 102.745 29.4245C102.653 36.8844 102.353 44.1589 104.286 51.4334C104.355 51.665 104.7 51.8272 104.861 51.5492C111.05 40.8691 110.659 27.4553 111.234 15.501C111.303 14.0647 111.395 12.6051 111.487 11.1688C111.51 10.9603 111.211 7.184 111.257 8.89837C111.372 13.2538 111.257 17.6092 111.188 21.9415C111.05 30.328 111.234 38.6451 112.707 46.9389C112.776 47.2633 113.19 47.2864 113.328 46.9853C115.513 41.9117 116.411 36.6064 116.986 31.1389C117.285 28.382 117.469 25.6251 117.722 22.8682C117.86 21.2465 118.067 19.648 118.274 18.0494C118.665 15.0145 118.205 17.1227 118.182 18.4433C118.159 25.1618 116.963 31.8571 115.697 38.4366C115.122 41.402 114.455 44.3674 113.834 47.3328C113.719 47.912 113.581 48.4911 113.466 49.0703C112.592 50.4372 112.661 50.9932 113.627 50.7384C113.903 48.9313 114.064 47.1243 114.271 45.2941C114.593 42.2592 114.892 39.2243 115.26 36.2125C115.651 33.0386 117.584 28.6137 117.331 25.6714C117.63 29.2392 117.653 32.8301 117.676 36.421C117.722 41.3788 113.052 37.9269 110.337 36.7454C99.0865 31.8107 88.4344 25.7409 76.0567 24.1656C75.7116 24.1192 75.5735 24.6984 75.9186 24.7911C88.3653 27.9187 101.134 29.2392 113.834 30.8609C116.986 31.2779 120.115 31.7181 123.267 32.2278C123.152 32.2046 127.569 32.7143 126.856 32.7838C124.256 33.0386 121.633 32.9923 119.033 32.9691C112.407 32.8996 105.828 32.3204 99.2016 32.5984C98.8334 32.6216 98.8795 33.1776 99.2246 33.2239C106.84 34.2896 114.386 35.7492 121.978 36.8844C124.21 37.2319 119.264 36.7454 118.688 36.7454C117.308 36.7454 115.905 36.6527 114.524 36.56C111.648 36.3747 108.749 36.0272 105.897 35.7492C95.6585 34.7066 84.6842 33.9885 76.3328 41.1008C76.1027 41.3093 76.2868 41.7495 76.5858 41.6568C95.9346 36.6295 114.57 27.3858 130.077 14.667C130.399 14.4122 129.985 13.9257 129.663 14.1805C125.383 17.4934 121.403 21.1307 117.377 24.7447C116.503 25.5324 115.605 26.2969 114.708 27.0615C113.443 28.1503 116.181 25.7873 116.296 25.6251C118.205 23.3547 120.253 21.2465 122.392 19.2078C124.532 17.1691 126.879 15.4084 129.387 13.9025C131.25 12.7905 136.058 10.3347 132.4 14.0647C129.202 17.3081 126.212 20.7368 123.313 24.2582C121.219 26.8066 119.217 29.4014 117.101 31.9266C116.48 32.6448 115.858 33.3629 115.214 34.058C115.928 33.2934 117.469 32.4363 118.343 31.7644C119.908 30.5597 121.633 29.5404 123.267 28.4515C123.75 28.1272 124.233 27.7797 124.67 27.409C123.727 28.1272 122.807 29.9805 122.001 30.9304C121.426 31.5559 120.897 32.2046 120.414 32.8996C120.782 32.4131 120.552 29.3782 120.621 28.7063C121.173 22.7524 123.06 17.0764 123.244 11.0529C123.267 10.6822 122.784 10.5896 122.623 10.9139C118.619 19.37 116.825 28.6368 114.8 37.7184C113.305 44.3905 114.524 38.4366 114.616 36.5137C114.754 33.2239 114.915 29.911 115.053 26.6213C115.306 20.6905 115.582 14.7365 115.835 8.8057C115.858 8.38869 115.214 8.31919 115.191 8.7362C114.731 17.6556 113.949 26.5518 112.753 35.4017C112.43 37.8342 112.914 37.9732 113.075 35.4712C113.213 33.0618 113.351 30.6292 113.466 28.2198C113.719 23.2389 113.834 18.2579 113.857 13.277C113.857 12.9295 113.374 12.7673 113.236 13.138C110.153 22.0574 109.002 31.3937 107.415 40.6606C106.656 45.0624 107.806 39.5023 107.875 38.3902C108.059 35.7955 108.151 33.2008 108.266 30.6061C108.519 24.6521 108.634 18.6749 108.887 12.721C108.91 12.304 108.289 12.2576 108.243 12.6515C107.714 17.8409 107.185 23.0304 106.656 28.2198C106.38 30.8377 106.127 33.4324 105.874 36.0503C105.758 37.3014 105.943 42.8847 105.874 38.1122C105.712 28.4515 104.746 18.8371 103.435 9.26905C103.389 8.92154 102.814 8.92154 102.814 9.29221C102.768 18.1189 102.4 26.9225 102.814 35.726C102.837 36.0967 103.435 36.0503 103.435 35.7028C103.803 29.4245 102.929 23.3084 101.962 17.1227C101.916 16.7521 101.364 16.7984 101.341 17.1459C100.513 24.5594 101.295 31.8339 102.814 39.1084C102.906 39.5254 103.481 39.4096 103.435 38.9926C102.123 27.8723 97.5911 17.1227 92.0464 7.50834C91.8624 7.20716 91.3792 7.323 91.4483 7.69368C92.6446 13.8098 95.5205 19.1151 99.1325 24.0961C100.099 25.4166 101.157 26.6676 102.192 27.9187C102.975 28.8453 106.127 31.1389 102.837 29.7489C100.49 28.7527 98.6264 28.0577 96.1416 28.6137C95.8886 28.66 95.8196 28.938 95.9576 29.1465C98.6494 33.0618 102.837 34.2896 107.231 35.4712C108.611 35.8418 112.085 36.0503 107.461 36.143C105.62 36.1893 103.757 35.865 101.939 35.6333C101.272 35.5407 105.828 35.1005 105.344 35.1468C108.197 34.8225 111.073 34.892 113.926 34.8688C114.34 34.8688 114.386 34.3128 113.995 34.2201C110.245 33.3861 106.472 32.8764 102.676 32.3204C100.145 31.9729 97.6831 31.4632 95.2214 30.8609C92.2535 30.1195 99.1325 28.382 98.2583 28.66C101.502 27.6638 105.045 27.687 108.404 27.7565C109.808 27.7797 111.234 27.8955 112.638 28.0113C114.133 28.1272 110.475 31.6717 110.061 31.9961C105.805 35.4712 99.8227 37.0002 94.6232 38.3207C92.2765 38.9231 89.9298 39.3864 87.5601 39.8498C86.5248 40.0583 85.4895 40.2436 84.4542 40.4521C82.8207 40.7533 82.2455 41.263 83.6489 39.5718C91.6093 29.8415 103.573 22.289 115.214 17.9336C118.734 16.6362 121.403 15.4315 118.688 19.926C117.193 22.4049 114.984 24.4436 112.822 26.3201C108.082 30.467 102.4 33.5251 96.8088 36.3747C94.7382 37.4404 92.6216 38.4366 90.528 39.4328C90.3209 39.5254 92.1615 35.6565 92.7366 34.753C95.7275 30.0037 99.7307 25.8568 103.872 22.15C105.782 20.4356 107.829 18.9066 109.992 17.5861C110.958 17.0069 114.961 14.5743 114.041 16.8216C111.142 23.8644 105.229 29.6099 100.398 35.3322C101.709 33.78 103.665 30.8609 105.298 28.8453C105.689 28.3588 114.11 20.3893 114.156 22.6134C114.248 26.3896 112.684 30.1427 111.142 33.502C110.268 35.4712 109.14 37.3477 108.059 39.2011C109.279 37.1392 109.279 33.8263 109.877 31.4864C111.809 23.9802 114.524 16.6826 117.446 9.52389C118.366 7.27667 118.113 14.25 118.067 13.0685C118.113 14.5975 118.021 16.1034 117.929 17.6324C117.676 21.7562 116.871 25.8336 115.858 29.8184C115.513 31.1621 115.053 32.4826 114.593 33.8031C115.099 32.3204 114.271 27.6638 114.225 26.3665C114.087 21.4318 114.317 16.4972 114.639 11.5626C114.731 10.3347 114.823 9.10688 114.915 7.87902C115.628 6.44265 115.536 5.86347 114.662 6.14147C114.731 8.71303 114.639 11.2846 114.547 13.8562C114.34 19.0688 113.788 24.2582 113.213 29.4477C112.638 34.614 111.97 39.7803 111.372 44.9466C111.763 41.402 111.579 35.9345 111.579 31.6022C111.556 21.177 111.786 10.7749 111.809 0.349671C111.809 -0.0673393 111.165 -0.136842 111.165 0.280168C111.142 12.3966 110.705 24.5131 109.394 36.56C110.567 25.7178 110.176 12.86 109.325 1.36903C109.302 0.975184 108.749 1.06785 108.703 1.3922C105.943 16.3119 101.663 32.2509 104.263 47.4718C104.309 47.7498 104.677 47.8193 104.838 47.5876C108.519 42.7688 111.993 37.7879 114.754 32.3668C114.823 32.2278 114.731 31.9961 114.57 31.9498C105.597 29.8415 96.4407 31.2547 87.33 31.3706C86.9159 31.3706 86.8699 32.0193 87.284 32.0193H113.696C116.503 32.0193 115.882 31.3937 113.512 31.4632C111.51 31.5327 109.509 31.6486 107.507 31.7644C105.989 31.8571 93.1738 33.4093 94.025 30.1195C94.1401 29.7257 93.5419 29.494 93.4268 29.8879C92.7827 32.2973 93.0817 32.5289 95.6585 32.6679C102.883 33.0618 110.176 32.0888 117.377 31.9961C117.791 31.9961 117.86 31.3474 117.446 31.3474H98.8104H89.2626C88.7104 32.3436 89.2396 32.5289 90.8731 31.9034C92.1155 31.8571 93.3808 31.7876 94.6232 31.7181C98.2813 31.5327 101.962 31.3474 105.62 31.3937C108.565 31.4401 114.593 31.6022 111.878 36.2589C110.452 38.6914 108.841 41.0081 107.208 43.3017C107.185 43.348 104.769 46.6841 104.654 46.0122C104.424 44.6222 104.332 43.2322 104.24 41.8421C103.458 30.2817 106.104 18.3969 108.266 7.1145C108.657 5.02945 108.657 0.41917 108.979 5.35379C109.21 9.22271 109.279 13.0916 109.325 16.9606C109.394 24.0961 109.233 31.2547 109.21 38.3902C109.21 38.8072 109.808 38.8767 109.854 38.4597C110.59 32.1814 111.073 25.9031 111.395 19.6016C111.556 16.4045 111.648 13.1843 111.717 9.98723C111.763 8.06435 111.786 6.1183 111.809 4.19543C111.832 1.64703 111.188 1.43853 111.188 4.19543C111.142 18.3969 110.774 32.6216 111.188 46.8231C111.211 47.2169 111.786 47.3096 111.832 46.8926C113.374 32.7143 115.651 18.5823 115.283 4.26493C115.283 3.87109 114.685 3.77842 114.662 4.19543C113.696 14.4817 113.213 24.8374 114.179 35.1237C114.202 35.448 114.685 35.4712 114.8 35.17C118.113 26.5981 119.747 16.6594 118.274 7.53151C118.228 7.20717 117.791 7.184 117.653 7.48517C113.213 18.2348 109.394 29.1929 107.254 40.6606C107.185 40.985 107.668 41.1471 107.829 40.8691C111.51 34.7993 114.984 28.382 114.8 21.0843C114.8 20.8527 114.593 20.6441 114.34 20.76C107.668 24.1887 102.929 30.0269 99.4086 36.56C99.2016 36.9307 99.6617 37.255 99.9378 36.9307C105.505 30.1427 111.878 23.8181 115.283 15.5474C115.375 15.2925 115.145 15.1072 114.938 15.1304C109.509 15.4779 104.447 20.621 100.789 24.1656C96.3257 28.4747 91.3102 33.8958 89.5157 40.0351C89.4467 40.2899 89.6767 40.568 89.9528 40.4289C100.996 35.1468 116.779 28.7758 121.219 16.1265C121.288 15.8949 121.104 15.64 120.874 15.7095C106.15 18.6981 90.7811 29.1929 81.6473 41.0776C81.4863 41.3093 81.6934 41.6336 81.9694 41.5641C92.0004 39.5949 109.025 38.3671 114.317 27.8955C114.409 27.7101 114.248 27.4785 114.041 27.4553C107.024 26.853 99.3166 26.3201 93.1278 30.2817C92.9207 30.4207 92.8517 30.7914 93.1508 30.8609C98.7414 32.5289 104.47 33.1081 110.199 34.0348C114.8 34.7762 110.245 34.1738 108.795 34.2433C105.851 34.3823 102.998 34.6835 100.122 35.309C99.7537 35.3785 99.7997 35.8882 100.145 35.9345C103.826 36.5137 107.392 36.8844 111.096 36.4905C111.418 36.4442 111.441 35.9577 111.142 35.865C108.22 34.9383 105.252 34.2896 102.376 33.2471C100.996 32.7374 93.5649 27.7565 99.9608 29.2392C101.847 29.6794 103.688 30.7451 105.482 31.4169C105.782 31.5327 106.058 31.1389 105.828 30.9072C102.1 26.9688 98.7644 22.7987 96.0036 18.0958C94.3471 15.2694 93.1968 12.2345 92.3685 9.08371C92.5986 9.96406 94.2551 12.8368 94.9913 14.3658C97.6831 19.8101 99.7997 25.5556 101.387 31.4169C101.663 32.4363 101.893 33.4788 102.1 34.5213C102.123 34.614 103.32 38.4597 103.044 37.1855C102.423 34.197 102.031 31.1852 101.732 28.1735C101.456 25.3239 101.985 21.5245 101.594 18.9761C102.077 22.0573 102.492 25.1386 102.768 28.2198C102.906 30.05 102.952 31.8571 102.883 33.6873C102.906 31.7876 103.228 29.8647 103.205 27.9187C103.182 24.7679 103.251 21.594 103.297 18.4433C103.343 16.1265 103.251 12.6978 103.044 11.1456C103.481 14.3195 103.826 17.5166 104.148 20.6905C104.861 27.6638 105.206 34.6835 105.252 41.7031C105.252 42.097 105.851 42.1897 105.897 41.7727C106.357 37.2319 106.817 32.7143 107.277 28.1735C107.553 25.5556 107.806 22.9377 108.082 20.343C108.22 19.0456 108.335 17.7482 108.473 16.4509C109.256 14.9682 109.164 14.3195 108.151 14.5512C107.714 24.3741 107.645 34.1738 106.748 43.9735C106.702 44.3905 107.3 44.4369 107.392 44.043C109.14 34.8456 110.153 25.5324 112.73 16.5204C113.489 13.8562 113.167 14.9913 113.144 16.9606C113.121 19.4395 113.029 21.9415 112.937 24.4204C112.753 29.2624 112.453 34.1043 112.177 38.9462C112.154 39.3633 112.753 39.4096 112.799 39.0158C113.558 34.058 114.156 29.077 114.662 24.0729C114.915 21.5013 115.122 18.9298 115.306 16.3814C115.398 15.1072 115.49 13.8098 115.559 12.5356C116.273 11.0298 116.112 10.4042 115.053 10.6359C114.593 21.2002 114.133 31.7644 113.65 42.3055C113.627 42.653 114.179 42.8152 114.271 42.4445C116.342 33.8495 117.906 25.1386 120.759 16.7752C121.058 15.918 122.484 12.582 122.484 12.6978C122.415 15.0609 121.909 17.4471 121.472 19.7638C120.575 24.4899 119.586 29.0539 119.724 33.8958C119.724 34.1738 120.115 34.4286 120.299 34.1043C121.794 31.4864 124.187 29.6794 125.13 26.7371C125.222 26.436 124.877 26.1579 124.624 26.3896C121.472 29.3782 116.434 30.7682 114.363 34.7993C114.225 35.0773 114.662 35.3785 114.869 35.1468C122.024 27.6175 128.006 19.1151 135.414 11.7248C135.644 11.4931 135.483 11.1224 135.161 11.1688C125.866 12.3735 118.78 21.2465 113.236 28.1272C113.006 28.4052 113.42 28.7758 113.696 28.5442C117.791 25.1154 121.656 21.455 125.705 17.9799C128.512 15.5705 129.41 14.25 125.751 17.0764C123.106 19.1151 120.345 20.9685 117.561 22.7755C108.473 28.66 98.6264 33.363 88.5034 37.1392C85.9956 38.0659 83.4419 38.8767 80.8881 39.6644C76.4478 41.0081 77.8512 40.1741 81.0952 38.3902C85.8576 35.7723 91.7243 35.5175 97.0159 35.6333C106.012 35.8187 114.892 37.9037 123.888 37.0697C124.256 37.0465 124.21 36.4905 123.865 36.4442C120.046 35.9113 116.25 35.2858 112.453 34.6371C110.567 34.3128 108.68 33.9885 106.817 33.6641C105.666 33.4788 98.0512 33.1081 103.067 33.0386C111.671 32.8996 120.23 33.9653 128.834 33.1544C129.225 33.1081 129.133 32.5753 128.811 32.5289C111.924 29.355 94.6692 28.5442 77.8972 24.6057C90.7811 27.6406 104.424 35.5638 117.791 40.4521C117.975 40.5216 118.228 40.3826 118.228 40.1741C118.228 34.7067 118.205 29.2624 117.722 23.8181C117.699 23.4937 117.193 23.4705 117.101 23.7717C114.225 33.0849 114.041 42.8615 112.638 52.4527C112.569 52.8697 113.19 52.8929 113.282 52.5222C115.905 40.1278 119.033 27.7101 118.711 14.945C118.711 14.528 118.159 14.4817 118.067 14.8755C117.193 19.6711 116.871 24.5362 116.434 29.4014C116.181 32.1583 115.835 34.9152 115.398 37.6257C115.122 39.2011 114.754 40.7533 114.317 42.2823C114.34 42.1665 113.259 46.7768 112.914 44.8307C110.705 32.3899 112.154 19.6248 111.786 7.06816C111.763 6.67432 111.188 6.58165 111.142 6.99866C109.9 19.2773 110.705 31.8571 107.392 43.8809C106.955 45.4794 104.953 52.2906 104.01 47.7266C103.136 43.5565 103.182 39.2243 103.228 35.0078C103.274 28.2198 103.619 21.5477 102.376 14.8523C102.33 14.528 101.87 14.5048 101.755 14.806C98.4883 23.3315 94.6232 31.6717 92.8517 40.6838C92.8057 40.9386 93.1047 41.1008 93.3118 41.0081C96.7628 39.3633 100.053 37.4635 103.481 35.7955C105.851 34.6371 108.335 33.8726 110.935 33.4788C112.522 33.1776 113.995 33.3629 115.398 34.0811C114.409 34.3128 113.397 34.5213 112.384 34.6835C107.438 35.5407 102.307 35.309 97.338 34.9615C95.8656 34.8688 93.4038 34.4981 92.4375 34.6603C95.2444 34.2433 98.0972 34.3128 100.927 34.4055C105.022 34.5676 109.094 35.2858 113.098 36.143C115.444 36.6295 117.952 37.6257 120.299 37.6257C118.734 37.6257 117.17 37.533 115.628 37.4172C108.059 36.9075 99.9378 35.3553 93.7719 30.6292C89.2166 27.131 98.4883 27.8028 100.605 27.8955C105.16 28.0808 109.67 29.1697 114.041 30.3744C117.998 31.4632 121.863 32.9228 125.682 34.4055C127.431 35.1005 129.156 35.8418 130.859 36.5832C131.526 36.8612 129.087 36.0503 128.351 35.9577C119.563 34.6835 105.574 32.1583 100.283 41.68C100.168 41.8653 100.26 42.1665 100.513 42.1897C107.185 42.4445 115.974 37.6026 117.63 30.7682C117.699 30.4902 117.469 30.2585 117.193 30.3744C106.886 34.4518 99.9148 43.9504 94.8533 53.4721C94.6462 53.8428 95.1063 54.1439 95.3824 53.8428C102.975 45.3867 112.523 37.8111 116.664 26.853C116.779 26.5518 116.411 26.2969 116.158 26.5055C110.268 31.4401 106.702 38.3671 102.169 44.4832C99.9148 47.5181 102.607 42.9078 102.929 42.1202C103.872 39.9656 104.884 37.8342 105.874 35.7028C108.105 30.8377 110.038 25.9263 111.234 20.7136C111.303 20.3893 110.889 20.0881 110.682 20.4125C106.081 27.1773 103.596 35.0542 99.8227 42.2823C99.6387 42.6298 100.145 43.0237 100.352 42.653C103.458 36.9307 107.438 31.3242 107.323 24.5594C107.323 24.3277 107.093 24.1192 106.863 24.2351C100.559 27.5943 91.9084 36.3284 101.088 42.3287C106.173 45.6647 116.825 44.182 118.389 37.4404C118.412 37.3014 118.412 37.1392 118.274 37.0697C110.061 31.8802 98.9485 37.8111 91.0801 41.0545C90.712 41.1935 90.9421 41.68 91.2642 41.6568C99.2706 41.0545 107.323 40.4058 114.547 36.5832C114.823 36.4442 114.754 36.004 114.432 35.9808C106.058 34.892 97.499 35.9808 89.5617 38.8072C89.2166 38.9231 89.4006 39.4791 89.7458 39.4096C97.6371 38.0659 105.229 35.5407 112.891 33.2703C114.662 32.7374 116.457 32.2741 118.251 31.8107C121.495 30.9767 120.437 31.2084 118.504 32.4826C115.835 34.2201 113.19 35.9808 110.659 37.9037C108.45 39.5949 106.518 41.5641 104.792 43.7419C104.309 44.3674 103.665 45.3404 103.32 46.0586C101.939 48.8618 103.021 44.6454 103.067 43.487C103.32 35.9808 102.975 28.4283 101.364 21.0612C101.295 20.7136 100.72 20.7137 100.743 21.0843C100.927 27.826 102.86 34.1738 104.516 40.6606C105.551 44.7149 106.242 48.7691 106.265 52.9624C106.288 54.561 104.93 50.2287 105.045 50.5299C104.102 48.0741 103.527 45.4794 102.975 42.9078C102.284 39.6181 101.939 36.282 101.709 32.9459C101.548 30.7682 101.548 28.6137 101.594 26.436C101.617 24.6984 101.111 21.316 101.87 25.4629C103.389 33.78 105.989 41.7263 106.173 50.275C106.242 50.6457 106.886 50.7152 106.863 50.2982Z" fill="white"></path><path d="M112.707 29.777L114.57 35.8468L106.38 38.0708L103.895 35.9626L103.504 31.4682L107.967 27.4834L112.707 29.777Z" fill="white"></path><path d="M107.16 27.3685L108.196 25.7468L107.62 21.9705L107.16 27.3685Z" fill="white"></path><path d="M107.852 36.8397L108.151 39.1796L109.761 39.5735L111.487 36.8397H107.852Z" fill="white"></path><path d="M101.616 31.4883L102.997 31.1408L101.57 29.2411L101.616 31.4883Z" fill="white"></path><path d="M104.564 35.9102L101.734 36.721L102.655 41.7946L105.784 38.7597L104.564 35.9102Z" fill="white"></path><path d="M115.626 32.2712H114.406V33.4064H115.626V32.2712Z" fill="white"></path>', 14), uS = [
  cS
];
function dS(e, t) {
  return J(), Ie("svg", lS, uS);
}
const fS = /* @__PURE__ */ Ot(sS, [["render", dS]]), hS = {
  name: "ReTab",
  components: {
    CTabContent: _u,
    CTabPane: wu,
    CNavLink: qa,
    CNavItem: ao,
    CNav: du
  },
  props: {
    tabs: {
      type: Array,
      required: !0
    },
    lazyLoad: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      tabPaneActiveKey: 0
    };
  },
  computed: {
    props() {
      return { ...this.$attrs };
    },
    children() {
      return this.$slots.default().filter((e) => typeof e.type == "object" || typeof e.type == "string");
    },
    normalizedTabs() {
      return this.tabs.map((e) => typeof e == "string" ? { name: e, onClick: null, props: {} } : {
        name: e.name || "",
        onClick: e.onClick || null,
        props: e.props || {}
      });
    }
  },
  methods: {
    handleTabClick(e, t) {
      e.onClick && typeof e.onClick == "function" && e.onClick(), this.tabPaneActiveKey = t;
    }
  }
};
function gS(e, t, n, a, i, r) {
  const o = X("c-nav-link"), s = X("c-nav-item"), l = X("c-nav"), c = X("c-tab-pane"), u = X("c-tab-content");
  return J(), Ie("div", null, [
    se(l, ya({
      role: "tablist",
      variant: "tabs"
    }, r.props), {
      default: Q(() => [
        (J(!0), Ie(Rn, null, ja(r.normalizedTabs, (d, f) => (J(), Re(s, ya({
          key: f,
          ref_for: !0
        }, d.props), {
          default: Q(() => [
            se(o, ya({ ref_for: !0 }, d.props, {
              href: "javascript:void(0);",
              active: i.tabPaneActiveKey === f,
              onClick: (g) => r.handleTabClick(d, f)
            }), {
              default: Q(() => [
                Kn(Ue(d.name), 1)
              ]),
              _: 2
            }, 1040, ["active", "onClick"])
          ]),
          _: 2
        }, 1040))), 128))
      ]),
      _: 1
    }, 16),
    se(u, null, {
      default: Q(() => [
        (J(!0), Ie(Rn, null, ja(r.children, (d, f) => (J(), Ie(Rn, {
          key: "tab-" + f
        }, [
          !n.lazyLoad || i.tabPaneActiveKey === f ? (J(), Re(c, {
            key: 0,
            role: "tabpanel",
            "aria-labelledby": "tab-" + f,
            visible: i.tabPaneActiveKey === f
          }, {
            default: Q(() => [
              (J(), Re(bf(d), ya({ ref_for: !0 }, d.props), null, 16))
            ]),
            _: 2
          }, 1032, ["aria-labelledby", "visible"])) : Nn("", !0)
        ], 64))), 128))
      ]),
      _: 1
    })
  ]);
}
const mS = /* @__PURE__ */ Ot(hS, [["render", gS]]), ui = yf({
  toasts: []
}), vS = ({ message: e, variant: t = Fn.DEFAULT }) => {
  ui.toasts.push({
    message: e,
    color: Ec.get(t).color,
    textColor: Ec.get(t).textColor
  });
}, pS = (e) => {
  const t = ui.toasts.findIndex((n) => n.id === e);
  t !== -1 && ui.toasts.splice(t, 1);
}, Fn = Object.freeze({
  DEFAULT: "DEFAULT",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR"
}), Ec = /* @__PURE__ */ new Map([
  [Fn.DEFAULT, { color: void 0, textColor: void 0 }],
  [Fn.SUCCESS, { color: void 0, textColor: "success" }],
  [Fn.WARNING, { color: void 0, textColor: "warning" }],
  [Fn.ERROR, { color: void 0, textColor: "danger" }]
]), bS = {
  state: Cf(ui),
  addToast: vS,
  removeToast: pS
}, yS = {
  name: "ReToaster",
  components: { CToastClose: Ou, CToastBody: ku, CToast: Su, CToaster: Du },
  computed: {
    toasts() {
      return bS.state.toasts;
    }
  }
}, CS = { class: "d-flex" }, xS = { class: "d-flex" }, _S = /* @__PURE__ */ Pe("strong", null, "Test Toast", -1);
function wS(e, t, n, a, i, r) {
  const o = X("CToastBody"), s = X("CToastClose"), l = X("CToast"), c = X("CToaster");
  return J(), Re(c, {
    placement: "top-end",
    class: "re-toaster",
    visible: ""
  }, {
    default: Q(() => [
      (J(!0), Ie(Rn, null, ja(r.toasts, (u, d) => (J(), Re(l, {
        key: d,
        color: u.color,
        delay: 5e3,
        visible: ""
      }, {
        default: Q(() => [
          Pe("div", CS, [
            se(o, {
              class: xf(u.textColor && `text-${u.textColor}`)
            }, {
              default: Q(() => [
                Pe("strong", null, Ue(u.message), 1)
              ]),
              _: 2
            }, 1032, ["class"]),
            se(s, { class: "me-2 m-auto" })
          ])
        ]),
        _: 2
      }, 1032, ["color"]))), 128)),
      se(l, {
        delay: 5e4,
        visible: ""
      }, {
        default: Q(() => [
          Pe("div", xS, [
            se(o, null, {
              default: Q(() => [
                _S
              ]),
              _: 1
            }),
            se(s, { class: "me-2 m-auto" })
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const SS = /* @__PURE__ */ Ot(yS, [["render", wS]]), kS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CAccordion: kf,
  CAccordionBody: Pf,
  CAccordionHeader: Tf,
  CAccordionItem: Af,
  CAlert: Lf,
  CAvatar: $f,
  CBadge: Vc,
  CBreadcrumb: Wc,
  CBreadcrumbItem: Hc,
  CButton: oe,
  CButtonGroup: Bf,
  CCallout: qf,
  CCard: Wt,
  CCardBody: Yt,
  CCardFooter: Yc,
  CCardHeader: Yr,
  CCardImage: Gf,
  CCardImageOverlay: Kf,
  CCardLink: Xf,
  CCardSubtitle: Uc,
  CCardText: Zf,
  CCardTitle: Ur,
  CCarousel: Qf,
  CCarouselItem: Jf,
  CChart: le,
  CCloseButton: Xn,
  CCol: Vn,
  CCollapse: zc,
  CContainer: cu,
  CDatePicker: Pg,
  CDateRangePicker: ou,
  CDropdown: Tg,
  CDropdownDivider: $g,
  CDropdownHeader: Lg,
  CDropdownItem: Ag,
  CDropdownMenu: Bg,
  CDropdownToggle: Eg,
  CFooter: lu,
  CForm: gr,
  CFormCheck: ta,
  CFormFeedback: en,
  CFormFloating: Wa,
  CFormInput: na,
  CFormLabel: Ne,
  CFormPlugin: Fg,
  CFormRange: mr,
  CFormSelect: Ua,
  CFormSwitch: vr,
  CFormText: Qn,
  CFormTextarea: pr,
  CHeader: Vg,
  CHeaderToggler: uu,
  CIcon: Ka,
  CImage: Hg,
  CInputGroup: br,
  CInputGroupText: yr,
  CLink: la,
  CListGroup: Wg,
  CListGroupItem: Yg,
  CLoadingButton: Ug,
  CModal: qg,
  CModalBody: Gg,
  CModalFooter: Kg,
  CModalHeader: Xg,
  CModalTitle: Zg,
  CMultiSelect: rm,
  CNav: du,
  CNavGroup: Cr,
  CNavItem: ao,
  CNavLink: qa,
  CNavTitle: fu,
  CNavbar: om,
  CNavbarBrand: sm,
  CNavbarNav: lm,
  CNavbarText: cm,
  CNavbarToggler: um,
  COffcanvas: dm,
  COffcanvasBody: fm,
  COffcanvasHeader: hm,
  COffcanvasTitle: gm,
  CPagination: hu,
  CPaginationItem: mt,
  CPlaceholder: vm,
  CPopover: pm,
  CProgress: io,
  CProgressBar: xr,
  CRow: zg,
  CSidebar: gu,
  CSidebarBrand: bm,
  CSidebarFooter: ym,
  CSidebarHeader: Cm,
  CSidebarNav: mu,
  CSidebarToggler: xm,
  CSmartPagination: vu,
  CSmartTable: Nm,
  CSpinner: no,
  CTabContent: _u,
  CTabPane: wu,
  CTable: bu,
  CTableBody: ro,
  CTableCaption: pu,
  CTableDataCell: pt,
  CTableHead: so,
  CTableHeaderCell: vt,
  CTableRow: Me,
  CTimePicker: Ra,
  CToast: Su,
  CToastBody: ku,
  CToastHeader: jm,
  CToaster: Du,
  CTooltip: zm,
  CWidgetStatsA: Vm,
  CWidgetStatsB: dv,
  CWidgetStatsC: fv,
  CWidgetStatsD: hv,
  CWidgetStatsE: gv,
  CWidgetStatsF: mv,
  ReAppBreadcrumb: Iw,
  ReAppFooter: Ww,
  ReAppHeader: Qw,
  ReAppSidebar: aS,
  ReCardHeader: oS,
  ReHeaderLogo: fS,
  ReTab: mS,
  ReToaster: SS
}, Symbol.toStringTag, { value: "Module" })), LS = {
  install(e) {
    for (const t in kS)
      (void 0)(t);
  }
};
export {
  kf as CAccordion,
  Pf as CAccordionBody,
  Tf as CAccordionHeader,
  Af as CAccordionItem,
  Lf as CAlert,
  $f as CAvatar,
  Vc as CBadge,
  Wc as CBreadcrumb,
  Hc as CBreadcrumbItem,
  oe as CButton,
  Bf as CButtonGroup,
  qf as CCallout,
  Wt as CCard,
  Yt as CCardBody,
  Yc as CCardFooter,
  Yr as CCardHeader,
  Gf as CCardImage,
  Kf as CCardImageOverlay,
  Xf as CCardLink,
  Uc as CCardSubtitle,
  Zf as CCardText,
  Ur as CCardTitle,
  Qf as CCarousel,
  Jf as CCarouselItem,
  le as CChart,
  Xn as CCloseButton,
  Vn as CCol,
  zc as CCollapse,
  cu as CContainer,
  Pg as CDatePicker,
  ou as CDateRangePicker,
  Tg as CDropdown,
  $g as CDropdownDivider,
  Lg as CDropdownHeader,
  Ag as CDropdownItem,
  Bg as CDropdownMenu,
  Eg as CDropdownToggle,
  lu as CFooter,
  gr as CForm,
  ta as CFormCheck,
  en as CFormFeedback,
  Wa as CFormFloating,
  na as CFormInput,
  Ne as CFormLabel,
  Fg as CFormPlugin,
  mr as CFormRange,
  Ua as CFormSelect,
  vr as CFormSwitch,
  Qn as CFormText,
  pr as CFormTextarea,
  Vg as CHeader,
  uu as CHeaderToggler,
  Ka as CIcon,
  Hg as CImage,
  br as CInputGroup,
  yr as CInputGroupText,
  la as CLink,
  Wg as CListGroup,
  Yg as CListGroupItem,
  Ug as CLoadingButton,
  qg as CModal,
  Gg as CModalBody,
  Kg as CModalFooter,
  Xg as CModalHeader,
  Zg as CModalTitle,
  rm as CMultiSelect,
  du as CNav,
  Cr as CNavGroup,
  ao as CNavItem,
  qa as CNavLink,
  fu as CNavTitle,
  om as CNavbar,
  sm as CNavbarBrand,
  lm as CNavbarNav,
  cm as CNavbarText,
  um as CNavbarToggler,
  dm as COffcanvas,
  fm as COffcanvasBody,
  hm as COffcanvasHeader,
  gm as COffcanvasTitle,
  hu as CPagination,
  mt as CPaginationItem,
  vm as CPlaceholder,
  pm as CPopover,
  io as CProgress,
  xr as CProgressBar,
  zg as CRow,
  gu as CSidebar,
  bm as CSidebarBrand,
  ym as CSidebarFooter,
  Cm as CSidebarHeader,
  mu as CSidebarNav,
  xm as CSidebarToggler,
  vu as CSmartPagination,
  Nm as CSmartTable,
  no as CSpinner,
  _u as CTabContent,
  wu as CTabPane,
  bu as CTable,
  ro as CTableBody,
  pu as CTableCaption,
  pt as CTableDataCell,
  so as CTableHead,
  vt as CTableHeaderCell,
  Me as CTableRow,
  Ra as CTimePicker,
  Su as CToast,
  ku as CToastBody,
  jm as CToastHeader,
  Du as CToaster,
  zm as CTooltip,
  Vm as CWidgetStatsA,
  dv as CWidgetStatsB,
  fv as CWidgetStatsC,
  hv as CWidgetStatsD,
  gv as CWidgetStatsE,
  mv as CWidgetStatsF,
  Iw as ReAppBreadcrumb,
  Ww as ReAppFooter,
  Qw as ReAppHeader,
  aS as ReAppSidebar,
  oS as ReCardHeader,
  fS as ReHeaderLogo,
  mS as ReTab,
  SS as ReToaster,
  LS as default
};
