import open from 'open'
import { type ChildProcess } from 'node:child_process'
import { Repo } from './repo'


const URLS = [
    "https://vuejobs.com/jobs",
    "https://reactjobs.io/jobs/javascript?search=Javascript&isRemote=true",
    "https://www.ejobs.ro/locuri-de-munca/remote/it-software/mid-level,senior-level/sort-publish",
    "https://jsjobbs.com/jobs/remote-javascript-jobs",
    "https://remotive.com/remote-jobs/software-dev",
    "https://remoteok.com/remote-golang-jobs?order_by=date",
    "https://remoteok.com/remote-python-jobs?order_by=date",
    "https://remoteok.com/remote-javascript-jobs?order_by=date",
    "https://remoteok.com/remote-front-end-jobs?order_by=date",
    "https://remoteok.com/remote-backend-jobs?order_by=date",
    "https://remoteok.com/remote-dev-jobs?order_by=date",
    "https://reactjobs.io/jobs/javascript?search=Javascript&isRemote=true",
    "https://reactjobs.io/jobs/javascript?search=Javascript&isRemote=true&page=2",
    "https://reactjobs.io/jobs/javascript?search=Javascript&isRemote=true&page=3",
    "https://devjob.ro/",
    "https://euremotejobs.com/jobs/remote-software-engineering-jobs/",
    "https://remote.co/remote-jobs/developer/",
    "https://weworkremotely.com/categories/remote-full-stack-programming-jobs",
    "https://weworkremotely.com/categories/remote-front-end-programming-jobs",
    "https://weworkremotely.com/categories/remote-back-end-programming-jobs",
    "https://www.workingnomads.com/jobs?category=development&location=anywhere,europe",
    "https://nodesk.co/remote-jobs/engineering/",
    "https://www.eurotechjobs.com/job_search/category/developer/category/python_developer/category/web_developer", "https://www.remote.io/remote-software-development-jobs?pg=1",
    "https://www.remote.io/remote-software-development-jobs?pg=2",
    "https://4dayweek.io/remote-jobs/engineering/europe/fully-remote",
    "https://builtin.com/jobs/remote/dev-engineering/golang/javascript/python/mid-level/senior?daysSinceUpdated=3", "https://builtin.com/jobs/remote/dev-engineering/golang/javascript/python/mid-level/senior?daysSinceUpdated=3&page=2", "https://landing.jobs/jobs?page=1&gr=true&fr=true&c%5B%5D=3&c%5B%5D=1&c%5B%5D=2&match=all&pd=7&hd=false&t_co=false&t_st=false",
    "https://www.pyjobs.com/?remoteLevel[0]=1&remoteLevel[1]=2&date=72&regions[0]=RO",
    "https://remote.works-hub.com/jobs/search?page=1&remote=true&tags=JavaScript;Python",
    "https://berlinstartupjobs.com/skill-areas/javascript/",
    "https://berlinstartupjobs.com/skill-areas/python/",
    "https://berlinstartupjobs.com/skill-areas/typescript/",
    "https://startup.jobs/?remote=true",
    "https://www.reed.co.uk/jobs/work-from-home-python-jobs?parentSectorIds=52&dateCreatedOffSet=lastthreedays",
    "https://www.reed.co.uk/jobs/work-from-home-javascript-jobs?parentSectorIds=52&dateCreatedOffSet=lastthreedays", "https://www.reed.co.uk/jobs/work-from-home-typescript-jobs?parentSectorIds=52&dateCreatedOffSet=lastthreedays", "https://www.reed.co.uk/jobs/work-from-home-go-jobs?parentSectorIds=52&dateCreatedOffSet=lastthreedays",
    "https://www.startupjobs.com/jobs?seniority=medior,senior&technologies=python,javascript,go,typescript&form-of-collaboration=freelance,remote",
    "https://workinstartups.com/job-board/jobs/freelance/",
    "https://www.workatastartup.com/companies?demographic=any&hasEquity=any&hasSalary=any&industry=any&interviewProcess=any&jobType=any&layout=list-compact&query=Python&remote=only&role=eng&role_type=be&role_type=fe&role_type=fs&sortBy=keyword&tab=any&usVisaNotRequired=any",
    "https://www.workatastartup.com/companies?demographic=any&hasEquity=any&hasSalary=any&industry=any&interviewProcess=any&jobType=any&layout=list-compact&query=Python&remote=only&role=eng&role_type=be&role_type=fe&role_type=fs&sortBy=keyword&tab=any&usVisaNotRequired=any",
    "https://www.workatastartup.com/companies?demographic=any&hasEquity=any&hasSalary=any&industry=any&interviewProcess=any&jobType=any&layout=list-compact&query=Golang&remote=only&role=eng&role_type=be&role_type=fe&role_type=fs&sortBy=keyword&tab=any&usVisaNotRequired=any",
    "https://justremote.co/remote-developer-jobs",
    "https://dynamitejobs.com/remote-jobs?text=Python&page=1",
    "https://dynamitejobs.com/remote-jobs?text=Python&page=2",
    "https://dynamitejobs.com/remote-jobs?text=Python&page=3",
    "https://dynamitejobs.com/remote-jobs?text=Python&page=4",
    "https://dynamitejobs.com/remote-jobs?text=Javascript&page=1",
    "https://dynamitejobs.com/remote-jobs?text=Javascript&page=2",
    "https://dynamitejobs.com/remote-jobs?text=Javascript&page=3",
    "https://dynamitejobs.com/remote-jobs?text=Javascript&page=4",
    "https://dynamitejobs.com/remote-jobs?text=Golang&page=1",
    "https://dynamitejobs.com/remote-jobs?text=Golang&page=2",
    "https://himalayas.app/jobs/worldwide/python?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent",
    "https://himalayas.app/jobs/worldwide/python?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent&page=2",
    "https://himalayas.app/jobs/worldwide/python?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent&page=3",
    "https://himalayas.app/jobs/worldwide/javascript?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent",
    "https://himalayas.app/jobs/worldwide/javascript?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent&page=2",
    "https://himalayas.app/jobs/worldwide/javascript?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent&page=3",
    "https://himalayas.app/jobs/worldwide/golang?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent",
    "https://himalayas.app/jobs/worldwide/golang?type=full-time%2Cpart-time%2Ccontractor%2Ctemporary&experience=mid-level%2Csenior%2Cmanager&sort=recent&page=2",
    "https://remoters.net/jobs/software-development/filters?jobs-location=anywhere",
    "https://www.totaljobs.com/jobs/remote-python?sort=2&action=sort_publish",
    "https://www.totaljobs.com/jobs/remote-python?page=2&sort=2&action=sort_publish",
    "https://www.totaljobs.com/jobs/remote-python?page=3&sort=2&action=sort_publish",
    "https://www.totaljobs.com/jobs/remote-javascript?sort=2&action=sort_publish",
    "https://www.totaljobs.com/jobs/remote-javascript?page=2&sort=2&action=sort_publish",
    "https://www.totaljobs.com/jobs/remote-javascript?page=3&sort=2&action=sort_publish",
    "https://www.totaljobs.com/jobs/remote-golang?sort=2&action=sort_publish",
    "https://www.linkedin.com/jobs/collections/?f_WT=2",
    "https://www.linkedin.com/jobs/collections/?f_WT=2&start=24",
    "https://www.linkedin.com/jobs/collections/?f_WT=2&start=48",
    "https://www.linkedin.com/jobs/collections/?f_WT=2&start=72"
]


const repo = new Repo()

const urlProcs: Array<{ url: string, proc: ChildProcess }> = []
for (const url of URLS) {
    if (url.includes("vuejobs.com")) {
        const proc = await open(url)
        urlProcs.push({ url: url, proc: proc })
        repo.setScrapping(url, 1)
        console.log("Scrapping:", url)
    }
}


while (true) {
    if (!repo.scrappingInProgress()) break
    console.log("Still scrapping..")
    await new Promise((res, rej) => setTimeout(() => res(true), 1000))
}

console.log("Scrapping done!\nPress Ctrl+Shift+W to close all open tabs!")

// This doesn't work..
for (const urlProc of urlProcs) {
    console.log("Closing ", urlProc.url)
    urlProc.proc.kill()
}
