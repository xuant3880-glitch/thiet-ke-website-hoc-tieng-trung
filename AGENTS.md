# Hướng dẫn Sửa và Deploy Website Học Tiếng Trung

## Tổng quan

Website học tiếng Trung này sử dụng:
- **Framework**: Next.js 16 với React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **State Management**: localStorage (client-side)
- **Authentication**: Custom auth system với localStorage

## Cấu trúc dự án

```
thiet-ke-website-hoc-tieng-trung/
├── app/                    # Các trang Next.js
│   ├── page.tsx           # Trang chủ
│   ├── pricing/           # Trang gói học
│   ├── login/             # Trang đăng nhập
│   ├── register/          # Trang đăng ký
│   ├── tu-vung/           # Trang từ vựng
│   ├── flashcard/         # Trang flashcard
│   ├── luyen-viet/        # Trang luyện viết
│   ├── phat-am/           # Trang phát âm
│   ├── hoi-thoai/         # Trang hội thoại
│   ├── trac-nghiem/       # Trang trắc nghiệm
│   └── gia-su-ai/         # Trang gia sư AI
├── components/            # Các component React
│   ├── home/              # Component trang chủ
│   ├── vocab/             # Component từ vựng
│   ├── flashcard/         # Component flashcard
│   ├── ui/                # UI components cơ bản
│   ├── site-header.tsx    # Header website
│   ├── site-footer.tsx    # Footer website
│   ├── subscription-badge.tsx  # Badge hiển thị gói
│   ├── lock-overlay.tsx   # Overlay khóa nội dung
│   └── user-menu.tsx      # Menu user khi đã đăng nhập
├── lib/                   # Các thư viện tiện ích
│   ├── vocab.ts           # Dữ liệu từ vựng HSK 1-9
│   ├── pricing.ts         # Cấu hình gói học
│   ├── subscription.ts   # Quản lý đăng ký
│   ├── progress.ts        # Quản lý tiến độ học
│   ├── auth.ts            # Quản lý authentication
│   ├── nav.ts             # Menu điều hướng
│   └── utils.ts           # Hàm tiện ích
└── public/                # Static files
```

## Hướng dẫn sửa nội dung

### 1. Thêm/Sửa từ vựng HSK

**File**: `lib/vocab.ts`

Để thêm từ vựng mới:
```typescript
const hskX: Row[] = [
  ['汉字', 'pinyin', 'nghĩa tiếng Việt', 'chủ đề'],
  // Thêm từ mới ở đây
]
```

Để sửa từ vựng, chỉnh sửa trực tiếp trong mảng tương ứng.

### 2. Thay đổi gói học (giá, tính năng)

**File**: `lib/pricing.ts`

Cấu trúc gói học:
```typescript
export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Miễn phí',
    price: 0,
    period: 'lifetime',
    maxLevel: 2,  // HSK tối đa được truy cập
    features: [
      'Tính năng 1',
      'Tính năng 2',
    ],
  },
  // Thêm/sửa gói khác
]
```

Để thay đổi giá:
- Sửa `price` (số tiền)
- Sửa `period` ('month', 'year', 'lifetime')
- Sửa `maxLevel` (cấp HSK tối đa)

### 3. Thay đổi mô tả cấp HSK

**File**: `lib/vocab.ts`

```typescript
export const LEVELS: { level: HskLevel; title: string; description: string }[] = [
  { level: 1, title: 'HSK 1', description: 'Mô tả...' },
  // Sửa mô tả tại đây
]
```

### 4. Thay đổi menu điều hướng

**File**: `lib/nav.ts`

```typescript
export const NAV_ITEMS: NavItem[] = [
  { href: '/url', label: 'Tên menu', hanzi: '汉字', description: 'Mô tả', icon: Icon },
  // Thêm/sửa menu
]
```

### 5. Hệ thống Authentication

Website sử dụng custom auth system với localStorage:

**File**: `lib/auth.ts`

Các function chính:
- `register(email, password, name)` - Đăng ký user mới
- `login(email, password)` - Đăng nhập
- `logout()` - Đăng xuất
- `loadUser()` - Lấy user hiện tại
- `isLoggedIn()` - Kiểm tra đã đăng nhập chưa
- `getCurrentUserId()` - Lấy ID user hiện tại

**Dữ liệu được lưu theo user:**
- Subscription (gói học): `lib/subscription.ts`
- Progress (tiến độ học): `lib/progress.ts`

Mỗi user có dữ liệu riêng, key localStorage có prefix theo userId.

**Trang auth:**
- `/login` - Trang đăng nhập
- `/register` - Trang đăng ký

### 6. Thay đổi giao diện UI

Các file CSS chính:
- `app/globals.css` - Styles toàn cục
- `postcss.config.mjs` - Cấu hình Tailwind
- Component styles trong các file `.tsx` sử dụng Tailwind classes

## Hướng dẫn chạy local

### Bước 1: Cài đặt dependencies

```bash
pnpm install
```

### Bước 2: Chạy development server

```bash
pnpm dev
```

Website sẽ chạy tại: http://localhost:3000

### Bước 3: Build để kiểm tra

```bash
pnpm build
```

## Hướng dẫn Deploy lên web

### Cách 1: Deploy lên Vercel (Khuyên dùng)

1. **Đăng ký tài khoản Vercel**
   - Truy cập: https://vercel.com
   - Đăng ký bằng GitHub, GitLab hoặc Bitbucket

2. **Push code lên GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

3. **Kết nối GitHub với Vercel**
   - Đăng nhập Vercel
   - Click "Add New Project"
   - Chọn repository GitHub của bạn
   - Click "Import"

4. **Cấu hình project**
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

5. **Deploy**
   - Click "Deploy"
   - Chờ vài phút để Vercel build và deploy
   - Website sẽ có domain: `https://your-project.vercel.app`

6. **Tùy chỉnh domain**
   - Vercel cung cấp domain miễn phí
   - Hoặc kết nối domain riêng trong Settings > Domains

### Cách 2: Deploy lên Netlify

1. **Build project**
   ```bash
   pnpm build
   ```

2. **Đăng ký Netlify**
   - Truy cập: https://netlify.com
   - Đăng ký tài khoản

3. **Drag & Drop deploy**
   - Thả thư mục `.next` vào Netlify (không khuyến nghị cho Next.js)
   - Hoặc kết nối GitHub repository

4. **Cấu hình build settings**
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Install command: `pnpm install`

### Cách 3: Deploy lên VPS/Server riêng

1. **Cài đặt Node.js và pnpm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pnpm
   ```

2. **Clone repository**
   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   pnpm install
   pnpm build
   ```

3. **Chạy production**
   ```bash
   pnpm start
   ```

4. **Sử dụng PM2 để quản lý process**
   ```bash
   npm install -g pm2
   pm2 start pnpm --name "hsk-learning" -- start
   pm2 save
   pm2 startup
   ```

5. **Cấu hình Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Hướng dẫn tích hợp thanh toán

Hiện tại hệ thống chỉ mô phỏng nâng cấp (localStorage). Để tích hợp thanh toán thực tế:

### 1. MoMo (Vietnam)

- Đăng ký MoMo API tại: https://business.momo.vn
- Tạo API Key và Partner Code
- Tích hợp MoMo Payment Gateway vào trang pricing

### 2. Stripe (Quốc tế)

- Đăng ký Stripe tại: https://stripe.com
- Cài đặt Stripe SDK:
  ```bash
  pnpm add @stripe/stripe-js @stripe/react-stripe-js
  ```
- Tạo API endpoint trong Next.js để xử lý payment

### 3. VNPay (Vietnam)

- Đăng ký VNPay tại: https://sandbox.vnpayment.vn
- Tích hợp VNPay QR Code hoặc ATM Payment

## Gợi ý cải thiện

### 1. Authentication & Authorization

**Hiện tại:**
- Dùng localStorage để lưu user, subscription, progress
- Password được lưu plain text (không an toàn cho production)
- Không có email verification
- Không có reset password

**Nên nâng cấp:**
- Sử dụng NextAuth.js hoặc Supabase Auth
- Hash password với bcrypt
- Thêm email verification
- Thêm forgot password/reset password
- Kết nối OAuth (Google, Facebook)
- Sử dụng database thay vì localStorage

**Sử dụng NextAuth.js:**
```bash
pnpm add next-auth @auth/prisma-adapter prisma
```

### 2. Backend API
   - Hiện tại dùng localStorage → Nên chuyển sang database (PostgreSQL, MongoDB)
   - Sử dụng Prisma ORM cho database
   - Tạo API routes trong Next.js

### 3. Payment Integration
   - Tích hợp MoMo, VNPay, Stripe
   - Lưu thông tin payment vào database

### 4. Content Management
   - Tạo admin panel để quản lý từ vựng
   - Upload content dễ dàng hơn

### 5. Analytics
   - Tích hợp Google Analytics
   - Theo dõi user behavior

## Troubleshooting

### Lỗi build

```bash
# Xóa cache và node_modules
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Lỗi TypeScript

```bash
# Kiểm tra type errors
pnpm tsc --noEmit
```

### Lỗi localStorage trong SSR

- Các function trong `lib/subscription.ts` và `lib/progress.ts` chỉ chạy ở client
- Đảm bảo check `typeof window === 'undefined'` trước khi dùng

## Lưu ý quan trọng

1. **Đừng commit secrets**
   - Không commit API keys, passwords
   - Sử dụng environment variables
   - File `.env.local` không được commit

2. **Version dependencies**
   - Cập nhật dependencies định kỳ
   - Check security vulnerabilities: `pnpm audit`

3. **Backup data**
   - Nếu dùng database, backup định kỳ
   - Export user data trước khi thay đổi cấu trúc

## Liên hệ hỗ trợ

Nếu gặp vấn đề:
- Check Next.js docs: https://nextjs.org/docs
- Check Tailwind docs: https://tailwindcss.com/docs
- Check TypeScript docs: https://www.typescriptlang.org/docs
