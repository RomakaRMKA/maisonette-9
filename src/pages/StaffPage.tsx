import StaffMember from './StaffMember'
import './StaffPage.css'
import hostsMembers from '../data/hosts.json'
import staffMembers from '../data/staff.json'

const staffPortraits = import.meta.glob('../assets/staff/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolvePortraitPath(rawPortraitPath: string): string {
  const fileName = rawPortraitPath.split('/').pop()

  if (!fileName) {
    return rawPortraitPath
  }

  return staffPortraits[`../assets/staff/${fileName}`] ?? rawPortraitPath
}

function StaffPage() {
  return (
    <section className="content-panel" id="staff">
      <h1 style={{ textAlign: "center", margin: "3rem" }}>Hosts</h1>
      <div className="staff-grid" id="staff-hosts">
        {hostsMembers.map((member) => (
          <StaffMember
            key={member.id}
            portrait={resolvePortraitPath(member.portrait)}
            name={member.name}
            job={member.job}
            tags={member.tags}
          />
        ))}
      </div>
      <h1 style={{ textAlign: "center", margin: "3rem" }}>Staff Members</h1>
      <div className="staff-grid" id="staff-staff">
        {staffMembers.map((member) => (
          <StaffMember
            key={member.id}
            portrait={resolvePortraitPath(member.portrait)}
            name={member.name}
            job={member.job}
            tags={member.tags}
          />
        ))}
      </div>
    </section>
  )
}

export default StaffPage
