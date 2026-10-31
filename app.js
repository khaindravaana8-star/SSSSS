/**
 * მარელიანი (Mareli Confectionery) - Main Interactive Logic
 * Sweet customizer, mobile burger navigation, live visual builder, and checkout
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MOBILE BURGER MENU LOGIC
  // ==========================================
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const closeMenuBtn = document.getElementById('close-menu-btn');

  function openMobileMenu() {
    burgerBtn.classList.add('active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.remove('hidden');
    // Force reflow for smooth transition
    void mobileMenu.offsetWidth;
    mobileBackdrop.classList.remove('opacity-0');
    mobileBackdrop.classList.add('opacity-100');
    mobileDrawer.classList.remove('translate-x-full');
    mobileDrawer.classList.add('translate-x-0');
    document.body.classList.add('overflow-hidden');
  }

  function closeMobileMenu() {
    burgerBtn.classList.remove('active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileBackdrop.classList.remove('opacity-100');
    mobileBackdrop.classList.add('opacity-0');
    mobileDrawer.classList.remove('translate-x-0');
    mobileDrawer.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerBtn && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });

  // ==========================================
  // 2. SWEET CUSTOMIZER STATE & DATA
  // ==========================================
  const sweetData = {
    types: {
      cake: {
        id: 'cake',
        name: 'ტორტი',
        title: 'სადღესასწაულო & ბენტო ტორტი',
        basePrice: 65,
        defaultTiers: 2,
        icon: '🎂',
        unitLabel: 'იარუსი'
      },
      cookie: {
        id: 'cookie',
        name: 'ორცხობილა',
        title: 'ხელნაკეთი ორცხობილების & მაკარონების ნაკრები',
        basePrice: 35,
        defaultTiers: 1,
        icon: '🍪',
        unitLabel: 'ცალი'
      },
      pastry: {
        id: 'pastry',
        name: 'ნამცხვარი',
        title: 'ფრანგული ნამცხვრები & ეკლერები',
        basePrice: 24,
        defaultTiers: 1,
        icon: '🧁',
        unitLabel: 'ცალი'
      }
    },
    fillings: {
      chocolate_ganache: {
        name: 'ბელგიური შოკოლადის განაში',
        desc: '70% მუქი შოკოლადი და ნაღები',
        price: 8,
        color: '#3E2723'
      },
      vanilla_cream: {
        name: 'მადაგასკარის ვანილის კრემ-ბრიულე',
        desc: 'ნაზი ვანილის ექსტრაქტი და ნაღები',
        price: 6,
        color: '#FFFDD0'
      },
      forest_berries: {
        name: 'ტყის კენკრის კული (ჟოლო & მაყვალი)',
        desc: 'ცოცხალი კენკრის მჟავე-ტკბილი ბალანსი',
        price: 9,
        color: '#9E1B32'
      },
      salted_caramel: {
        name: 'დამარილებული კარამელი & მოხალული თხილი',
        desc: 'ხელნაკეთი კარამელი და ხრაშუნა თხილი',
        price: 10,
        color: '#C67D34'
      },
      pistachio: {
        name: 'სიცილიური ფისტის კრემი',
        desc: 'ნამდვილი მწვანე ფისტა და თეთრი შოკოლადი',
        price: 12,
        color: '#93C572'
      },
      mango_passion: {
        name: 'მანგო & მარაკუიას ეგზოტიკური მუსი',
        desc: 'ტროპიკული ხილის მსუბუქი სინაზე',
        price: 10,
        color: '#FFB347'
      }
    },
    bases: {
      vanilla: { name: 'კლასიკური ვანილის ბისკვიტი', price: 0 },
      chocolate: { name: 'შოკოლადის ფაჯ ბრაუნი', price: 5 },
      red_velvet: { name: 'წითელი ხავერდი (Red Velvet)', price: 7 },
      honey: { name: 'თაფლისა და ნიგვზის ფირფიტები', price: 6 }
    },
    colors: {
      blue: {
        id: 'blue',
        name: 'სამეფო ლურჯი',
        hex: '#1E3A8A',
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #0F2042 100%)',
        textColor: '#FFFFFF'
      },
      white: {
        id: 'white',
        name: 'ნაღების თეთრი',
        hex: '#FAF8F5',
        gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
        textColor: '#1E293B'
      },
      brown: {
        id: 'brown',
        name: 'მუქი შოკოლადისფერი',
        hex: '#3E2723',
        gradient: 'linear-gradient(135deg, #4E342E 0%, #2A170F 100%)',
        textColor: '#FFF'
      },
      sky: {
        id: 'sky',
        name: 'პასტელური ცისფერი',
        hex: '#7DD3FC',
        gradient: 'linear-gradient(135deg, #BAE6FD 0%, #38BDF8 100%)',
        textColor: '#0C4A6E'
      },
      caramel: {
        id: 'caramel',
        name: 'თაფლისფერი კარამელი',
        hex: '#D97706',
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
        textColor: '#FFFFFF'
      }
    },
    toppings: {
      berries: { name: 'ცოცხალი მარწყვი და ჟოლო', price: 10, icon: '🍓' },
      chocolate_drip: { name: 'შოკოლადის წვეთები & ფილები', price: 7, icon: '🍫' },
      gold_leaf: { name: 'საკვები 24k ოქროს ფურცლები', price: 14, icon: '✨' },
      macarons: { name: 'მინი ფრანგული მაკარონები (3 ც)', price: 12, icon: '🧁' },
      hazelnut: { name: 'მოხალული ფისტა & თხილი', price: 8, icon: '🌰' }
    },
    sizes: {
      small: { name: 'სტანდარტული (6-8 ნაჭერი)', multiplier: 1, label: 'კომპაქტური' },
      medium: { name: 'საშუალო (10-14 ნაჭერი)', multiplier: 1.35, label: 'პოპულარული' },
      large: { name: 'დიდი საზეიმო (16-22 ნაჭერი)', multiplier: 1.75, label: 'საზეიმო' }
    }
  };

  // State object
  const state = {
    type: 'cake',
    base: 'vanilla',
    filling: 'chocolate_ganache',
    color: 'blue',
    size: 'small',
    tierCount: 2,
    toppings: new Set(['berries', 'chocolate_drip']),
    inscription: 'გილოცავ!',
    customNotes: ''
  };

  // ==========================================
  // 3. UI ELEMENT REFERENCES
  // ==========================================
  const previewCanvas = document.getElementById('sweet-visual-canvas');
  const previewTypeName = document.getElementById('preview-type-name');
  const previewFillingName = document.getElementById('preview-filling-name');
  const previewPriceDisplay = document.getElementById('preview-price-display');
  const previewBadge = document.getElementById('preview-badge');
  const customInscriptionInput = document.getElementById('custom-inscription-input');

  // Checkout references
  const checkoutSummaryType = document.getElementById('summary-sweet-type');
  const checkoutSummaryFilling = document.getElementById('summary-sweet-filling');
  const checkoutSummaryBase = document.getElementById('summary-sweet-base');
  const checkoutSummaryDesign = document.getElementById('summary-sweet-design');
  const checkoutSummaryToppings = document.getElementById('summary-sweet-toppings');
  const checkoutSummaryInscription = document.getElementById('summary-sweet-inscription');
  const checkoutTotalPrice = document.getElementById('summary-total-price');
  const checkoutSubmitBtn = document.getElementById('checkout-submit-btn');
  const orderForm = document.getElementById('order-form');

  // Success Modal references
  const successModal = document.getElementById('order-success-modal');
  const modalOrderCode = document.getElementById('modal-order-code');
  const modalRecipientName = document.getElementById('modal-recipient-name');
  const modalPhone = document.getElementById('modal-phone');
  const modalAddress = document.getElementById('modal-address');
  const modalSweetSummary = document.getElementById('modal-sweet-summary');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // ==========================================
  // 4. PRICE CALCULATOR
  // ==========================================
  function calculateTotal() {
    const currentType = sweetData.types[state.type];
    const currentFilling = sweetData.fillings[state.filling];
    const currentBase = sweetData.bases[state.base];
    const currentSize = sweetData.sizes[state.size];

    let base = currentType.basePrice;
    let fillingCost = currentFilling ? currentFilling.price : 0;
    let baseCost = currentBase ? currentBase.price : 0;

    let toppingsCost = 0;
    state.toppings.forEach(tKey => {
      if (sweetData.toppings[tKey]) {
        toppingsCost += sweetData.toppings[tKey].price;
      }
    });

    // Tier factor
    let tierBonus = (state.tierCount - 1) * 18;
    if (state.type !== 'cake') tierBonus = 0;

    const subtotal = (base + fillingCost + baseCost + tierBonus) * currentSize.multiplier + toppingsCost;
    return Math.round(subtotal);
  }

  // ==========================================
  // 5. RENDER VISUAL SWEET PREVIEW
  // ==========================================
  function renderSweetVisual() {
    if (!previewCanvas) return;

    const colorConfig = sweetData.colors[state.color];
    const fillingConfig = sweetData.fillings[state.filling];
    const total = calculateTotal();

    // Update text labels
    if (previewTypeName) {
      previewTypeName.textContent = `${sweetData.types[state.type].name} • ${sweetData.bases[state.base].name}`;
    }
    if (previewFillingName) {
      previewFillingName.textContent = fillingConfig.name;
    }
    if (previewPriceDisplay) {
      previewPriceDisplay.textContent = `${total} ₾`;
    }
    if (previewBadge) {
      previewBadge.textContent = sweetData.types[state.type].title;
    }

    // Dynamic Graphic Generation based on Type (Cake vs Cookie vs Pastry)
    let visualHtml = '';

    if (state.type === 'cake') {
      // Cake visualization with tiers, drips, inscription, and toppings
      const tiers = state.tierCount;
      const tierWidths = tiers === 3 ? [220, 170, 120] : tiers === 2 ? [210, 150] : [210];
      const tierHeights = tiers === 3 ? [65, 60, 55] : tiers === 2 ? [75, 70] : [90];

      // Build SVG / CSS Cake
      visualHtml += `
        <div class="relative flex flex-col items-center justify-end pb-4 transition-all duration-500" style="min-height: 260px;">
          <!-- Top Decorations -->
          <div class="flex items-center justify-center gap-2 mb-[-8px] z-30 transition-all duration-300 transform scale-100 hover:scale-105">
            ${state.toppings.has('berries') ? `<span class="text-2xl filter drop-shadow animate-bounce" style="animation-duration: 2.2s;">🍓</span><span class="text-xl">🫐</span>` : ''}
            ${state.toppings.has('gold_leaf') ? `<span class="text-xl text-amber-300 animate-pulse">✨</span>` : ''}
            ${state.toppings.has('macarons') ? `<span class="text-xl">🧁</span><span class="text-lg">🍪</span>` : ''}
            ${state.toppings.has('hazelnut') ? `<span class="text-lg">🌰</span>` : ''}
          </div>

          <!-- Tiers Container (Rendered Top-to-Bottom) -->
          <div class="flex flex-col items-center">
      `;

      // Render tiers from top to bottom
      for (let i = tiers - 1; i >= 0; i--) {
        const w = tierWidths[tiers - 1 - i];
        const h = tierHeights[tiers - 1 - i];
        const isTop = (i === tiers - 1);
        const isBottom = (i === 0);

        visualHtml += `
          <div class="sweet-tier relative rounded-2xl flex items-center justify-center transition-all duration-500 my-[2px] shadow-lg"
               style="width: ${w}px; height: ${h}px; background: ${colorConfig.gradient}; border: 2px solid rgba(255,255,255,0.25);">
            
            ${state.toppings.has('chocolate_drip') ? `
              <div class="absolute top-0 left-0 right-0 h-4 bg-amber-950/80 rounded-t-xl rounded-b-lg flex justify-around overflow-hidden shadow-inner">
                <span class="w-3 h-3 bg-amber-950 rounded-full inline-block mt-1"></span>
                <span class="w-4 h-4 bg-amber-950 rounded-full inline-block mt-0.5"></span>
                <span class="w-3 h-3 bg-amber-950 rounded-full inline-block mt-1"></span>
                <span class="w-5 h-5 bg-amber-950 rounded-full inline-block"></span>
                <span class="w-3 h-3 bg-amber-950 rounded-full inline-block mt-1"></span>
              </div>
            ` : ''}

            <!-- Center Filling Layer Accent Line -->
            <div class="absolute inset-x-2 top-1/2 h-1.5 -translate-y-1/2 rounded-full opacity-60 shadow-sm"
                 style="background-color: ${fillingConfig.color};" title="${fillingConfig.name}"></div>

            ${isTop && state.inscription ? `
              <div class="relative z-20 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-xs font-bold tracking-wide text-slate-800 border border-amber-200/50 max-w-[85%] truncate">
                ${state.inscription}
              </div>
            ` : ''}

            ${state.toppings.has('gold_leaf') ? `
              <div class="absolute bottom-2 right-4 text-xs opacity-90 animate-pulse">✨</div>
              <div class="absolute top-3 left-4 text-xs opacity-90 animate-pulse" style="animation-delay: 0.5s;">✨</div>
            ` : ''}
          </div>
        `;
      }

      visualHtml += `
          </div>

          <!-- Stand Base -->
          <div class="w-64 h-4 cake-stand-base mt-1 relative z-10 flex items-center justify-center">
            <div class="w-24 h-6 bg-slate-300 rounded-b-xl shadow-md -mb-4"></div>
          </div>
          <div class="w-32 h-2.5 bg-slate-400/80 rounded-full mt-3 shadow-inner"></div>
        </div>
      `;

    } else if (state.type === 'cookie') {
      // Cookie set visualizer
      visualHtml += `
        <div class="relative flex flex-col items-center justify-center py-6 transition-all duration-500" style="min-height: 260px;">
          <div class="relative w-64 h-56 bg-amber-50 rounded-3xl p-4 shadow-xl border-4 border-amber-900/20 flex flex-wrap items-center justify-center gap-3">
            
            <!-- Cookie 1 -->
            <div class="relative w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105"
                 style="background: ${colorConfig.gradient}; border: 2px dashed rgba(255,255,255,0.4);">
              <span class="text-2xl">${sweetData.toppings.berries ? '🍓' : '🍪'}</span>
              ${state.inscription ? `<span class="text-[9px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded-full mt-1 max-w-[80%] truncate">${state.inscription}</span>` : ''}
              ${state.toppings.has('chocolate_drip') ? `<div class="absolute top-1 right-2 text-xs">🍫</div>` : ''}
            </div>

            <!-- Cookie 2 -->
            <div class="relative w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105"
                 style="background: ${colorConfig.gradient}; border: 2px dashed rgba(255,255,255,0.4);">
              <span class="text-2xl">🍪</span>
              <div class="w-12 h-1 rounded-full mt-1" style="background-color: ${fillingConfig.color};"></div>
              ${state.toppings.has('gold_leaf') ? `<span class="absolute top-2 left-2 text-xs">✨</span>` : ''}
            </div>

            <!-- Cookie 3 & 4 (Stack) -->
            <div class="relative w-20 h-20 rounded-full flex items-center justify-center shadow-md bg-amber-100 border border-amber-300">
              <span class="text-xl">🧁</span>
            </div>
            <div class="relative w-20 h-20 rounded-full flex items-center justify-center shadow-md bg-amber-900 text-white font-bold text-xs">
              +${state.tierCount * 4} ცალი
            </div>
          </div>
          <span class="mt-3 text-xs text-slate-500 font-medium">ხელნაკეთი ორცხობილების პრემიუმ ყუთი</span>
        </div>
      `;

    } else {
      // Pastry / Cupcake visualizer
      visualHtml += `
        <div class="relative flex flex-col items-center justify-center py-6 transition-all duration-500" style="min-height: 260px;">
          <!-- Pastry Top Cream Swirl -->
          <div class="relative z-20 w-36 h-28 rounded-t-full flex flex-col items-center justify-center shadow-md transition-transform hover:scale-105"
               style="background: ${colorConfig.gradient}; border: 3px solid rgba(255,255,255,0.3);">
            
            <div class="flex items-center gap-1.5 mb-1">
              ${state.toppings.has('berries') ? `<span class="text-2xl">🍓</span>` : '<span class="text-xl">🍒</span>'}
              ${state.toppings.has('gold_leaf') ? `<span class="text-sm">✨</span>` : ''}
            </div>

            ${state.inscription ? `
              <div class="px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-bold text-slate-800 shadow max-w-[85%] truncate">
                ${state.inscription}
              </div>
            ` : ''}

            <!-- Filling core glimpse -->
            <div class="w-14 h-2 rounded-full mt-2 shadow-inner" style="background-color: ${fillingConfig.color};"></div>
          </div>

          <!-- Pastry Cup / Basket Base -->
          <div class="relative z-10 w-44 h-24 bg-gradient-to-b from-amber-700 to-amber-950 rounded-b-3xl shadow-xl border-t-2 border-amber-900 flex items-center justify-center">
            <span class="text-xs font-semibold text-amber-100 tracking-wider uppercase">Mareli Pastry</span>
            ${state.toppings.has('hazelnut') ? `<span class="absolute right-3 top-2 text-xs">🌰</span>` : ''}
          </div>

          <!-- Porcelain Saucer -->
          <div class="w-56 h-4 bg-slate-200 rounded-full mt-1 shadow-md border-b-2 border-slate-300"></div>
          <span class="mt-3 text-xs text-slate-500 font-medium">საფირმო ფრანგული ნამცხვარი</span>
        </div>
      `;
    }

    previewCanvas.innerHTML = visualHtml;

    // Synchronize Checkout Order Summary
    updateCheckoutSummary();
  }

  // ==========================================
  // 6. SYNCHRONIZE CHECKOUT SUMMARY
  // ==========================================
  function updateCheckoutSummary() {
    const total = calculateTotal();
    const typeObj = sweetData.types[state.type];
    const fillingObj = sweetData.fillings[state.filling];
    const baseObj = sweetData.bases[state.base];
    const colorObj = sweetData.colors[state.color];

    if (checkoutSummaryType) {
      checkoutSummaryType.textContent = `${typeObj.name} (${sweetData.sizes[state.size].name})`;
    }
    if (checkoutSummaryFilling) {
      checkoutSummaryFilling.textContent = fillingObj.name;
    }
    if (checkoutSummaryBase) {
      checkoutSummaryBase.textContent = baseObj.name;
    }
    if (checkoutSummaryDesign) {
      checkoutSummaryDesign.textContent = `${colorObj.name} • ${state.tierCount} ${typeObj.unitLabel}`;
    }
    if (checkoutSummaryToppings) {
      if (state.toppings.size === 0) {
        checkoutSummaryToppings.textContent = 'დეკორაციის გარეშე';
      } else {
        const topNames = Array.from(state.toppings).map(t => sweetData.toppings[t]?.name).filter(Boolean);
        checkoutSummaryToppings.textContent = topNames.join(', ');
      }
    }
    if (checkoutSummaryInscription) {
      checkoutSummaryInscription.textContent = state.inscription ? `"${state.inscription}"` : 'წარწერის გარეშე';
    }
    if (checkoutTotalPrice) {
      checkoutTotalPrice.textContent = `${total} ₾`;
    }
    if (checkoutSubmitBtn) {
      checkoutSubmitBtn.textContent = `შეკვეთის დადასტურება (${total} ₾)`;
    }
  }

  // ==========================================
  // 7. EVENT LISTENERS FOR CONTROLS
  // ==========================================

  // Sweet Type Radio Cards
  const typeCards = document.querySelectorAll('.sweet-type-card');
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedType = card.getAttribute('data-type');
      if (!selectedType || !sweetData.types[selectedType]) return;

      typeCards.forEach(c => {
        c.classList.remove('border-blue-600', 'bg-blue-50/60', 'ring-2', 'ring-blue-500');
        c.classList.add('border-slate-200');
        const badge = c.querySelector('.check-indicator');
        if (badge) badge.classList.add('hidden');
      });

      card.classList.remove('border-slate-200');
      card.classList.add('border-blue-600', 'bg-blue-50/60', 'ring-2', 'ring-blue-500');
      const badge = card.querySelector('.check-indicator');
      if (badge) badge.classList.remove('hidden');

      state.type = selectedType;
      state.tierCount = sweetData.types[selectedType].defaultTiers;

      // Adjust tier selector visibility for non-cakes
      const tierSelectorContainer = document.getElementById('tier-selector-container');
      const tierSelectorLabel = document.getElementById('tier-selector-label');
      if (tierSelectorContainer && tierSelectorLabel) {
        if (selectedType === 'cake') {
          tierSelectorLabel.textContent = 'იარუსების რაოდენობა:';
        } else {
          tierSelectorLabel.textContent = 'ნაკრების მოცულობა:';
        }
      }

      renderSweetVisual();
    });
  });

  // Base / Sponge Chooser
  const baseCards = document.querySelectorAll('.sweet-base-card');
  baseCards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedBase = card.getAttribute('data-base');
      if (!selectedBase || !sweetData.bases[selectedBase]) return;

      baseCards.forEach(c => {
        c.classList.remove('border-amber-700', 'bg-amber-50/70', 'ring-2', 'ring-amber-600');
        c.classList.add('border-slate-200');
      });

      card.classList.remove('border-slate-200');
      card.classList.add('border-amber-700', 'bg-amber-50/70', 'ring-2', 'ring-amber-600');

      state.base = selectedBase;
      renderSweetVisual();
    });
  });

  // Filling Chooser
  const fillingCards = document.querySelectorAll('.sweet-filling-card');
  fillingCards.forEach(card => {
    card.addEventListener('click', () => {
      const fillingId = card.getAttribute('data-filling');
      if (!fillingId || !sweetData.fillings[fillingId]) return;

      fillingCards.forEach(c => {
        c.classList.remove('border-blue-600', 'bg-blue-50/70', 'ring-2', 'ring-blue-500');
        c.classList.add('border-slate-200');
      });

      card.classList.remove('border-slate-200');
      card.classList.add('border-blue-600', 'bg-blue-50/70', 'ring-2', 'ring-blue-500');

      state.filling = fillingId;
      renderSweetVisual();
    });
  });

  // Color Swatches
  const colorSwatches = document.querySelectorAll('.color-swatch-btn');
  colorSwatches.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedColor = btn.getAttribute('data-color');
      if (!selectedColor || !sweetData.colors[selectedColor]) return;

      colorSwatches.forEach(b => {
        b.classList.remove('ring-4', 'ring-blue-500', 'scale-110');
      });

      btn.classList.add('ring-4', 'ring-blue-500', 'scale-110');
      state.color = selectedColor;
      renderSweetVisual();
    });
  });

  // Tier Selector Buttons
  const tierBtns = document.querySelectorAll('.tier-select-btn');
  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.getAttribute('data-tier'), 10);
      if (isNaN(count)) return;

      tierBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      });

      btn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');

      state.tierCount = count;
      renderSweetVisual();
    });
  });

  // Size Selector Radio
  const sizeRadios = document.querySelectorAll('input[name="sweet-size"]');
  sizeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.size = e.target.value;
      renderSweetVisual();
    });
  });

  // Topping Checkboxes
  const toppingCheckboxes = document.querySelectorAll('.topping-checkbox');
  toppingCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const toppingKey = cb.value;
      if (cb.checked) {
        state.toppings.add(toppingKey);
      } else {
        state.toppings.delete(toppingKey);
      }
      renderSweetVisual();
    });
  });

  // Inscription Input
  if (customInscriptionInput) {
    customInscriptionInput.addEventListener('input', (e) => {
      state.inscription = e.target.value.trim();
      renderSweetVisual();
    });
  }

  // Quick Inscription Preset Pills
  const presetPills = document.querySelectorAll('.preset-text-pill');
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const txt = pill.getAttribute('data-text') || pill.textContent.trim();
      if (customInscriptionInput) {
        customInscriptionInput.value = txt;
      }
      state.inscription = txt;
      renderSweetVisual();
    });
  });

  // Scroll to Order CTA button
  const goToOrderBtn = document.getElementById('go-to-order-btn');
  if (goToOrderBtn) {
    goToOrderBtn.addEventListener('click', () => {
      const orderSection = document.getElementById('order-section');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================
  // 8. ORDER & CHECKOUT FORM SUBMISSION
  // ==========================================
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('order-name');
      const phoneInput = document.getElementById('order-phone');
      const citySelect = document.getElementById('order-city');
      const addressInput = document.getElementById('order-address');
      const deliveryDate = document.getElementById('order-date');
      const notesInput = document.getElementById('order-notes');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const cityVal = citySelect ? citySelect.value : 'თბილისი';
      const addressVal = addressInput ? addressInput.value.trim() : '';
      const notesVal = notesInput ? notesInput.value.trim() : '';

      if (!nameVal || !phoneVal || !addressVal) {
        alert('გთხოვთ შეავსოთ სავალდებულო ველები: სახელი, ტელეფონის ნომერი და მისამართი.');
        return;
      }

      // Generate random realistic Order ID
      const orderId = 'MR-' + Math.floor(10000 + Math.random() * 90000);
      const totalCost = calculateTotal();

      // Populate Success Modal
      if (modalOrderCode) modalOrderCode.textContent = `#${orderId}`;
      if (modalRecipientName) modalRecipientName.textContent = nameVal;
      if (modalPhone) modalPhone.textContent = phoneVal;
      if (modalAddress) modalAddress.textContent = `${cityVal}, ${addressVal}`;
      if (modalSweetSummary) {
        modalSweetSummary.textContent = `${sweetData.types[state.type].name} • შიგთავსი: ${sweetData.fillings[state.filling].name} • ფასი: ${totalCost} ₾`;
      }

      // Show Modal
      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
      }

      // Reset form fields
      orderForm.reset();
    });
  }

  // Close Modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  // Initial render
  renderSweetVisual();
});
