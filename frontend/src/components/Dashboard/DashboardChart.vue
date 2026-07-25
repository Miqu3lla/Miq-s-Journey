<script setup>
import { computed, ref } from 'vue';
import { usePostStore } from '@/stores/postsStore';
import { Icon } from '@iconify/vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const postStore = usePostStore();
const timeRange = ref('7days'); // '7days' or '30days'

const getLabel = (index, days) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - index));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const chartData = computed(() => {
    const days = timeRange.value === '7days' ? 7 : 30;
    const counts = Array(days).fill(0);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    postStore.posts.forEach(post => {
        const postDate = new Date(post.createdAt);
        const diffTime = Math.abs(today - postDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < days) {
            counts[days - 1 - diffDays]++;
        }
    });

    const labels = Array.from({ length: days }, (_, i) => getLabel(i, days));

    const mainColor = '#d2bbff'; // Moonlit Thoughts primary
    
    return {
        labels,
        datasets: [
            {
                label: 'Posts',
                data: counts,
                borderColor: mainColor,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(210, 187, 255, 0.4)');
                    gradient.addColorStop(1, 'rgba(210, 187, 255, 0.0)');
                    return gradient;
                },
                borderWidth: 2,
                pointBackgroundColor: mainColor,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: mainColor,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4,
            }
        ]
    };
});

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: postStore.isDark ? '#1e293b' : '#ffffff',
            titleColor: postStore.isDark ? '#e3e0f6' : '#1f2937',
            bodyColor: postStore.isDark ? '#ccc3d8' : '#4b5563',
            borderColor: postStore.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
                label: function(context) {
                    return `${context.parsed.y} posts`;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                color: postStore.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
                font: {
                    family: 'Inter, sans-serif',
                    size: 11
                },
                precision: 0,
                maxTicksLimit: 5
            },
            border: {
                display: false
            }
        },
        x: {
            grid: {
                color: postStore.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                drawBorder: false,
            },
            ticks: {
                color: postStore.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
                font: {
                    family: 'Inter, sans-serif',
                    size: 11
                },
                maxTicksLimit: timeRange.value === '7days' ? 7 : 6,
                maxRotation: 0,
                minRotation: 0,
            },
            border: {
                display: false
            }
        }
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
}));
</script>

<template>
    <div :class="[
        'rounded-xl p-6 flex flex-col gap-6 transition-all',
        postStore.isDark ? 'bg-[#292839]/60 backdrop-blur-xl border border-white/5' : 'bg-white shadow-lg border border-gray-100'
    ]">
        <div class="flex items-center justify-between border-b pb-4" :class="postStore.isDark ? 'border-white/5' : 'border-gray-100'">
            <div class="flex items-center gap-2">
                <Icon icon="mdi:chart-line-variant" class="text-[#d2bbff] text-2xl" />
                <h3 :class="postStore.isDark ? 'text-dash-on-surface' : 'text-gray-800'" class="font-semibold text-lg tracking-wide">Post Activity</h3>
            </div>
            <select v-model="timeRange" :class="postStore.isDark ? 'bg-[#121221] border-white/10 text-dash-on-surface-variant' : 'bg-gray-50 border-gray-200 text-gray-600'" class="border rounded-md text-sm p-1.5 outline-none focus:ring-2 focus:ring-[#d2bbff]">
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
            </select>
        </div>
        
        <div class="h-64 w-full relative">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
