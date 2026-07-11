import { FlaskConical, MapPin, Users, Building2 } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { formatNumber } from '@/lib/utils'
import type { ClinicalTrial, TrialStatus } from '@/types'

const STATUS_TONE: Record<TrialStatus, 'green' | 'saffron' | 'navy' | 'neutral'> = {
  Recruiting: 'green',
  Ongoing: 'saffron',
  Completed: 'navy',
  'Not yet recruiting': 'neutral',
}

export function TrialCard({ trial }: { trial: ClinicalTrial }) {
  return (
    <article className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card transition-all hover:shadow-card-hover">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-chakra/10 px-2.5 py-1 text-xs font-medium text-chakra">
          <FlaskConical className="h-3.5 w-3.5" aria-hidden /> {trial.phase}
        </span>
        <Badge tone={STATUS_TONE[trial.status]}>{trial.status}</Badge>
        <Badge tone="outline">{trial.system}</Badge>
      </div>

      <h3 className="text-base font-semibold leading-snug text-navy">{trial.title}</h3>

      <p className="mt-1 font-mono text-xs text-slate-500">{trial.registrationId}</p>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Condition</dt>
          <dd className="text-slate-700">{trial.condition}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Intervention</dt>
          <dd className="text-slate-700">{trial.intervention}</dd>
        </div>
      </dl>

      <p className="mt-3 rounded-lg bg-navy-50/60 px-3 py-2 text-xs text-slate-600">
        <span className="font-semibold text-navy">Primary outcome:</span> {trial.primaryOutcome}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-navy/5 pt-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" aria-hidden /> {trial.sponsor}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" aria-hidden /> {trial.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Users className="h-3.5 w-3.5" aria-hidden /> {formatNumber(trial.participants)} participants
        </span>
      </div>
    </article>
  )
}
