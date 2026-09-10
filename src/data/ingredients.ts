import type { Ingredient, IngredientType, LocalizedText } from '../types';

// Order controls how groups are displayed in the "Bar Saya" screen.
export const INGREDIENT_TYPES: IngredientType[] = [
  'Spirits',
  'Liqueur',
  'Mixer',
  'Garnish',
  'Lainnya',
];

// TODO(i18n-review): English copy below is a reasonable first pass, not yet
// reviewed by a native speaker — fine for launch, worth a pass later.
export const INGREDIENT_TYPE_LABELS: Record<IngredientType, LocalizedText> = {
  Spirits: { id: 'Spirits', en: 'Spirits' },
  Liqueur: { id: 'Liqueur', en: 'Liqueur' },
  Mixer: { id: 'Mixer & Sirup', en: 'Mixers & Syrups' },
  Garnish: { id: 'Garnish & Bumbu', en: 'Garnish & Seasoning' },
  Lainnya: { id: 'Lainnya', en: 'Other' },
};

// Master ingredient catalog. First block (through "Lainnya" for teh-hitam-kental
// below) is the original 21-item launch catalog; the rest were merged in from a
// 99-ingredient "Cocktail Recipe Bible" catalog on top of it. Where a Bible
// ingredient was conceptually the same item as one already here (e.g.
// soda-water = soda-tawar, orange-juice = jus-jeruk, simple-syrup = sirup-gula,
// grenadine = sirup-grenadine, mint-leaves = daun-mint, sugar = gula-pasir,
// espresso = kopi-espresso, coffee-liqueur = kahlua, and both lime-juice AND
// lime-wedge = jeruk-nipis), the ORIGINAL id/entry here was kept as canonical
// and every recipe ingredientId reference was rewritten to match — so there is
// exactly one catalog entry per real-world ingredient, never two ids for the
// same thing. ginger-ale and ginger-beer are intentionally kept separate
// (different mixers, not interchangeable).
export const INGREDIENTS: Ingredient[] = [
  // Spirits
  { id: 'gin', name: { id: 'Gin', en: 'Gin' }, type: 'Spirits' },
  { id: 'vodka', name: { id: 'Vodka', en: 'Vodka' }, type: 'Spirits' },
  { id: 'white-rum', name: { id: 'White Rum', en: 'White Rum' }, type: 'Spirits' },
  { id: 'tequila', name: { id: 'Tequila', en: 'Tequila' }, type: 'Spirits' },
  { id: 'whiskey', name: { id: 'Whiskey', en: 'Whiskey' }, type: 'Spirits' },
  { id: 'dark-rum', name: { id: 'Dark rum', en: 'Dark rum' }, type: 'Spirits' },
  { id: 'brandy', name: { id: 'Brandy / Cognac', en: 'Brandy / Cognac' }, type: 'Spirits' },
  { id: 'scotch-whisky', name: { id: 'Scotch whisky', en: 'Scotch whisky' }, type: 'Spirits' },
  { id: 'irish-whiskey', name: { id: 'Irish whiskey', en: 'Irish whiskey' }, type: 'Spirits' },
  { id: 'gold-rum', name: { id: 'Rum tua (aged/gold rum)', en: 'Aged/gold rum' }, type: 'Spirits' },
  { id: 'vanilla-vodka', name: { id: 'Vodka rasa vanila', en: 'Vanilla vodka' }, type: 'Spirits' },

  // Liqueur
  { id: 'triple-sec', name: { id: 'Triple Sec', en: 'Triple Sec' }, type: 'Liqueur' },
  { id: 'blue-curacao', name: { id: 'Blue Curacao', en: 'Blue Curacao' }, type: 'Liqueur' },
  { id: 'kahlua', name: { id: 'Kahlua (Liqueur Kopi)', en: 'Kahlua (Coffee Liqueur)' }, type: 'Liqueur' },
  { id: 'dry-vermouth', name: { id: 'Dry vermouth', en: 'Dry vermouth' }, type: 'Liqueur' },
  { id: 'sweet-vermouth', name: { id: 'Sweet vermouth', en: 'Sweet vermouth' }, type: 'Liqueur' },
  { id: 'campari', name: { id: 'Campari', en: 'Campari' }, type: 'Liqueur' },
  { id: 'orange-curacao', name: { id: 'Orange curacao', en: 'Orange curacao' }, type: 'Liqueur' },
  { id: 'aperol', name: { id: 'Aperol', en: 'Aperol' }, type: 'Liqueur' },
  {
    id: 'amaro',
    name: { id: 'Amaro (mis. Amaro Nonino)', en: 'Amaro (e.g. Amaro Nonino)' },
    type: 'Liqueur',
  },
  { id: 'drambuie', name: { id: 'Drambuie', en: 'Drambuie' }, type: 'Liqueur' },
  { id: 'amaretto', name: { id: 'Amaretto', en: 'Amaretto' }, type: 'Liqueur' },
  {
    id: 'maraschino-liqueur',
    name: { id: 'Maraschino liqueur', en: 'Maraschino liqueur' },
    type: 'Liqueur',
  },
  { id: 'creme-de-violette', name: { id: 'Creme de violette', en: 'Creme de violette' }, type: 'Liqueur' },
  { id: 'green-chartreuse', name: { id: 'Green Chartreuse', en: 'Green Chartreuse' }, type: 'Liqueur' },
  { id: 'lillet-blanc', name: { id: 'Lillet Blanc', en: 'Lillet Blanc' }, type: 'Liqueur' },
  {
    id: 'creme-de-mure',
    name: { id: 'Creme de mure (liqueur blackberry)', en: 'Creme de mure (blackberry liqueur)' },
    type: 'Liqueur',
  },
  {
    id: 'cherry-liqueur',
    name: { id: 'Liqueur ceri (mis. Cherry Heering)', en: 'Cherry liqueur (e.g. Cherry Heering)' },
    type: 'Liqueur',
  },
  { id: 'benedictine', name: { id: 'Benedictine', en: 'Benedictine' }, type: 'Liqueur' },
  { id: 'creme-de-cassis', name: { id: 'Creme de cassis', en: 'Creme de cassis' }, type: 'Liqueur' },
  { id: 'creme-de-menthe', name: { id: 'Creme de menthe', en: 'Creme de menthe' }, type: 'Liqueur' },
  { id: 'creme-de-cacao', name: { id: 'Creme de cacao', en: 'Creme de cacao' }, type: 'Liqueur' },
  {
    id: 'raspberry-liqueur',
    name: { id: 'Liqueur raspberry (mis. Chambord)', en: 'Raspberry liqueur (e.g. Chambord)' },
    type: 'Liqueur',
  },
  {
    id: 'passion-fruit-liqueur',
    name: { id: 'Liqueur markisa', en: 'Passion fruit liqueur' },
    type: 'Liqueur',
  },
  {
    id: 'irish-cream-liqueur',
    name: { id: 'Irish cream liqueur (mis. Baileys)', en: 'Irish cream liqueur (e.g. Baileys)' },
    type: 'Liqueur',
  },
  { id: 'banana-liqueur', name: { id: 'Liqueur pisang', en: 'Banana liqueur' }, type: 'Liqueur' },
  { id: 'absinthe', name: { id: 'Absinthe', en: 'Absinthe' }, type: 'Liqueur' },

  // Mixer & Sirup
  { id: 'soda-tawar', name: { id: 'Soda Tawar', en: 'Club Soda' }, type: 'Mixer' },
  { id: 'tonic-water', name: { id: 'Tonic Water', en: 'Tonic Water' }, type: 'Mixer' },
  { id: 'ginger-ale', name: { id: 'Ginger Ale', en: 'Ginger Ale' }, type: 'Mixer' },
  { id: 'jus-jeruk', name: { id: 'Jus Jeruk', en: 'Orange Juice' }, type: 'Mixer' },
  { id: 'sirup-gula', name: { id: 'Sirup Gula (Simple Syrup)', en: 'Simple Syrup' }, type: 'Mixer' },
  { id: 'sirup-grenadine', name: { id: 'Sirup Grenadine', en: 'Grenadine Syrup' }, type: 'Mixer' },
  { id: 'sirup-gula-aren', name: { id: 'Sirup Gula Aren', en: 'Palm Sugar Syrup' }, type: 'Mixer' },
  {
    id: 'susu-kental-manis',
    name: { id: 'Susu Kental Manis', en: 'Sweetened Condensed Milk' },
    type: 'Mixer',
  },
  { id: 'ginger-beer', name: { id: 'Ginger beer', en: 'Ginger beer' }, type: 'Mixer' },
  { id: 'cola', name: { id: 'Cola', en: 'Cola' }, type: 'Mixer' },
  { id: 'cranberry-juice', name: { id: 'Jus cranberry', en: 'Cranberry juice' }, type: 'Mixer' },
  { id: 'pineapple-juice', name: { id: 'Jus nanas', en: 'Pineapple juice' }, type: 'Mixer' },
  {
    id: 'coconut-cream',
    name: { id: 'Santan kental / coconut cream', en: 'Coconut cream' },
    type: 'Mixer',
  },
  { id: 'tomato-juice', name: { id: 'Jus tomat', en: 'Tomato juice' }, type: 'Mixer' },
  { id: 'lemon-juice', name: { id: 'Air perasan lemon', en: 'Fresh lemon juice' }, type: 'Mixer' },
  { id: 'orgeat-syrup', name: { id: 'Sirup orgeat (almond)', en: 'Orgeat syrup' }, type: 'Mixer' },
  { id: 'angostura-bitters', name: { id: 'Angostura bitters', en: 'Angostura bitters' }, type: 'Mixer' },
  { id: 'fresh-cream', name: { id: 'Krim cair / susu cair kental', en: 'Fresh cream' }, type: 'Mixer' },
  { id: 'honey-ginger-syrup', name: { id: 'Sirup madu-jahe', en: 'Honey-ginger syrup' }, type: 'Mixer' },
  { id: 'honey-syrup', name: { id: 'Sirup madu', en: 'Honey syrup' }, type: 'Mixer' },
  { id: 'demerara-syrup', name: { id: 'Sirup gula demerara', en: 'Demerara syrup' }, type: 'Mixer' },
  { id: 'brewed-coffee', name: { id: 'Kopi seduh panas', en: 'Hot brewed coffee' }, type: 'Mixer' },
  { id: 'orange-bitters', name: { id: 'Orange bitters', en: 'Orange bitters' }, type: 'Mixer' },
  { id: 'raspberry-syrup', name: { id: 'Sirup raspberry', en: 'Raspberry syrup' }, type: 'Mixer' },
  { id: 'agave-syrup', name: { id: 'Sirup agave', en: 'Agave syrup' }, type: 'Mixer' },
  { id: 'grapefruit-soda', name: { id: 'Soda grapefruit', en: 'Grapefruit soda' }, type: 'Mixer' },
  { id: 'grapefruit-juice', name: { id: 'Jus grapefruit', en: 'Grapefruit juice' }, type: 'Mixer' },
  { id: 'passion-fruit-puree', name: { id: 'Puree markisa', en: 'Passion fruit puree' }, type: 'Mixer' },
  { id: 'vanilla-syrup', name: { id: 'Sirup vanila', en: 'Vanilla syrup' }, type: 'Mixer' },
  { id: 'peach-puree', name: { id: 'Puree persik putih', en: 'White peach puree' }, type: 'Mixer' },
  {
    id: 'cold-brew-concentrate',
    name: { id: 'Konsentrat cold brew', en: 'Cold brew concentrate' },
    type: 'Mixer',
  },
  { id: 'passion-fruit-syrup', name: { id: 'Sirup markisa', en: 'Passion fruit syrup' }, type: 'Mixer' },
  { id: 'egg-white', name: { id: 'Putih telur', en: 'Egg white' }, type: 'Mixer' },

  // Garnish & Bumbu
  { id: 'daun-mint', name: { id: 'Daun Mint', en: 'Mint Leaves' }, type: 'Garnish' },
  { id: 'jeruk-nipis', name: { id: 'Jeruk Nipis', en: 'Lime' }, type: 'Garnish' },
  { id: 'gula-pasir', name: { id: 'Gula Pasir', en: 'Granulated Sugar' }, type: 'Garnish' },
  { id: 'lemon-twist', name: { id: 'Kulit lemon (twist)', en: 'Lemon twist' }, type: 'Garnish' },
  { id: 'orange-peel', name: { id: 'Kulit jeruk (peel)', en: 'Orange peel' }, type: 'Garnish' },
  { id: 'orange-slice', name: { id: 'Irisan jeruk', en: 'Orange slice' }, type: 'Garnish' },
  { id: 'maraschino-cherry', name: { id: 'Ceri maraschino', en: 'Maraschino cherry' }, type: 'Garnish' },
  { id: 'olive', name: { id: 'Olive / zaitun', en: 'Olive' }, type: 'Garnish' },
  { id: 'celery-stick', name: { id: 'Batang seledri', en: 'Celery stick' }, type: 'Garnish' },
  {
    id: 'coffee-beans',
    name: { id: 'Biji kopi (garnish)', en: 'Coffee beans (garnish)' },
    type: 'Garnish',
  },
  {
    id: 'candied-ginger',
    name: { id: 'Jahe kristal (candied ginger)', en: 'Candied ginger' },
    type: 'Garnish',
  },
  { id: 'fresh-raspberry', name: { id: 'Buah raspberry segar', en: 'Fresh raspberry' }, type: 'Garnish' },
  {
    id: 'fresh-blackberries',
    name: { id: 'Buah blackberry segar', en: 'Fresh blackberries' },
    type: 'Garnish',
  },
  { id: 'lemon-slice', name: { id: 'Irisan lemon', en: 'Lemon slice' }, type: 'Garnish' },
  { id: 'lemon-wedge', name: { id: 'Potongan lemon', en: 'Lemon wedge' }, type: 'Garnish' },
  { id: 'basil-leaves', name: { id: 'Daun basil', en: 'Basil leaves' }, type: 'Garnish' },
  { id: 'pineapple-wedge', name: { id: 'Potongan nanas', en: 'Pineapple wedge' }, type: 'Garnish' },
  { id: 'grapefruit-wedge', name: { id: 'Potongan grapefruit', en: 'Grapefruit wedge' }, type: 'Garnish' },
  { id: 'grated-chocolate', name: { id: 'Cokelat parut', en: 'Grated chocolate' }, type: 'Garnish' },
  { id: 'nutmeg', name: { id: 'Pala bubuk', en: 'Nutmeg' }, type: 'Garnish' },
  { id: 'peach-slice', name: { id: 'Irisan persik', en: 'Peach slice' }, type: 'Garnish' },
  {
    id: 'passion-fruit-garnish',
    name: { id: 'Belahan markisa', en: 'Passion fruit half' },
    type: 'Garnish',
  },

  // Lainnya
  { id: 'kopi-espresso', name: { id: 'Kopi Espresso', en: 'Espresso Coffee' }, type: 'Lainnya' },
  { id: 'teh-hitam-kental', name: { id: 'Teh Hitam Kental', en: 'Strong Black Tea' }, type: 'Lainnya' },
  {
    id: 'worcestershire-sauce',
    name: { id: 'Saus Worcestershire', en: 'Worcestershire sauce' },
    type: 'Lainnya',
  },
  { id: 'tabasco-sauce', name: { id: 'Saus Tabasco', en: 'Tabasco sauce (hot sauce)' }, type: 'Lainnya' },
  { id: 'salt', name: { id: 'Garam (buat rim gelas)', en: 'Salt (for glass rim)' }, type: 'Lainnya' },
  { id: 'red-wine', name: { id: 'Anggur merah kering', en: 'Dry red wine' }, type: 'Lainnya' },
  {
    id: 'sparkling-wine',
    name: { id: 'Anggur berkarbonasi (Prosecco/Champagne)', en: 'Sparkling wine (Prosecco/Champagne)' },
    type: 'Lainnya',
  },
  {
    id: 'sherry',
    name: { id: 'Sherry (dry/amontillado)', en: 'Sherry (dry/amontillado)' },
    type: 'Lainnya',
  },
  { id: 'celery-salt', name: { id: 'Garam seledri', en: 'Celery salt' }, type: 'Lainnya' },
  { id: 'black-pepper', name: { id: 'Lada hitam', en: 'Black pepper' }, type: 'Lainnya' },
];

export const INGREDIENT_MAP: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((ingredient) => [ingredient.id, ingredient]),
);
