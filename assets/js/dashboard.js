/**
 * THE SETUP - IMPROV & SKETCH COMEDY TRAINING SCHOOL
 * Student LMS Dashboard Interactive Engine
 * Section 5.9 Implementation
 */

(function () {
  'use strict';

  // Sample Student LMS Data
  const studentData = {
    name: 'Alex Rivera',
    studentId: 'STU-2026-8841',
    avatar: '../assets/images/student-avatar.webp',
    currentLevel: 'Level 2: Intermediate Scene Work & Emotion',
    progressPct: 68,
    classesEnrolled: 2,
    attendanceRate: '94%',
    nextShow: 'Friday Mainstage Jam — Oct 9 @ 8:00 PM',
    progressMilestones: [
      { level: 'Level 1: Foundations & "Yes, And"', status: 'Completed', pct: 100, date: 'Graduated Aug 2026' },
      { level: 'Level 2: Two-Person Scene Architecture', status: 'In Progress', pct: 75, date: 'Graduation Nov 2026' },
      { level: 'Level 3: Long-Form Harold & Formats', status: 'Next Up', pct: 0, date: 'Starts Jan 2027' },
      { level: 'Level 4: Mainstage Performance Troupe Prep', status: 'Locked', pct: 0, date: 'Audition Track' }
    ],
    upcomingClasses: [
      { day: 'Thursday', date: 'Oct 1', time: '7:00 PM - 9:30 PM', topic: 'Finding the "Game of the Scene"', room: 'Studio B (Upstairs)' },
      { day: 'Thursday', date: 'Oct 8', time: '7:00 PM - 9:30 PM', topic: 'Status Shifts & Emotional Stakes', room: 'Studio B (Upstairs)' },
      { day: 'Saturday', date: 'Oct 10', time: '2:00 PM - 5:00 PM', topic: 'Special Guest Musical Improv Jam', room: 'Mainstage Black Box' }
    ],
    availableLevels: [
      { id: 'lvl-1', title: 'Level 1: Foundations of Improv', fee: '$295', seats: '3 spots left', instructor: 'Marcus Vance' },
      { id: 'lvl-2', title: 'Level 2: Scene Work & Character', fee: '$325', seats: 'Enrolled', instructor: 'Sarah Jenkins', enrolled: true },
      { id: 'lvl-3', title: 'Level 3: The Harold Masterclass', fee: '$345', seats: 'Open Enrollment', instructor: 'David Cho' },
      { id: 'lvl-4', title: 'Level 4: Performance Ensemble', fee: '$395', seats: 'Prerequisite Required', instructor: 'Elena Rostova' }
    ],
    showcases: [
      { id: 'show-1', name: 'Friday Improv Cagematch Jam', date: 'Oct 9, 2026', callTime: '7:15 PM', status: 'Registered' },
      { id: 'show-2', name: 'The Midnight Sketch Revue Preview', date: 'Oct 23, 2026', callTime: '10:00 PM', status: 'Open Slot' },
      { id: 'show-3', name: 'Student Graduation Showcase: Term Fall', date: 'Nov 20, 2026', callTime: '6:30 PM', status: 'Open Slot' }
    ],
    invoices: [
      { id: 'INV-2026-104', date: 'Sep 1, 2026', description: 'Level 2: Scene Work Tuition (8 Weeks)', amount: '$325.00', status: 'Paid via Stripe (•••• 4242)' },
      { id: 'INV-2026-088', date: 'Jul 10, 2026', description: 'Level 1: Foundations of Improv', amount: '$295.00', status: 'Paid via PayPal' },
      { id: 'INV-2026-042', date: 'May 14, 2026', description: 'Weekend Musical Comedy Intensive', amount: '$150.00', status: 'Paid via Stripe (•••• 4242)' }
    ]
  };

  function initDashboard() {
    // Check if user is logged in
    if (!window.theatreAuth.isLoggedIn()) {
      // Auto-set session for demo convenience so direct visit works seamlessly, or simulate login
      window.theatreAuth.login('Alex Rivera');
    }

    // Mobile Hamburger Menu Sidebar Toggle
    const toggleBtn = document.getElementById('dashSidebarToggleBtn');
    const sidebar = document.getElementById('dashSidebar');
    const overlay = document.getElementById('dashSidebarOverlay');

    function toggleMobileSidebar(forceClose) {
      if (!sidebar) return;
      const isOpen = forceClose === true ? false : !sidebar.classList.contains('mobile-open');
      if (isOpen) {
        sidebar.classList.add('mobile-open');
        if (overlay) overlay.classList.add('active');
        if (toggleBtn) {
          const burger = toggleBtn.querySelector('.hamburger-icon');
          const closeIcon = toggleBtn.querySelector('.close-icon');
          if (burger) burger.style.display = 'none';
          if (closeIcon) closeIcon.style.display = 'block';
        }
      } else {
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
        if (toggleBtn) {
          const burger = toggleBtn.querySelector('.hamburger-icon');
          const closeIcon = toggleBtn.querySelector('.close-icon');
          if (burger) burger.style.display = 'block';
          if (closeIcon) closeIcon.style.display = 'none';
        }
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileSidebar();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        toggleMobileSidebar(true);
      });
    }

    // Tab Switching
    const tabBtns = document.querySelectorAll('.dash-tab-btn');
    const panels = document.querySelectorAll('.dash-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }

        // Auto close mobile menu on tab selection
        toggleMobileSidebar(true);
      });
    });

    // Logout Action
    const logoutBtn = document.getElementById('dashLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMobileSidebar(true);
        window.theatreAuth.logout();
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      });
    }

    // Simulate Dynamic Skeleton Loading (800ms shimmer before data population)
    renderSkeletons();
    setTimeout(() => {
      renderStudentData();
      if (window.theatreTilt && window.theatreTilt.refresh) {
        window.theatreTilt.refresh();
      }
    }, 750);
  }

  function renderSkeletons() {
    const statsContainer = document.getElementById('dashStatsContainer');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="theatre-card"><div class="skeleton skeleton-box"></div><div class="skeleton skeleton-text"></div></div>
        <div class="theatre-card"><div class="skeleton skeleton-box"></div><div class="skeleton skeleton-text"></div></div>
        <div class="theatre-card"><div class="skeleton skeleton-box"></div><div class="skeleton skeleton-text"></div></div>
        <div class="theatre-card"><div class="skeleton skeleton-box"></div><div class="skeleton skeleton-text"></div></div>
      `;
    }
  }

  function renderStudentData() {
    // 1. Overview Stats
    const statsContainer = document.getElementById('dashStatsContainer');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="theatre-card" style="padding: 24px;">
          <div class="card-icon-wrap gold">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div class="card-subtitle">Current Track</div>
          <h3 class="card-title" style="font-size: 1.15rem;">Level 2 Scene Work</h3>
          <p class="card-description">Thursday Evenings @ 7:00 PM</p>
        </div>

        <div class="theatre-card" style="padding: 24px;">
          <div class="card-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="card-subtitle">Graduation Progress</div>
          <h3 class="card-title" style="font-size: 1.6rem; color: var(--spotlight-gold);">${studentData.progressPct}%</h3>
          <p class="card-description">6 of 8 Classes Attended</p>
        </div>

        <div class="theatre-card" style="padding: 24px;">
          <div class="card-icon-wrap gold">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div class="card-subtitle">Next Showcase</div>
          <h3 class="card-title" style="font-size: 1.1rem;">Oct 9 @ 8:00 PM</h3>
          <p class="card-description">Friday Improv Cagematch</p>
        </div>

        <div class="theatre-card" style="padding: 24px;">
          <div class="card-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="card-subtitle">Tuition Status</div>
          <h3 class="card-title" style="font-size: 1.2rem; color: #2ecc71;">Current & Paid</h3>
          <p class="card-description">Next Billing: Nov 15</p>
        </div>
      `;
    }

    // 2. Course Progression Tracker
    const progressContainer = document.getElementById('dashProgressionTrack');
    if (progressContainer) {
      let html = `<div class="progress-steps-row">`;
      studentData.progressMilestones.forEach((m, idx) => {
        const isDone = m.pct === 100;
        const isInProgress = m.pct > 0 && m.pct < 100;
        const statusClass = isDone ? 'completed' : (isInProgress ? 'active' : 'locked');
        const badgeColor = isDone ? '#2ecc71' : (isInProgress ? 'var(--spotlight-gold)' : 'var(--text-muted)');

        html += `
          <div class="progress-node ${statusClass}">
            <div style="font-size: 0.75rem; font-weight: 700; color: ${badgeColor}; text-transform: uppercase;">
              ${m.status}
            </div>
            <h4 style="font-size: 1rem; margin: 8px 0;">${m.level}</h4>
            <div style="font-size: 0.82rem; color: var(--marquee-cream-muted);">${m.date}</div>
            <div class="progress-bar-fill">
              <span style="width: ${m.pct}%;"></span>
            </div>
          </div>
        `;
      });
      html += `</div>`;
      progressContainer.innerHTML = html;
    }

    const progressionDetails = document.getElementById('dashProgressionDetails');
    if (progressionDetails) {
      progressionDetails.innerHTML = `
        <div class="card-grid grid-3" style="margin-top: 24px;">
          <div class="theatre-card dark-style" style="align-items: stretch; text-align: left;">
            <div class="card-subtitle">Attendance & Credit Log</div>
            <h3 class="card-title" style="font-size: 1.25rem;">94% Attendance Rate</h3>
            <p class="card-description" style="margin-bottom: 16px;">6 of 8 Level 2 sessions completed. 75% attendance mandatory for graduation certificate.</p>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-size: 0.88rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span>Session Attendance</span>
                <span style="color: #2ecc71; font-weight: 700;">6 / 8 Classes</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Absences Allowed</span>
                <span style="color: var(--spotlight-gold); font-weight: 700;">1 Remaining</span>
              </div>
            </div>
          </div>

          <div class="theatre-card dark-style" style="align-items: stretch; text-align: left;">
            <div class="card-subtitle">Curriculum Skills Mastery</div>
            <h3 class="card-title" style="font-size: 1.25rem;">Key Competencies</h3>
            <ul style="list-style: none; padding: 0; margin: 12px 0 0 0; font-size: 0.9rem; line-height: 1.8;">
              <li style="color: #2ecc71;">✓ Active Listening & Agreement ("Yes, And")</li>
              <li style="color: #2ecc71;">✓ Object Work & Spatial Awareness</li>
              <li style="color: var(--spotlight-gold);">⟳ Emotional Stakes & Status Shifts (In Progress)</li>
              <li style="color: var(--marquee-cream-muted);">○ Group Games & Tagouts (Level 3)</li>
            </ul>
          </div>

          <div class="theatre-card dark-style" style="align-items: stretch; text-align: left;">
            <div class="card-subtitle">Instructor Assessment</div>
            <h3 class="card-title" style="font-size: 1.25rem;">Sarah Jenkins' Feedback</h3>
            <blockquote style="font-style: italic; font-size: 0.88rem; color: var(--marquee-cream-muted); border-left: 3px solid var(--spotlight-gold); padding-left: 12px; margin: 12px 0;">
              "Alex shows great natural commitment to grounded scene partners. Work on initiating scenes with clearer physical choices!"
            </blockquote>
            <span class="btn btn-sm btn-outline-gold" style="display: inline-block; text-align: center; margin-top: 8px;">View Full Feedback Log</span>
          </div>
        </div>
      `;
    }

    // 3. Class Enrollment Catalog
    const catalogContainer = document.getElementById('dashCatalogContainer');
    if (catalogContainer) {
      let catalogHtml = `<div class="card-grid grid-4">`;
      studentData.availableLevels.forEach(lvl => {
        const btnHtml = lvl.enrolled 
          ? `<button class="btn btn-sm btn-outline-gold" disabled style="opacity: 0.8;">Currently Enrolled</button>`
          : `<button class="btn btn-sm btn-gold enroll-btn" data-title="${lvl.title}">Enroll Now (${lvl.fee})</button>`;

        catalogHtml += `
          <div class="theatre-card dark-style">
            <div class="card-badge">${lvl.fee}</div>
            <div class="card-icon-wrap gold" style="margin-top: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <h3 class="card-title" style="font-size: 1.15rem;">${lvl.title}</h3>
            <div class="card-subtitle">Instructor: ${lvl.instructor}</div>
            <p class="card-description">${lvl.seats}</p>
            <div class="card-footer">${btnHtml}</div>
          </div>
        `;
      });
      catalogHtml += `</div>`;
      catalogContainer.innerHTML = catalogHtml;

      // Bind enroll buttons
      catalogContainer.querySelectorAll('.enroll-btn').forEach(b => {
        b.addEventListener('click', () => {
          b.textContent = 'Enrolled!';
          b.disabled = true;
          b.classList.remove('btn-gold');
          b.classList.add('btn-outline-gold');
        });
      });
    }

    // 4. Showcase Registration
    const showcaseContainer = document.getElementById('dashShowcaseContainer');
    if (showcaseContainer) {
      let showHtml = `<div class="card-grid grid-3">`;
      studentData.showcases.forEach(s => {
        const isReg = s.status === 'Registered';
        const actionBtn = isReg 
          ? `<span class="btn btn-sm btn-outline-gold" style="color: #2ecc71; border-color: #2ecc71;">✓ Reserved Slot</span>`
          : `<button class="btn btn-sm btn-primary rsvp-btn" data-name="${s.name}">Claim Performer Slot</button>`;

        showHtml += `
          <div class="theatre-card dark-style">
            <div class="card-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 class="card-title" style="font-size: 1.18rem;">${s.name}</h3>
            <div class="card-subtitle">${s.date}</div>
            <p class="card-description">Call Time: ${s.callTime} • Mainstage Black Box</p>
            <div class="card-footer">${actionBtn}</div>
          </div>
        `;
      });
      showHtml += `</div>`;
      showcaseContainer.innerHTML = showHtml;

      showcaseContainer.querySelectorAll('.rsvp-btn').forEach(b => {
        b.addEventListener('click', () => {
          b.outerHTML = `<span class="btn btn-sm btn-outline-gold" style="color: #2ecc71; border-color: #2ecc71;">✓ Reserved Slot</span>`;
        });
      });
    }

    // 5. Schedule Table / Calendar
    const scheduleContainer = document.getElementById('dashScheduleContainer');
    if (scheduleContainer) {
      scheduleContainer.innerHTML = `
        <div class="table-responsive">
          <table class="theatre-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Time (ET)</th>
                <th>Workshop Topic</th>
                <th>Location</th>
                <th>Preparation</th>
              </tr>
            </thead>
            <tbody>
              ${studentData.upcomingClasses.map(c => `
                <tr>
                  <td data-label="Day"><strong>${c.day}</strong></td>
                  <td data-label="Date">${c.date}</td>
                  <td data-label="Time">${c.time}</td>
                  <td data-label="Topic">${c.topic}</td>
                  <td data-label="Location">${c.room}</td>
                  <td data-label="Preparation"><span style="color: var(--spotlight-gold); font-size: 0.85rem;">Bring rehearsal notebook</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // 6. Payments & Invoices
    const billingContainer = document.getElementById('dashBillingContainer');
    if (billingContainer) {
      billingContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
          <div class="theatre-card dark-style">
            <h3 class="card-title" style="font-size: 1.2rem;">Payment Method</h3>
            <p class="card-description">Visa ending in •••• 4242 (Expires 08/28)</p>
            <div class="card-footer" style="flex-direction: row; gap: 12px;">
              <button class="btn btn-sm btn-outline-gold">Update Card</button>
              <button class="btn btn-sm btn-outline">Add PayPal</button>
            </div>
          </div>
          <div class="theatre-card dark-style">
            <h3 class="card-title" style="font-size: 1.2rem;">Tuition Assistance</h3>
            <p class="card-description">Need work-study or installment plans?</p>
            <div class="card-footer">
              <a href="contact.html" class="btn btn-sm btn-primary">Apply for Work-Study</a>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="theatre-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              ${studentData.invoices.map(inv => `
                <tr>
                  <td data-label="Invoice"><strong>${inv.id}</strong></td>
                  <td data-label="Date">${inv.date}</td>
                  <td data-label="Description">${inv.description}</td>
                  <td data-label="Amount" style="color: var(--spotlight-gold); font-weight: 700;">${inv.amount}</td>
                  <td data-label="Method">${inv.status}</td>
                  <td data-label="Receipt">
                    <button class="btn btn-sm btn-outline-gold">PDF</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', initDashboard);
})();
