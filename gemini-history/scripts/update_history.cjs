const fs = require('fs');
const path = require('path');

function getToday() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

const historyDir = path.join(process.cwd(), 'gemini history');
const todayDir = path.join(historyDir, getToday());
const summaryPath = path.join(todayDir, 'summary.md');
const readmePath = path.join(historyDir, 'README.md');

// Ensure directories exist
if (!fs.existsSync(historyDir)) fs.mkdirSync(historyDir, { recursive: true });
if (!fs.existsSync(todayDir)) fs.mkdirSync(todayDir, { recursive: true });

function updateReadme() {
    const todayStr = getToday();
    const link = `- [[${todayStr}/summary.md]]`;
    if (!fs.existsSync(readmePath)) {
        fs.writeFileSync(readmePath, `# Gemini CLI Activity Index\n\n## Daftar Riwayat\n${link}\n`);
        return;
    }
    let content = fs.readFileSync(readmePath, 'utf8');
    if (!content.includes(link)) {
        content = content.replace('## Daftar Riwayat', `## Daftar Riwayat\n${link}`);
        fs.writeFileSync(readmePath, content);
    }
}

function updateSummary(action, detail) {
    const time = new Date().toISOString().substring(11, 16);
    const logEntry = `| ${time} | ${action} | ${detail} |\n`;
    
    if (!fs.existsSync(summaryPath)) {
        fs.writeFileSync(summaryPath, `# Ringkasan Aktivitas - ${getToday()}\n\n## Log Tindakan\n| Jam (UTC) | Tindakan | Detail |\n|-----------|----------|--------|\n${logEntry}`);
    } else {
        let content = fs.readFileSync(summaryPath, 'utf8');
        if (!content.includes('## Log Tindakan')) {
            content += '\n\n## Log Tindakan\n| Jam (UTC) | Tindakan | Detail |\n|-----------|----------|--------|\n';
        }
        content += logEntry;
        fs.writeFileSync(summaryPath, content);
    }
}

const [,, action, detail] = process.argv;
if (action && detail) {
    updateReadme();
    updateSummary(action, detail);
    console.log(`Success: Logged "${action}" to history.`);
} else {
    console.log("Usage: node update_history.cjs <action> <detail>");
}
