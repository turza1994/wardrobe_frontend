# Skills & Conventions – Turza's Next.js Multi-Vendor Fashion Ecommerce Project
Last updated: March 2025  
Project focus: Women’s fashion multi-vendor marketplace (dresses, sarees, western wear, accessories, ethnic wear, jewelry, bags, etc.)  
Location context: Bangladesh (mobile-first, Bangladeshi mobile number auth, BDT currency)

## Core Project Identity
- Domain: women fashion ecommerce (premium + mid-range)
- Target audience: Women 18–45, Bangladesh + diaspora
- Aesthetic: feminine, elegant, clean, modern, lifestyle imagery heavy
- Color palette: soft pinks, blush, gold accents, neutrals, occasional deep jewel tones
- Typography: Inter or Poppins (sans-serif), elegant & readable
- Currency: BDT (৳) — always format with Bangladeshi style (৳1,23,456)

## Tech Stack – Non-negotiable
Must use / must NOT use:

✅ Must use
• Next.js 16+ (App Router only)
• TypeScript — strict mode, no any, prefer exhaustive checks
• Tailwind CSS v3+
• shadcn/ui (already initialized)
• React Hook Form + Zod (every form)
• Zustand (only cart + auth)
• Native fetch + custom apiClient.ts wrapper
• JSON Server mock backend (@ http://localhost:3001)

❌ Forbidden (unless I explicitly say otherwise)
• Redux / Zustand for server data
• TanStack Query / SWR / React Query
• Axios
• Emotion / Styled Components
• Material UI / Chakra / Ant Design
• Framer Motion (only very lightly if needed for hero slider)
• Third-party carousels (Swiper, etc.) — prefer custom + Tailwind

## Authentication Rules (Bangladeshi style)
- Login: mobile number (01xxxxxxxxx) + password
- Registration: mobile, name, email, password → OTP sent → verify OTP
- Tokens:
  • accessToken  → Zustand (memory)
  • refreshToken → localStorage (note: plan to move to httpOnly cookie later)
  • role        → Zustand ("customer" | "vendor" | "admin")
- Silent refresh on 401 → retry original request
- Logout → clear everything + redirect /auth/login
- Mobile regex: /^01[3-9][0-9]{8}$/
- OTP: 6 digits, auto-focus inputs, paste support

## Folder Structure Expectations

src/
├── app/
│   ├── (auth)/          login • register • verify-otp
│   ├── (store)/         public storefront + navbar/footer
│   ├── (dashboard)/     protected vendor/admin area + sidebar
├── components/
│   ├── ui/              ← shadcn components only
│   ├── shared/          Navbar, Footer, Breadcrumb, Pagination, ToastWrapper
│   ├── store/           ProductCard, ProductGrid, AddToCartButton, CartDrawer, HeroSlider...
│   ├── dashboard/       Sidebar, StatCard, DataTable...
│   ├── auth/            LoginForm, RegisterForm, OTPVerificationForm, PhoneInput
├── services/
│   ├── apiClient.ts     ← fetch wrapper + silent refresh + auth header
│   ├── auth.service.ts
│   ├── product.service.ts
│   ├── order.service.ts
├── stores/
│   ├── authStore.ts
│   ├── cartStore.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
├── lib/
│   ├── utils.ts
│   ├── cn.ts
│   ├── formatCurrency.ts  ← ৳1,23,456
├── types/
│   ├── index.ts
│   ├── auth.ts
│   ├── product.ts
│   ├── order.ts
├── constants/
│   ├── api.ts
│   ├── routes.ts

## Component & Code Style Rules

1. Server Components first — 'use client' only when necessary
2. Every form → React Hook Form + Zod schema
3. Class merging → use cn() helper from lib/utils.ts
4. Naming:
   - Components: PascalCase
   - Files: PascalCase for components, camelCase for utils/hooks/services
   - Variables: camelCase
   - Types: PascalCase + suffix if needed (Product, ProductProps)
5. Currency: always use formatCurrency(123456) → "৳1,23,456"
6. Images: next/image, sizes + priority on hero/first fold
7. Data fetching:
   - Server components → fetch() + { next: { revalidate: 60 } } or tags
   - Client → apiClient with auth & silent refresh
8. Error handling: try/catch + user-friendly messages + loading skeletons
9. Accessibility: aria-labels on icons/buttons, focus states

## Homepage (storefront) Structure – Must Follow This Order

1. Fullscreen Hero Slider (h-screen)
   - Autoplay 5–6s, smooth fade + subtle ken-burns/scale
   - Large lifestyle fashion images (women in dresses/sarees)
   - Animated headline + sub + CTA button

2. Shop by Category (large image cards)

3. New Arrivals / Featured Products

4. Best Sellers / Trending

5. Promotional full-width banner

6. Instagram-style social grid (optional)

7. Trust badges (quality, delivery, returns)

8. Newsletter signup

## Dashboard Style Expectations

- Modern SaaS look: Stripe / Vercel / Linear inspiration
- Collapsible sidebar (mobile → top bar)
- Stat cards, searchable/sortable/paginated tables
- Role-based visibility (vendor sees only own products/orders)

## Output Preferences When Generating Code

- Show complete file (not snippets unless asked)
- Include imports at top
- Show TypeScript interfaces/types
- Add comments for complex logic (especially auth/refresh)
- Use real shadcn/ui component names (Button, Card, Input, etc.)
- Prefer composition over prop drilling
- Mobile-first responsive classes

When I give you a prompt, assume:
- I want production-ready, scalable code
- Follow this skills.md unless I say “ignore skills” or give conflicting instruction
- Ask clarifying questions only if the prompt is ambiguous about auth / role / currency / styling

Happy coding! ♡
Turza