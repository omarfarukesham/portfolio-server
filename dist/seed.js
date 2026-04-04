"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const ebook_model_1 = require("./module/ebook/ebook.model");
const ebooks = [
    {
        slug: 'fire-safety',
        title: 'আগুনের বেসিক নলেজ (Fire Safety Basics)',
        subtitle: 'অফিস, বাসা, ফ্যাক্টরি এবং ট্রেনিং সেশনের জন্য উপযুক্ত বই',
        description: 'আগুনের বেসিক নলেজ বইটি আগুনের প্রাথমিক ধারণা, আগুন লাগার কারণ, এবং আগুন নিয়ন্ত্রণের সহজ উপায় নিয়ে লেখা হয়েছে।',
        outcomes: [
            'আগুন কী, কেন হয়, আর কীভাবে ছড়ায় ?',
            'ফায়ার ট্রায়াঙ্গেল এবং আগুন নিয়ন্ত্রণের সহজ উপায়',
            'আগুন লাগার সময় করণীয় এবং না করণীয়',
        ],
        price: 199,
        oldPrice: 1290,
        badge: 'Best Seller',
        coverImage: '/covers/1.png',
        pdfPath: 'pdfs/fire-safety.pdf',
        category: 'Fire Safety',
    },
    {
        slug: 'first-aid',
        title: 'কর্মক্ষেত্রে ফার্স্ট এইড গাইড (First Aid at Work)',
        subtitle: 'অফিস টিম, সুপারভাইজার ও HR অ্যাডমিনদের জন্য প্রয়োজনীয় গাইড',
        description: 'কর্মক্ষেত্রে দুর্ঘটনা বা জরুরি পরিস্থিতিতে কীভাবে দ্রুত ও নিরাপদভাবে প্রাথমিক চিকিৎসা দিতে হবে—এই বইটি ধাপে ধাপে সহজভাবে শেখাবে।',
        outcomes: [
            'কর্মক্ষেত্রের সাধারণ ইনজুরির জন্য দ্রুত প্রাথমিক চিকিৎসার গাইড',
            'চাপের মুহূর্তে কী করবেন/কী করবেন না—সহজ নির্দেশনা',
            'প্রিন্ট-রেডি ইমার্জেন্সি কুইক রেফারেন্স পেজ',
        ],
        price: 199,
        oldPrice: 300,
        badge: 'Workplace Ready',
        coverImage: '/covers/2.png',
        pdfPath: 'pdfs/first-aid.pdf',
        category: 'First Aid',
    },
    {
        slug: 'supervisory',
        title: 'সুপারভাইজরি স্কিলস (Supervisory Skills)',
        subtitle: 'সুপারভাইজার, টিম লিড ও অপারেশন টিমের জন্য সংক্ষিপ্ত গাইড',
        description: 'দল পরিচালনা, দায়িত্ব বণ্টন, দৈনন্দিন কাজের শৃঙ্খলা এবং ভুল কমিয়ে নিরাপদ অপারেশন নিশ্চিত করতে—এই বইটি একটি বাস্তবভিত্তিক গাইড।',
        outcomes: [
            'নিরাপদ ও কার্যকর কাজ নিশ্চিত করতে সুপারভাইজারের দৈনিক নেতৃত্ব রুটিন',
            'ভুল ও মিসকমিউনিকেশন কমানোর কার্যকর যোগাযোগ কৌশল',
            'কোচিং, ফিডব্যাক ও পারফরম্যান্স উন্নয়নের অ্যাকশন-ভিত্তিক পদ্ধতি',
        ],
        price: 250,
        badge: 'Leadership',
        coverImage: '/covers/3.png',
        pdfPath: 'pdfs/supervisory.pdf',
        category: 'Leadership',
    },
    {
        slug: 'fire-safety-professional',
        title: 'ফায়ার সেফটি প্রফেশনাল গাইড (Supervisor & Compliance)',
        subtitle: 'RMG/ফ্যাক্টরি সুপারভাইজার, সেফটি অফিসার ও কমপ্লায়েন্স টিমের জন্য',
        description: 'ফ্যাক্টরি/আরএমজি পরিবেশে ফায়ার রিস্ক কন্ট্রোল, ইভাকুয়েশন ড্রিল, ইন্সপেকশন চেকলিস্ট এবং কমপ্লায়েন্স প্রস্তুতি—সবকিছু একত্রে সাজানো একটি প্রফেশনাল গাইড।',
        outcomes: [
            'ফায়ার রিস্ক অ্যাসেসমেন্ট, হটস্পট কন্ট্রোল ও বাস্তবভিত্তিক প্রিভেনশন প্ল্যান',
            'ড্রিল প্ল্যানিং, ইভাকুয়েশন ম্যানেজমেন্ট ও রোল-বেইসড দায়িত্ব তালিকা',
            'কমপ্লায়েন্স রেডি ডকুমেন্ট চেকলিস্ট: ড্রিল লগ, ট্রেনিং লগ, মেইনটেন্যান্স লগ',
        ],
        price: 499,
        oldPrice: 699,
        badge: 'Professional',
        coverImage: '/covers/4.png',
        pdfPath: 'pdfs/fire-safety-professional.pdf',
        category: 'Compliance',
    },
];
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log('Connected to MongoDB');
            // Clear existing ebooks
            yield ebook_model_1.EbookModel.deleteMany({});
            console.log('Cleared existing ebooks');
            // Insert seed data
            const result = yield ebook_model_1.EbookModel.insertMany(ebooks);
            console.log(`Seeded ${result.length} ebooks`);
            result.forEach((ebook) => {
                console.log(`  - ${ebook.slug}: ${ebook._id}`);
            });
            yield mongoose_1.default.disconnect();
            console.log('Done!');
            process.exit(0);
        }
        catch (error) {
            console.error('Seed failed:', error);
            process.exit(1);
        }
    });
}
seed();
