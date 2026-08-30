export interface Category {
  id: string;
  name: string;
  image: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  rating?: number;
  description?: string;
  gallery?: string[];
  reviewCount?: number;
  details?: string[];
}

export const mockCategories: Category[] = [
  {
    id: "furniture",
    name: "Furniture",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALQWv-BVwoqLJs5f-lkCGClt2NhrvkW-kGkXq0fiVa-I9X1Mv0qc0V7ysLBEOM-6Y_DM3RwOWlx6C2iyio6eevpYuay12zsngiSCF9If0-WOXuAohq1tyJ4kxiK-6xc2UK0lxK2WuEj0d5n67s9sql6G3X-g6fd7hPP-0sr9Cqy_XdqQiW88pKe8pwbCdGHA9qn6vs9iZiVWMX1Dq44wHMgzbevKNM9hbaRRz0pM2ZUCglH4XHVC5BSg",
    alt: "A close-up shot of a meticulously crafted mid-century modern wooden armchair...",
  },
  {
    id: "apparel",
    name: "Apparel",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr_xzu3it4GDR6naJIgZF6SbcIXxR1CxI-6sXu-X29A_3NVgeFq6t_dU5DSN7No1Z3f9B6l9zq3M7-45fZZohDi4QF1TsmLaBvC7CL1OjGt3oYGaEjV-JFsFJy6BKE6qHpMHtd9kiV6ChTl-kxbrmtZQ2TIbvbzAHcD-Nz-L1o6dHWlxJI0McBSwA98ORkK0oWT3HegNM0hT2V9LsWj8AvRkVC9RR-JeZ6hCTNZh2To8oWa2b8pPB7bw",
    alt: "A beautifully styled flat lay of minimalist apparel...",
  },
  {
    id: "objects",
    name: "Objects",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoVDqy4Mpub4_EnJnAa_OKmRkpu9xww0vxW6BI_vwBJXviq-YjLceVFcbwdbJ8ff3WAWn3QzuIdIXUs84ACfE2vh0ZBhZdjcHAsrW57RNYqRn4LWK5iMohsl9eB1mXuEY6x-8zDjGBIBdgC1mepYBJWerNWicqbcdgTnfiDlYsodj0Gx9VaIhnzSL-nc9prrMOqdfDMEyfzVao6X3u-YQ0tmk81eC5d1whtwCT-fhb-D-n32DA8WVRJw",
    alt: "A curated arrangement of beautifully designed everyday objects...",
  },
  {
    id: "wellness",
    name: "Wellness",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhlcOD5NfgW3DCvQctlaim0o0nw0RbhF5qeref3gUWcMcur15V5yAp1xmFh6CdrPMleONTwvSu69yqUgYPhBkQNSZAefSROl74x9YhRfSXeA-4UzFnT2daAtECObJQXzAM5P2JoSExutEa_5dq_dVzYBssRh2lopl8Ep_h47oZ3WXQEuPWTyslqPIDSEECXHXNKIIxnq9hy9n9tOhQ97n7pCxN9txW07eouEMtsEhqprj_8-Xp0QlyVg",
    alt: "A serene wellness flat lay featuring essential oil bottles...",
  },
];

export const mockProducts: Product[] = [
  {
    id: "komorebi-vase",
    name: "Komorebi Vase",
    price: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJjX-Fl0xGmrgfx0YKAOe6GPYIIEfybd5Dqx7QjJj52sq8dGeCdZSA3PZmmkxDAvXNmJTJBzC7aUTXSN1SOWc5dYCTe35kteIffEX_DTIzD-6hXVM4Ic3DpKS4fFadoZvtpxyLz1qt2XQhXHZeANMprt8YIbcV_J3HeDInqT-LiDPTL_4Bx9I3i2Kh5Xz3FJ02Dg42JpBn58L9nTO_wc8KXa-w2EV4hXiNZCzUHm0aAsS1-nVtOan5vg",
    alt: "Komorebi Vase",
  },
  {
    id: "aura-table-lamp",
    name: "Aura Table Lamp",
    price: 240,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpE1xt7Oemm5cMI3kQgRxqTEGu8w1cHN9CmDSPnQnEyI96vkmUuH2bOMlKIRof5HmcRmIxDvxePqPwqyh8elD7mEWESxj9Yd5AvmGx25RkQzyOzuQYihiAiVnowpU4tjR2YrZO5m2QN1LjHKQMEZI0qWUmBNiQhbfaN5QGe7iIoBV6BshZ71Qm0v5_Skc95aW4BJb5hNODqn5TmMOvezh8brGATkggQfig1ijnNZKDAVfFkfG6jdJT9g",
    alt: "Aura Table Lamp",
  },
  {
    id: "linen-throw-set",
    name: "Linen Throw Set",
    price: 120,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFy_vGqSx5rNnRJEcDFLvnchu8AqKUN4O6Tyil46WAGyz-meL5hU3FiSF2WvAKO2wZbECuvdKXSP8D9R9dNdkgvBdPcH4G_Tuc_DTmyfSoUs_bGksn7XoUEIABTh7sQ1kjqLZ85o5nVuR_gpynIxhRUUd9IkjD_XUOsE60g10TKTcF_uTWcqbiLaGz6qujk922kuCN8GqA9gqoaNXO5VD0k9Lud6e_b0gfBhlhVn5jDGEQ1HAqG-_fpQ",
    alt: "Linen Throw Set",
  },
  {
    id: "nomi-lounge-chair",
    name: "Nomi Lounge Chair",
    price: 895,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Sh3aQtedcrpjlMbysVoRvYIOVdomN4OmIXmVGpox24o-DhjunPdE_h4wqFqmJ8fdThVeUlkEAuiZdNGgiNHTxZPI-uEjfU-aI7g3nlcx2UMvtKVkLCLAQFhWuo8kYZW_G8wKRp1Kr3txcRs022uSLS8SrTavYCFke3oe2kygkW3tIPYCq2TwlyOsD2bjh1RQVT2yrE-EbqbLgftsoGpi-JSS9yXMbaeqsM8kE956QaHVNmLcTBk37w",
    alt: "Nomi Lounge Chair",
  },
  {
    id: "hinoki-wood-candle",
    name: "Hinoki Wood Candle",
    price: 45,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlWJSbgfo7B7_uUy1f-ROtz_-w8uHy0dITelmFkvQlbVmXfWY7iqbIokIkdhca0zsUOMPml_-WBD39PZt_nv-H4wWzgnYEM_2jGn4Qoy1d6RJ754EmMRmSwM_rC8ovwA-W2rcKHWsD2BQ-2lUPijL8OD6B8uPLYZ1ulUTNVE1fTVxifQb7vPMY47JjJr8he7NTtkBPURfSfLWNNencJNXBmkCPcgy1e6YOexW-ypkmfx7SAQBMPDJIoA",
    alt: "Hinoki Wood Candle",
  },
  {
    id: "oak-side-table",
    name: "Oak Side Table",
    price: 350,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLRQ5Ck7XavzaRr4jsi3u2l7PEGmue_kylarswNO64gNXKaMFtSMQ5UM99UBDYWiwwq8hZdrCiRm55Z6Q39REATg4Pj_vLIXjsixeIJs_Wd_nqd6dDHMhwr_5Kg3HxejBXtZ8pf3-1jv8Lwj4ZoHd3FXMB0ekPqiDSvtOpO1135wf2j5LhFZ-WDIi_XPjPvETV6eTdLdDh_SsVLTVsQhKwDQto9CDREmhJazRLjdX30mfpjQVK7fhnog",
    alt: "Oak Side Table",
  },
  {
    id: "woven-storage-basket",
    name: "Woven Storage Basket",
    price: 68,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6l9gRHPu4up4YLoKYcWEo44DiL2HfOF6VoP89-ClqQKEP2zDbcfMhodIB9IeYx6v4Ct9HWu6YUd_eP_Yn4zpihvzxI4aEkSt2_JZRNEFvM5kd22jx-1-SAt7pvNwLSAF_GBheDy-BfP-EdgiiW71H7hzCalKJ7ULH6Rhxkoiv3aOX9NEVB8m-VPce1lgIvK_1JKVc_gGebUSVR5rxyE6o1wMhxKKeoQqCjaiG6HKEwue5LJ0_I5nVPw",
    alt: "Woven Storage Basket",
  },
  {
    id: "everyday-journal",
    name: "Everyday Journal",
    price: 32,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOK-xrP6xsK6R3t9sED3gvNJBs4MFJNFdZBpYeOmKtGswA84iGypWmKZ90adyFuUvPnsK7Qj_M1KKQeNuPpN1PJnElavkki7Cw__0v8oEpGQDdWSJm3iuryeMSMlzpvIYlL3jIKO_Y012mL4XHtR8BNPGE5eg0_Lo81JMh5TExoOtWwOG_B2U9seDciAj3KmqPE-WgFFCT6LxGIQOdu_ZciSL1oP0yXAidapJKsgLUjRwqE8W-lAageA",
    alt: "Everyday Journal",
  },
];

export const mockProductsList: Product[] = [
  {
    id: "minimalist-vase",
    name: "Hand-Thrown Ceramic Vessel",
    price: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGpGcpXt6JS2QFqcPDdgbCg39SzJ4za_ZKsoUvt_fYBfipqRtJitN6_14cbiWu0Ubv58Jmr8t4r1nm07-kNYw8qJDg4MO3SPCm4CdnMOM5005o5MQ9w7Vc4i-skDRgtBRN3eJ1LaQnfl8_yoxzZ42PQQljyZaZCE5nVp_tgeQTVfFrqGXYK2xSF_L5ED4QE0WxxkRJknu34kg3reArK2FJvtshQm-NRLxFcO3oPRNqh_GNOwB2bBUAPw",
    alt: "Hand-Thrown Ceramic Vessel",
    rating: 4.8,
    reviewCount: 124,
    description: "Crafted by master artisans in our coastal studio, each vessel embraces the beauty of imperfection. The matte, speckled glaze creates a tactile surface that invites touch, perfectly sized for a minimalist arrangement or beautiful enough to stand entirely alone.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcaiZT2dWPMHHOCl7BFflSVagIGrBw_0Hc7J_w9MpVbhIpLwgKE6kqir4QNKXY8S6v3f32a_IKhKYLSwbo5m_yRV7jFKsrFJ0vl8LDIU_YcnixMM4YicUMNOg_9UquaHu5lmsxGQ76URI1z3k0JgM-XLIQP7Qs_xZZJC-deEU6ZLabV_GKEvPfkM2eyk6iTcMmSR5MCpcFB-u-_v8WyhK-b9X_YxaF7TrQB8ROoVwvF8XtytRgLGB3nw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_XJMC1ApRDj9h24qEhlvL1cZ4kIAxEglGtVyP9bmyybVYfy3fbf6LjlhBJS5bvnO0z6fDiKKfUY0I0ACHdwUgIvKaJR9w4VfQ6121JyOxoLManUaeuFk1vaESlDejBXf7sI07d_xzMsO6K0J8rBKTiCQxH8rIXUQqJ-3L5O2zMlL5g55A1_KnJiM1k71BlVGWdnga6KsKKl5SCgx18fjRSM4wzlbjpmY1bKfCiogIZH71jQ_R8OKCwA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0fjcSV3FjvfQwutmms3KugogG5e4hNkPAzrS_GtGWgrIiYkJDSOc9C911ej6kLsfpQ86QpvimbtbkHiVXUQc_3tvMvN8oAtB8LkI99J76veqFLZ3CLTL3Qx6QlHILxRQ5xQLGUl3lkzgX1ZQK_FqTdTmzaR7I3atKCjQQyF9r1sEFr4vf4sTNQM6eEkRzDdPnYlCS3YFJFmO_nfyfytC1THB_TY8uqdogT8m_L5Jek_3I1YvgSWwPVQ"
    ],
    details: [
      "Dimensions: 8\" H x 5\" W",
      "Material: Stoneware clay with custom matte glaze",
      "Care: Hand wash recommended",
      "Slight variations in color and shape are inherent to the handmade process."
    ]
  },
  {
    id: "artisan-bowl",
    name: "Artisan Bowl",
    price: 45,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQCxWZhVr91Xwn27V3XrJ1p9gfr9i8CwYy7ajP0ubdAgJKHYAp0bL8jeUVggRU0ZxgFT3AR_YDnj-_NaCldRfxZAN5Yoq0GMI8TKOYI4aLGhMtW-nWn345hKDBOewohdLHZxNGbpd3IO7D86JpNG-11XQalrfZ4wHFfl23FBSyK4K1M3Tc1ZzOs25nhtbgwjD2HnGdrigMpyTuDpn8sfFfEXUCw7dCr3vL7UqpDknWtcHe1ZKErv-oiw",
    alt: "Wooden Bowl",
    rating: 5.0,
  },
  {
    id: "matte-desk-lamp",
    name: "Matte Desk Lamp",
    price: 120,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyUvcUhJ28EAnadSq3tyPOHke5CeF6vs9kQRb4f2_zRAGcUt7iTykex7CupUTDohvPOFUF80uGtXrWEWa85nYO5Blc1nIs7T70r0e0vP0WiK_A4vhPQ-8A_UPMpgWyWw-5qDIbQ9m8JWPmWC1Xhu0H7nts4Jfyth50Uu54rWKgIPfO6U_jC9gz4JywJ1_2GL1gGxKMOan32aE-PdT3VX6y9tc9zNbucj9xzsnSPYQmXB2Vk246nfwoxw",
    alt: "Desk Lamp",
    rating: 4.9,
  },
  {
    id: "linen-throw-pillow",
    name: "Linen Throw Pillow",
    price: 55,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ92hJSF02DCGoNnQnYXrn0OP0elPWbxAJjU8VMv3ecGjqr1W00crRkkbfTwMDBjvGI3tNVNtrdCJLtJRsntepZr2LdSm8FoKHKBdddXq5KAmea05DT5IC608XOxlnq67QPwq1OffVc5q4GK6sTHPc8jkzIjdzB6SpxeOV0LpThFKDMjQRteRPTxpOwnIPWNBMQbv376HOrnCJ2AnHqNxDD3mR1dRcStuKinhnyAnlYv_Q9pKxjhqGNA",
    alt: "Linen Pillow",
    rating: 4.7,
  },
  {
    id: "ribbed-glass-set",
    name: "Ribbed Glass Set",
    price: 38,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiX6OaZlF2z5LZV_dXbSchGo7AHVnDJlje81h-asxJPy89uMSIrGSu_XVqBqwktC33JPF0ATAqXuEnU-NnSLellCxPb9NpvdkuQnoP6kYqLREV3ibUeYQzOLZIL8BFxXe92Tvx-O0ISe49nw8AzTtpcnydKqgEP-Qr3ZsYxxJ9MK7efysEJC-ILPs3EvfpmpsQU5y636hbcInarqiEOyFkd6J3YKI1x777wwy8m2O37_tiVg2l0AGQtg",
    alt: "Glass Tumblers",
    rating: 4.6,
  },
  {
    id: "sculptural-stone",
    name: "Sculptural Stone",
    price: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm5ob47yHMBnenSddugdjoYMUrHGXfuqOj-CM3evd2iJVcuZj6zBv9ujQxpkC9PqyedSFxVEL4HOCgLcLotDgIpmsAxOXWqRsHTbsaIkUN9wHx9mFhjzqhtmGPSTAOwH_1yIIKQNOGe8xPfbJT1P99LNYTClfQoauQdDZ1NS4gTvjv-goO0kjEgxvIC_ldYc0pOl6dXp7-_Yc-LtsN8mLxqNZl00O04g9c-KONQwMOk2DVN2Ib30H3oA",
    alt: "Stone Object",
    rating: 5.0,
  },
  {
    id: "silent-wall-clock",
    name: "Silent Wall Clock",
    price: 95,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDX99QDhwXShJv9nVFBU4npPFlr0hNEZ7ph-xV3ecM2SO18-GdBwmtQnfJbDbxhteYcJlRi9dCmqebsatGGBsai2_EKwthhj7WhVtLEwlCN1QDO4j3yj-nyltJuNZYQ4EAqd8kpjlE16l7oHO3wUieiRlmKCoNTLlupdmgZMCl8pvcLGqkH64lB1SBzXexP9ue64EsLAsNJw-v_h8TdimJut9IOANsEOhI1ngVY3P7A1rK59EOcaBhiw",
    alt: "Wall Clock",
    rating: 4.5,
  },
  {
    id: "organic-napkin-set",
    name: "Organic Napkin Set",
    price: 32,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE26_bnrkvgMcg4QcRp0wZUyA4-a1lJYKl4w3XoW7UYVr6IohtNOwHgSaWHavfWy9i4dx6LOPEWMQNF_3DlhX2uWUISZ1anNkYn7tGcshEIQu0rOLRX_-WSb84ZEKEhS1KIm7K2To3wS1o0kHRZIWquksD7TqA0BtbWW2MG6SZ3gBRmfMhvdhElOVffi2PzECxr0ZIU2IGMDvIWzBpLrGK_91eAkN--DhAuetACOJI2UXk5zx5Q1dw2g",
    alt: "Cotton Napkins",
    rating: 4.9,
  },
  {
    id: "essential-mirror",
    name: "Essential Mirror",
    price: 210,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOq54B8EQy6wL94gHjRkBdtH-0lSb0XGx9qn-2lm5LmuoQK6d9z7JrtW5vlPXzOEH-gtx0pR5Ch1CRQEO0-PUrguyCu9ArbGk-WaOjzyeBrXfYgkMGgjPV5stbDLWk33evcmeDex9St2a9FTlVkDhQB5_dhRqzbjpf5DLW3zKw05M0-0UeSWoguK_cbOr6Vyr5RoGaYUK7QU3OZsEmsuICA-PW-gu4C-hgrdjAX6XUFm_ngXXk_Va3aQ",
    alt: "Round Mirror",
    rating: 4.8,
  },
];
